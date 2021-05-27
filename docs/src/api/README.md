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
    "clicks_unique": 1,
    "created_at": "2021-05-19 19:33:03.324"
}
```
- `short_url` Only the slug, must NOT be prepended by the shortening domain. Must start with "/". 
  Can not contain `?` or `#`. Max length 255 characters.
- `name` Max length 100 characters.
- `long_url` Must start with "http://" or "https://". Max length 1024 charters.
- `enable` *Reserved fo future use*.
- `hidden` Hidden links do not show on the Subscription Portal
- `client_id` This value can be acquired by inspecting the JWT claims of the user or doing the Find User api call. *Reserved fo future use*.
- `clicks` Total clicks for the lifespan of the link.
- `clicks_unique` Total unique clicks for the lifespan of the link. 
    Uniqueness counted by the querystring attached to the short url when navigated by user. 
- `clicks_day` Total clicks this link did in the current day, timezone UTC. 
- `clicks_month` Total clicks this link did in the current month, timezone UTC. 

----

### Link History Hourly
```
{
    "for": "hourly",
    "link_id": "#lnk#/anything",
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "user_id": "#usr#SuperAdmin1",
    "period": "2021-05-19",
    "views": {
      19: 2578,
      20: 33159,
      21: 8648,
      22: 8640
    },
    "last_updated_at": "2021-05-19 19:33:03.324"
}
```
- `for` Will always be `hourly`
- `client_id` This value can be acquired by inspecting the JWT claims of the user or doing the Find User api call. *Reserved fo future use*.
- `period` The period specifying the day the hourly clicks in views are for, format `YYYY-MM-DD` (UTC).
- `views` An object with the key being the hour and the value the count for that hour. Keys/hours range from 0 to 23.
  Uniqueness counted by the querystring attached to the short url when navigated by user.
- `last_updated_at` Last time the link was clicked/record object was updated.


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
> 1. *[Find User History](#get)*
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
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
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

```json
{
    "control": { },
    "data": {
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "username": "SuperAdmin1",
      "name": "Test link type",
      "long_url": "https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/",
      "short_url": "/anything",
      "tags": ["News Letter", "Blog"],
      "campaign_id": "#cmp#2021-01-28 18:53:19.214#970a6ed7-90fd-42d9-81a4-62ad838e85bd",
      "campaign_channel": "Email"
    }
}
```

- `client_id`, `username`, `long_url` Required.
- `name` Optional, if left empty will default to the `long_url`.
- `short_url` Optional, if left empty will default to a unique 6 value combination consisting of this alphabet:
  "123456789abcdfghijkmnpqrstvwxyzABCDFGHJKLMNPQRSTVWXYZ".
- `tags` Optional, array of string values, maximum 5. The values are not validated against the Account set available tags. 
- `campaign_id` Optional, the ID of the campaign you want to associate this link to. Must be specified if `campaign_channel` is specified.
- `campaign_channel` Optional, if Campaign does not have the Channel, it will be added to the Campaign.


#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:link>
}
```

> *[Back to all Requests](#requests)*
---------------

### Link - Update

Update, **replaces properties** of an existing link.

All the same fields and logic applied to the creation of the link applies for the update. 
Except that you can not change the `short_url` and `username` fields. The `link_id` obtained from the create
is used as the identifier for the update.

Tags are updated with a separate API call.

All **optional properties** when creating a link **can be removed by not specifying that property or making them null**.

::: danger 
Changing `long_url` uses an invalidation which is a billing metric, only do so if absolutely necessary.
:::

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
      "link_id": "#lnk#/anything",
      "name": "Test link type",
      "long_url": "https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/",
      "campaign_id": "#cmp#2021-01-28 18:53:19.214#970a6ed7-90fd-42d9-81a4-62ad838e85bd",
      "campaign_channel": "Email"
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:link>
}
```

> *[Back to all Requests](#requests)*
---------------

### Link - Update Tags

Update, **replaces**, the tags of an existing link.

- Maximum 5 tags per link.
- Tags can not be longer than 20 charters.
- Leave array empty, omit property or set to null to remove all tags.

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
      "link_id": "#lnk#/anything",
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "tags": ["Tag1"]      
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:link>
}
```

> *[Back to all Requests](#requests)*
---------------

### Link - Update Hidden

Updates the `hidden` property of a link(s).

- Maximum of 10 values can be specified in `link_ids`.

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
      "link_ids": ["#lnk#/anything"],
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "hidden": true    
    }
}
```

- `hidden` Absolute `true` or `false` value

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "link_ids": ["#lnk#/anything"],
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "hidden": true
  }
}
```

> *[Back to all Requests](#requests)*
---------------

### Link - Invalidate

Update the `long_url` in the cache. This is only required in extreme edge cases as an implicit invalidation is done in the 
Link Update IF the `long_url` changed. 

::: danger
An invalidation is a billing metric, only do so if absolutely necessary.
:::

Eventual consistency is at play so wait between 10 seconds to a few minutes for the value to propagate the network.

- Maximum of 10 values can be specified in `link_ids`.

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
      "link_ids": ["#lnk#/anything"],
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "hidden": true    
    }
}
```

- `hidden` Absolute `true` or `false` value

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": true
}
```

> *[Back to all Requests](#requests)*
---------------

### Link - Find

Find an existing link and optionally all of its tags.

**Tags can be retrieved** with the link if `Include: ["tags"]` is specified in the `control` property, otherwise
do not specify if not required.

#### REQUEST

##### HEADERS:
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```
##### BODY:

```json
{
    "control": { "Include": ["tags"] },
    "data": {
      "link_id": "#lnk#/anything"
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "link": <model:link>,
    "tags": ["Tag1"]
  }
}
```

