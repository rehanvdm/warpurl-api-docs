# Campaigns

A Campaign is just a grouping of links whereby a link can only have one campaign.

Consult the <[model:campaign](model.html#campaign)> for general property/field information.

All campaign requests (`/campaign/*`) need to specify the Auth headers below as described in [General](./#authentication)

#### HEADERS
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

----
#### ALL REQUESTS

[[toc]]


## Create

Create a Campaign to group links.

#### REQUEST
#### Path
```
/campaign/create
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
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "username": "SuperAdmin1",
      "name": "News letter 2021-05",
      "description": "May 2020 news letter",
      "channels": ["Sms", "Email"]
    }
}
```

- `client_id`, `username`, `name` Required.

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:campaign>
}
```

> *[Back to all Requests](#campaign)*
---------------

## Update

Updates, **replaces properties** of a campaign.

All the same fields and logic applied to the creation of the campaign applies for the update.

All the **optional properties** when creating a campaign **can be removed by not specifying that property or making them null**.

#### REQUEST

#### Path
```
/campaign/update
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
      "campaign_id": "#cmp#2021-05-16 10:05:56.958#db6f265f-ac89-4004-8c69-bb7f9e8203ed",
      "username": "SuperAdmin1",
      "name": "News letter 2021-05",
      "description": "May 2020 news letter",
      "channels": ["Sms", "Email"]
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:campaign>
}
```

> *[Back to all Requests](#campaigns)*
---------------


## Find

Find an existing campaign.

#### REQUEST

#### Path
```
/campaign/find
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
      "campaign_id": "#cmp#2021-05-16 10:05:56.958#db6f265f-ac89-4004-8c69-bb7f9e8203ed",
      "username": "SuperAdmin1"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:campaign>
}
```

> *[Back to all Requests](#campaigns)*
---------------

## Paginate

Paginate the campaigns of a user.

Pagination is seek based and ordered by creation date in descending order.

#### REQUEST

#### Path
```
/campaign/paginate_user
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
      "username": "SuperAdmin1",
      "Limit": 10,
      "PageKey": null
    }
}
```

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
    "Items": [<model:campaign>],
    "PageKey": null
  }
}
```

- `PageKey` Will only have a value IF there are more items to be retrieved, otherwise null.

> *[Back to all Requests](#campaigns)*
---------------

## Search

Search all campaigns by name, case-sensitive.

#### REQUEST

#### Path
```
/campaign/search
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
      "username": "SuperAdmin1",
      "text": "News letter",
      "Limit": 10,
      "PageKey": null,
      "Sort": "DESC"
    }
}
```

- `Limit` Maximum amount of rows to return, must be less than 100, *might return less than the specified value.
- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response it indicates that
  there are more items. Specifying it in the next request continues getting the data from that previous point.
  Leave empty string, null or omit the PageKey on the request to not use it.
- `text` The value that is searched for in the campaign name, case-sensitive.

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:campaign>],
    "PageKey": null
  }
}
```

- `PageKey` Will only have a value IF there are more items to be retrieved, otherwise null.

> *[Back to all Requests](#campaigns)*
---------------

## Delete

Delete an existing campaign.

#### REQUEST

#### Path
```
/campaign/delete
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
      "campaign_id": "#cmp#2021-05-16 10:05:56.958#db6f265f-ac89-4004-8c69-bb7f9e8203ed",
      "username": "SuperAdmin1"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "campaign_id": "#cmp#2021-05-16 10:05:56.958#db6f265f-ac89-4004-8c69-bb7f9e8203ed",
    "username": "SuperAdmin1"
  }
}
```
Returns body as was sent on success.

> *[Back to all Requests](#campaigns)*
---------------
