# General

## Glossary

- WarpURL Portal - Where you register and login to manage all your subscriptions & billing. [https://warpurl.com/](https://warpurl.com/)
- Subscription Portal - An instance of a Subscription that is created in WarpURL Portal, [https://app.demo.warpurl.net/](https://app.demo.warpurl.net/)
    is an example of a Subscription.
  


API calls are JSON based for both request and response. Both have `control` and `data` properties.

## Request Structure

All requests follow the general JSON request structure:
```json
{
  "control": { },
  "data": <Request & ResponseCode dependant>
}
```

All model properties are snake case, logical fields are pascal case.
Examples of logical fields when making requests are: `Limit`, `PageKey` and `Sort`

The following `control` properties can be specified on specific requests and will be indicated when available:
- `control.Include` Include other related entities with the current request to minimize back and forth or multiple lookups. This is usually an array.


## Response Structure

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

