---
sidebar: auto
---

# API

## Glossary

- WarpURL Portal - Where you register and login to manage all your subscriptions & billing. [https://warpurl.com/](https://warpurl.com/)
- Subscription Portal - An instance of a Subscription that is created in WarpURL Portal, [https://app.demo.warpurl.net/](https://app.demo.warpurl.net/)
    is an example of a Subscription.
  
## General

API calls are JSON based for both request and response. Both have `control` and `data` properties.

### Request Structure

All requests follow the general JSON request structure:
```json
{
  "control": { },
  "data": <Request & ResponseCode dependant>
}
```

The following `control` properties can be specified on specific requests and will be indicated when available:
- `control.Include` Include other related entities with the current request to minimize back and forth or multiple lookups. This is usually an array.

### Response Structure

#### HTTP Status Codes

**This structure is returned as the response of ALL API Calls. Only the Success API Call responses will be shown from
here on out, except if the specific error ResponseCode is of significant value.**

#### 200 - SUCCESS
```json
{
  "control": { 
    "ResponseCode": 2000, 
    "TraceID": "11648023-1376-4da8-806e-11999c1c519f", 
    "Build":"eb511f1"
  },
  "data": <Request & ResponseCode dependant>
}
```

Indicates that the API endpoint was hit successfully, all auth passed.
- `control` Is a structure that will always be returned if the API was hit. It is the high level structure that can be used
  for branching logic.
- `control.ResponseCode` Indicates if the request executed successfully or not.
    - `2000` Successful execution
    - `3001` Authorization **error**
    - `5000` Unknown server **error**
    - `5001` Known/Handled **error**
    - `5002` Validation **error**

  All **error** codes will have more info about that error in the `control.data` field.
- `control.TraceID` Can be presented to support if ResponseCode 5000 is returned for further investigation.
- `control.Build` Can be ignored, this is only used by the frontend.

#### 401 - UNAUTHORIZED/EXPIRE

If either the API Key or JWT ID Token are missing or invalid:
```json
{
"message": "Unauthorized"
}
```

The JWT ID Token has expired:
```json
{
"message": "The incoming token has expired"
}
```

#### 403 - FORBIDDEN
The JWT ID Token is correct, but the API Key is wrong:
```json
{
"message": "Forbidden"
}
```

#### 429 - THROTTLED
Exceeding the set rate limit per second value

*For a full list see [AWS API Gateway response types](https://docs.aws.amazon.com/apigateway/latest/developerguide/supported-gateway-response-types.html)*



## Authentication

They are secured by 2 mechanism.

### API Keys
Each **Subscription** has its own API Key. This key is used to identify all requests for that Subscription.
It can be obtained in the WarpURL portal under Subscriptions by clicking on a specific Subscription.
Note that it can not be rotated, it is only used to separate and rate limit API traffic per Subscription.

Each request requires the API Key value in the header:
```json
"x-api-key": <YOUR API KEY>
```


### Access Keys
Access keys identify a **specific user**. They can be created in the Subscription Portal under a specific user Profile.
These can be rotated, each user can have two API keys(active or inactive) at a time.  If you lose or forget your secret key,
you cannot retrieve it. Instead, create a new access key and make the old key inactive.

The Access Keys consists of a **Key ID** and a **Key Password** these must be exchanged for temporary JWT ID & Refresh Tokens by calling
*[Access Keys - Get Token](#access-keys---get-token)*. These are AWS Cognito Tokens but behave exactly the same as any other JWT Tokens,
thus they expire after a given time. The JWT ID Token can be refreshed by calling the *[Access Keys - Refresh Token](#access-keys---refresh-token)*.

Each request requires the JWT ID Token in the header:
```json
"Authorization": <JWT ID Token>
```


## Models

These are the models that can be returned API calls. They are presented in example format and will be referenced by
name ex: `<model:link>`. All fields will be indicated, but those not defined will not be returned or returned as the 
default for that type.

General information of the field will be indicated if of significant value.

- The **Date Format** is not strictly ISO1806, the `T` is replaced with a space, no time zone indication as this it is always UTC and the 
  milliseconds are included. Example: `2021-05-19 19:33:03.324`
- The `client_id` can be acquired by inspecting the JWT claims of the user or doing the Find User api call of that user. *Reserved fo future use*
- The `user_id` can be converted to the `username` field by adding the prefix of `#usr#` some API calls recquire the `username`
  and others the `user_id`.
- When referring to the value `null` it means the JSON value `null`, not string value. 

### Link
```
{
    "link_id": "#lnk#/test-ping",
    "name": "WarpURL Test Ping",
    "short_url": "/test-ping",
    "long_url": "https://warpurl.com/?utm_campaign\u003dtest-ping",
    "enabled": true,
    "hidden": false,
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "user_id": "#usr#SuperAdmin1",
    "campaign_id": "#cmp#2021-05-19 18:31:29.271#66d5199a-a60d-450b-9655-44032bf7f192",
    "campaign_name": "Newsletter 05-2021",
    "campaign_channel": "Email",
    "clicks": 44685,
    "clicks_day": 7560,
    "clicks_month": 44685,
    "created_at": "2021-05-19 19:33:03.324"
}
```
- `short_url` Only the slug, must not be prepended by the shortening URL
- `long_url` Must start with http:// or https://
- `enable` *Reserved fo future use*
- `hidden` Hidden links do not show on the Subscription Portal
- `client_id` This value can be acquired by inspecting the JWT claims of the user or doing the Find User api call. *Reserved fo future use*
- `clicks` Total clicks for the lifespan of the link
- `clicks_day` Total clicks this link did in the current day, timezone UTC. 
- `clicks_month` Total clicks this link did in the current month, timezone UTC. 


----

## Requests

#### LINK
> 1. *[Get suggested name](#link-get-suggested-name)*
> 1. *[Create](#link-create)*
> 1. *[Update](#get)*
> 1. *[Update Tags](#get)*
> 1. *[Update Hidden](#get)*
> 1. *[Invalidate](#get)*
> 1. *[Find](#get)*
> 1. *[Find Tags](#get)*
> 1. *[Paginate](#get)*
> 1. *[Paginate Popular](#get)*
> 1. *[Paginate Campaign Stats](#get)*
> 1. *[Find Batch](#get)*
> 1. *[Find Batch History](#get)*
> 1. *[Find History for User](#get)*
> 1. *[Delete](#get)*


### Link - Get suggested name

This API just follows the `long_url` and retrieves the title tag from the head of the link.

#### REQUEST
##### HEADERS:
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```
##### BODY:
```json
{
    "control": { },
    "data": {
        "long_url": "https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/"
    }
}
```

#### RESPONSE

##### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "Build": "0" },
  "data": "New – Amazon DynamoDB Transactions | AWS News Blog"
}
```
- `data` Is null if the link took longer than 10 seconds to resolve.


> *[Back to all Requests](#requests)*
---------------

### Link - Create

Create a Short URL from a Long URL.

#### REQUEST
##### HEADERS:
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```
##### BODY:
##### 1) Auto Generate Slug
```json
{
    "control": { },
    "data": {
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "username": "",
      "name": "Test link type",
      "long_url": "https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/"
    }
}
```

TODO: Continue others

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "Build": "0" },
  "data": "New – Amazon DynamoDB Transactions | AWS News Blog"
}
```
- `data` Is null if the link took longer than 10 seconds to resolve.


> *[Back to all Requests](#requests)*
---------------