- `tags` Will only be returned if specified to do so in the `control` property of the request. 

> *[Back to all Requests](#requests)*
---------------


### Link - Find Tags

Find the tags of an existing link.

Take note, the response is not the same as the plain tag string values used previously, the are enriched with extra information.

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
      "link_id": "#lnk#/anything",
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063"
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [
      {
        "tag_id": "#tag#clt#6be8d279-591a-4210-922e-d6caa605b063#Tag1",
        "link_id": "#lnk#/anything",
        "tag_name": "Tag1"
      },
      ...
    ]
  }
}
```

> *[Back to all Requests](#requests)*
---------------

### Link - Paginate

Paginate the links of a user.

Take note `Limit` and `PageKey` is capitalized, like all logical (non-field) properties. 
Pagination is seek based and ordered by creation date in descending order. 

- `Limit` Maximum amount of rows to return, must be less than 100, *might return less than specified value.
- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response indicating there are more items, then by specifying
  it in the next request continues getting the data from that point. Leave empty string, null or omit the PageKey on the 
  first request to not use it. 

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
      "username": "SuperAdmin1",
      "Limit": 10,
      "PageKey": null
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:link>],
    "PageKey": null
  }
}
```

- `PageKey` Will only have a value IF there are more items to be retrieved, otherwise null.

> *[Back to all Requests](#requests)*
---------------

### Link - Paginate Popular

Paginate the links of a user by popularity.

Take note `Limit`, `PageKey`, `Period` and `Sort` is capitalized, like all logical (non-field) properties.

- `Limit` Maximum amount of rows to return, must be less than 100, *might return less than specified value.
- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response indicating there are more items, then by specifying
  it in the next request continues getting the data from that point. Leave empty string, null or omit the PageKey on the
  first request to not use it.
- `Period` Can be one of three values:
  - `alltime` Orders by most popular over all links 
  - `monthly` Orders by most popular for the month (UTC)
  - `daily` Orders by most popular for the current day (UTC)
- `Sort` Value can be one of:
  - `ASC` Sorts from the lowest count to highest. 
  - `DESC` Default if property is omitted. Sorts from the highest count to  lowest. 

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
      "username": "SuperAdmin1",
      "Limit": 10,
      "PageKey": null,
      "Period": "daily",
      "Sort": "DESC"
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:link>],
    "PageKey": null
  }
}
```

- `PageKey` Will only have a value IF there are more items to be retrieved, otherwise null.

> *[Back to all Requests](#requests)*
---------------

### Link - Paginate Campaign Stats

Paginate and count the stats for the campaign links server side.

Take note `PageKey` is capitalized, like all logical (non-field) properties. 

- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response indicating there are more items, then by specifying
  it in the next request continues getting the data from that point. Leave empty string, null or omit the PageKey on the
  first request to not use it.

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
      "campaign_id": "#cmp#2021-01-28 18:53:19.214#970a6ed7-90fd-42d9-81a4-62ad838e85bd",
      "PageKey": null
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Stat": {
      "links": 0,
      "clicks": 0,
      "clicks_month": 0,
      "clicks_day": 0,
      "clicks_unique": 0
    },
    "PageKey": null
  }
}
```

- `PageKey` Will only have a value IF there are more links that needs to be counted server side, otherwise null.
- `Stat` This object contains statistic fields similar to what have on the `<model:link>`. With the extra property
  of `links` indicating the count of links that has been used for the calculation. 

> *[Back to all Requests](#requests)*
---------------

### Link - Find Batch

Find links in batches of maximum 25.  Similar than *Link - Find* except that it is done in batches.

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
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "link_ids": ["#lnk#/anything"]
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:link>],
    "PageKey": null
  }
}
```

- `PageKey` Always null, not used.

> *[Back to all Requests](#requests)*
---------------

### Link - Find Batch History

Find the history of links in batches of maximum 25.

- `period` Can be one of two values:
  - `hourly` Indicates to retrieve all the hourly values for the given `period_value` specified in days
  - `daily` Indicates to retrieve all the daily values for the given `period_value` specified in months
- `period_value` 
  - IF `period` is `hourly` then this should be formatted as `YYYY-MM-DD`
  - IF `period` is `daily` then this should be formatted as `YYYY-MM`
  
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
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "link_ids": ["#lnk#/anything"],
      "period": "daily",
      "period_value": "2021-06"
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:link>],
    "PageKey": null
  }
}
```

- `PageKey` Always null, not used.

> *[Back to all Requests](#requests)*
---------------

### Link - Find User History

Finds the history for all the links of a user.

- `period_values`
  - An array of values, maximum 13.
  - Formatted as `YYYY-MM`

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
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "username": "SuperAdmin1",
      "period_value": ["2021-04", "2021-05"]
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:link_history_daily>],
    "PageKey": null
  }
}
```
Same format as <model:link_history_daily>.

- `PageKey` Always null, not used.
- `Items[x].link_id` Will always be null
- `Items[x].for` Will always be `daily`

> *[Back to all Requests](#requests)*
---------------

### Link - Delete

Delete links in batches of maximum 10.

- `invalidate` Whether to also clear them out of the edge caches immediately. Can be either true or false. 
  If false is specified then the link will be removed and inaccessible within a day.

::: danger
Specifying `invalidate` as true uses invalidations (same as count of links specified) which is a billing metric, 
only do so if absolutely necessary. 
:::

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
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "link_ids": ["#lnk#/anything"],
      "invalidate": false
    }
}
```

#### RESPONSE:

#### SUCCESS
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "link_ids": ["#lnk#/anything"],
    "invalidate": false
  }
}
```
Returns body as was sent on success.

> *[Back to all Requests](#requests)*
---------------
