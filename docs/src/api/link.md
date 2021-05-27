# Links

[[toc]]

## Get suggested name 

Follows the `long_url` and retrieve the title tag from the head of the link as the name.

#### REQUEST
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
        "long_url": "https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": "New – Amazon DynamoDB Transactions | AWS News Blog"
}
```
- `data` Is null if the link took longer than 10 seconds to resolve.


> *[Back to all Requests](#links)*
---------------

## Create

Create a Short URL from a Long URL.

#### REQUEST

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
- `campaign_channel` Optional, if specifying and the Campaign does not have the channel, then the channel will also be added to the Campaign if allowed.


#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:link>
}
```

> *[Back to all Requests](#links)*
---------------

## Update

Updates, **replaces properties** of an existing link.

All the same fields and logic applied to the creation of the link applies for the update. 
Except that you can not change the `short_url` and `username` fields. The `link_id` obtained from the *Create*
is used as the identifier for the update.

Tags are updated with a separate API call.

All the **optional properties** when creating a link **can be removed by not specifying that property or making them null**.

::: danger 
Changing `long_url` uses an invalidation which is a billing metric, only do so if absolutely necessary.
:::

#### REQUEST

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
      "link_id": "#lnk#/anything",
      "name": "Test link type",
      "long_url": "https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/",
      "campaign_id": "#cmp#2021-01-28 18:53:19.214#970a6ed7-90fd-42d9-81a4-62ad838e85bd",
      "campaign_channel": "Email"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:link>
}
```

> *[Back to all Requests](#links)*
---------------

## Update Tags

Updates, **replaces**, the tags of an existing link.

- Maximum 5 tags per link.
- Tags can not be longer than 20 charters.
- To remove all tags; leave array empty, omit property or set to null.

#### REQUEST

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
      "link_id": "#lnk#/anything",
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "tags": ["Tag1"]      
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": <model:link>
}
```

> *[Back to all Requests](#links)*
---------------

## Update Hidden

Updates the `hidden` property of a link(s).

- A maximum of 10 ids can be specified in `link_ids`.

#### REQUEST

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
      "link_ids": ["#lnk#/anything"],
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "hidden": true    
    }
}
```

- `hidden` Absolute `true` or `false` value

#### RESPONSE

#### Success
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
Returns body as was sent on success.

> *[Back to all Requests](#links)*
---------------

## Invalidate

Update the `long_url` in the cache. This is only required in extreme edge cases as an implicit invalidation is done in the 
Link Update IF the `long_url` changed. 

::: danger
This operation uses an invalidation which is a billing metric, only do so if absolutely necessary.
:::

Wait between ten seconds to a few minutes for the invalidation to propagate the network.

- A maximum of 10 ids can be specified in `link_ids`.

#### REQUEST

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
      "link_ids": ["#lnk#/anything"],
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
      "hidden": true    
    }
}
```

- `hidden` Absolute `true` or `false` value

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": true
}
```

> *[Back to all Requests](#links)*
---------------

## Find

Find an existing link and optionally all of its tags.

**Tags can be retrieved** with the link if `Include: ["tags"]` is specified in the `control` property, otherwise
do not specify it if not required.

#### REQUEST

#### Headers
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```
#### Body

```json
{
    "control": { "Include": ["tags"] },
    "data": {
      "link_id": "#lnk#/anything"
    }
}
```

#### RESPONSE

#### Success
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

> *[Back to all Requests](#links)*
---------------


## Find Tags

Find the tags of an existing link.

The response is not the same as the plain tag string value used previously. They are enriched with extra information.

#### REQUEST

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
      "link_id": "#lnk#/anything",
      "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063"
    }
}
```

#### RESPONSE

#### Success
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

> *[Back to all Requests](#links)*
---------------

## Paginate

Paginate the links of a user.

Pagination is seek based and ordered by creation date in descending order. 

- `Limit` Maximum amount of rows to return, must be less than 100, *might return less than the specified value.
- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response it indicates that
  there are more items. Specifying it in the next request continues getting the data from that previous point. 
  Leave empty string, null or omit the PageKey on the request to not use it. 

#### REQUEST

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
      "username": "SuperAdmin1",
      "Limit": 10,
      "PageKey": null
    }
}
```

