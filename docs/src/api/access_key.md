# Access Keys

Access Keys are exchanged for a short-lived JWT ID Token used for authorization when making API calls.

Consult the <[model:access_key](model.html#access-key)> for general property/field information.

The Get and Refresh Token API calls do not require authorization.

#### ALL REQUESTS

[[toc]]

## Create

Create an Access Key.

#### REQUEST
#### Path
```
/access_key/create
```

#### Authorization Required
```
root, admin, user
```

#### Headers
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

#### Body

```json
{
    "control": { },
    "data": {
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "username": "SuperAdmin1",
      "key_name": "Test Key"
    }
}
```

- `client_id`, `username`, `key_name` Required.

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    ...<model:access_key>,
    "key_password": "<unique access key password>"
  }
}
```

Returns all the properties/fields of <model:access_key> and then an extra property `key_password`.

- `key_password` Will only be returned once after creating the key.

> *[Back to all Requests](#access-keys)*
---------------

## Update

Updates, **replaces properties** of an Access Key.

All the same fields and logic applied to the creation of the campaign applies for the update.

- `key_name` If omitted or empty string then left unchanged.
- `enabled` Can only be true or false.

#### REQUEST

#### Path
```
/access_key/update
```

#### Authorization Required
```
root, admin, user
```

#### Headers
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

#### Body

```json
{
    "control": { },
    "data": {
      "key_id": "2IEx7239xMzmhCdJ2nbWX",
      "key_name": "Test Key",
      "enabled": false
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:access_key>
}
```

> *[Back to all Requests](#access-keys)*
---------------


## Find

Find all user Access Keys.

#### REQUEST

#### Path
```
/access_key/find_user_keys
```

#### Authorization Required
```
root, admin, user
```

#### Headers
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

#### Body

```json
{
    "control": { },
    "data": {
      "key_id": "2IEx7239xMzmhCdJ2nbWX"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:access_key>
}
```

> *[Back to all Requests](#access-keys)*
---------------


## Delete

Delete an Access Key.

#### REQUEST

#### Path
```
/access_key/delete
```

#### Authorization Required
```
root, admin, user
```

#### Headers
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

#### Body

```json
{
    "control": { },
    "data": {
      "key_id": "2IEx7239xMzmhCdJ2nbWX"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "key_id": "2IEx7239xMzmhCdJ2nbWX"
  }
}
```

Returns body as was sent on success.

> *[Back to all Requests](#access-keys)*
---------------





## Get Token

Returns a JWT Token for the given Access Key.

#### REQUEST

#### Path
```
/access_key/get_token
```

#### Authorization Required
```
-
```

#### Headers
```
-
```

#### Body

```json
{
    "control": { },
    "data": {
      "key_id": "2IEx7239xMzmhCdJ2nbWX",
      "key_password": "XXXXXXXXXXXXXXXXXX",
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "idToken": "",
    "refreshToken": ""
  }
}
```

- `idToken` Use in the `Authorization` header to make authorized API requests.
- `refreshToken` Should be used to get a new `idToken` after it expires using the Refresh Token API cal below.

> *[Back to all Requests](#access-keys)*
---------------

## Refresh Token

Returns a new JWT ID Token for a given Refresh Token. 

#### REQUEST

#### Path
```
/access_key/refresh_token
```

#### Authorization Required
```
-
```

#### Headers
```
-
```

#### Body

```json
{
    "control": { },
    "data": {
      "key_id": "2IEx7239xMzmhCdJ2nbWX",
      "key_password": "XXXXXXXXXXXXXXXXXX"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "idToken": ""
  }
}
```

- `idToken` Use in the `Authorization` header to make authorized API requests.

> *[Back to all Requests](#access-keys)*
---------------
