# Client

The main/top *container*, every model can only belong to a single client.

Consult the <[model:client](model.html#client)> for general property/field information.

All client requests (`/client/*`) need to specify the Auth headers below as described in [General](./#authentication)

#### HEADERS
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

----
#### ALL REQUESTS

[[toc]]




## Find

Find a Client.

#### REQUEST

#### Path
```
/client/find
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
  "data": <model:client>
}
```

> *[Back to all Requests](#client)*
---------------

## Paginate Users

Paginate users of a client.

Pagination is seek based and ordered by creation date in descending order.

#### REQUEST

#### Path
```
/find/paginate_user
```

#### Authorization Required
```
root, admin
```

#### Body

```json
{
    "control": { },
    "data": {
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "user_type": "",
      "Limit": 10,
      "PageKey": null
    }
}
```
- `user_type` Allowed values:
  - `""` Empty string for both users and admins.
  - `admin` Only Admins.
  - `user` Only Users.
- `Limit` Maximum amount of rows to return, must be less than 100, *might return less than the specified value.
- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response it indicates that
  there are more items. Specifying it in the next request continues getting the data from that previous point.
  Leave empty string, null or omit the PageKey on the request to not use it.
  
#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:user>],
    "PageKey": null
  }
}
```

- `PageKey` Will only have a value IF there are more items to be retrieved, otherwise null.

> *[Back to all Requests](#campaigns)*
---------------