#### RESPONSE

#### Success
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

> *[Back to all Requests](#links)*
---------------

## Paginate Popular

Paginate the links of a user by popularity.

- `Limit` Maximum amount of rows to return, must be less than 100, *might return less than the specified value.
- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response it indicates that
  there are more items. Specifying it in the next request continues getting the data from that previous point.
  Leave empty string, null or omit the PageKey on the request to not use it.
- `Period` Can be one of three values:
  - `alltime` Orders by most popular over all links 
  - `monthly` Orders by most popular for the month (UTC)
  - `daily` Orders by most popular for the current day (UTC)
- `Sort` Value can be one of:
  - `ASC` Sorts from the lowest count to highest. 
  - `DESC` Sorts from the highest count to  lowest. Default if property is omitted.

#### REQUEST

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
      "username": "SuperAdmin1",
      "Limit": 10,
      "PageKey": null,
      "Period": "daily",
      "Sort": "DESC"
    }
}
```

#### RESPONSE

#### Success
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

> *[Back to all Requests](#links)*
---------------

## Paginate Campaign Stats

Paginate and count the stats for the campaign links server side.

- `PageKey` Used to continue the pagination. If the first page call returned a `PageKey` in the response it indicates that
  there are more items. Specifying it in the next request continues getting the data from that previous point.
  Leave empty string, null or omit the PageKey on the request to not use it.

#### REQUEST

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
      "campaign_id": "#cmp#2021-01-28 18:53:19.214#970a6ed7-90fd-42d9-81a4-62ad838e85bd",
      "PageKey": null
    }
}
```

#### RESPONSE

#### Success
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

- `PageKey` Will only have a value IF there are more links that needs to be counted server side, otherwise it will be null.
- `Stat` This object contains statistic fields similar to `<model:link>`. With the extra property
  of `links` indicating the number of links that has been used for the calculation. 

> *[Back to all Requests](#links)*
---------------

## Find Batch

Find links in a batch of maximum 25.  Similar to *Find* except that it is done in batches.

#### REQUEST

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
      "link_ids": ["#lnk#/anything"]
    }
}
```

#### RESPONSE

#### Success
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

> *[Back to all Requests](#links)*
---------------

## Find Batch History

Find link history in batches of maximum 25.

- `period` Can be one of two values:
  - `hourly` Retrieve all the hourly values for the given `period_value` specified in days. 
      Returns array of <model:link_history_hourly>.
  - `daily` Retrieve all the daily values for the given `period_value` specified in months.
      Returns array of <model:link_history_daily>.
- `period_value` 
  - IF `period` is `hourly` then this should be formatted as `YYYY-MM-DD`.
  - IF `period` is `daily` then this should be formatted as `YYYY-MM`.
  
#### REQUEST

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
      "link_ids": ["#lnk#/anything"],
      "period": "daily",
      "period_value": "2021-06"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    "Items": [<model:link_history_hourly> | <model:link_history_daily>],
    "PageKey": null
  }
}
```

- `PageKey` Always null, not used.

> *[Back to all Requests](#links)*
---------------

## Find User History

Finds the history for all the links of a user.

- `period_values`
  - An array of values, maximum 13.
  - Formatted as `YYYY-MM`

#### REQUEST

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
      "period_value": ["2021-04", "2021-05"]
    }
}
```

#### RESPONSE

#### Success
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

> *[Back to all Requests](#links)*
---------------

## Delete

Delete links in batches of maximum 10.

- `invalidate` Whether to also clear them out of the edge caches **immediately**. Can be either true or false. 
  If false is specified then the link will be removed and inaccessible within a day.

::: danger
Specifying `invalidate` as true uses an invalidation which is a billing metric, 
only do so if absolutely necessary.
:::

#### REQUEST

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
      "link_ids": ["#lnk#/anything"],
      "invalidate": false
    }
}
```

#### RESPONSE

#### Success
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

> *[Back to all Requests](#links)*
---------------
