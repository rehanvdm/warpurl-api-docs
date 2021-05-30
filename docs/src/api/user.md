# User

The secondary *container*, every model (except client) can only belong to a single user.

Consult the <[model:user](model.html#user)> for general property/field information.

All client requests (`/user/*`) need to specify the Auth headers below as described in [General](./#authentication)

#### HEADERS
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

----
#### ALL REQUESTS

[[toc]]




## Find

Find a User.

#### REQUEST

#### Path
```
/user/find
```

#### Authorization Required
```
root, admin, user
```

#### Body

```json
{
    "control": { },
    "data": {
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:user>
}
```
