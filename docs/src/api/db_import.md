# Imports

Data can be imported in bulk using CSV files.

Consult the <[model:import](model.html#import)> for general property/field information.

All import requests (`/db_import/*`) need to specify the Auth headers below as described in [General](./#authentication).

#### HEADERS
```json
"x-api-key": <API KEY>,
"Authorization": <JWT ID Token>
```

----
#### ALL REQUESTS

[[toc]]


## Create

Creating an Import job **consists of two parts**. The **first** is **creating the Import Job record** using this API call that 
returns an S3 `SignedPutUrl` (expires after 15 minutes). The **second** part involves doing a `PUT` request to the `SignedPutUrl` uploading **the contents of 
the file**. Only then will the file be processed and the job start,  if the queue is empty.

#### REQUEST
#### Path
```
/db_import/create
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
      "import_type": "LINKS",
      "import_format": "LINKS_1",
      "file_name": "test1.csv",
      "notes": "This is for Jan 2021 news letter.. "
    }
}
```

See the [model](model.html#import) for a full field description/rules.

- `client_id`, `username`, `import_type`, `import_format`, `file_name` Required.

#### RESPONSE

#### Success

```json
{
  "control": {
    "ResponseCode": 2000,
    "TraceID": "11648023-1376-4da8-806e-11999c1c519f",
    "Build": "eb511f1"
  },
  "data": {
    "DbImport": <model:db_import>,
    "SignedPutUrl": ""
  }
}
```

On success, do a `PUT` request to the S3 `SignedPutUrl` with the contents of the file. The S3 signed URL expires after 15 minutes.

> *[Back to all Requests](#import)*
---------------


## Find

Finds an Import Job and links to the original and processed files. The processed file will include individual row level
errors (if any) in the last column of each row.

#### REQUEST

#### Path
```
/db_import/find
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
      "import_id": "#imp#87b3ba4e-a58d-4b27-b292-5867df9c24d6"
    }
}
```

#### RESPONSE

#### Success
```json
{
  "control": { "ResponseCode": 2000, "TraceID": "11648023-1376-4da8-806e-11999c1c519f", "Build": "eb511f1" },
  "data": {
    ...<model:db_import>,
    "SignedFileGetUrlRaw": "",
    "SignedFileGetUrlProcessed": ""
  }
}
```

Returns all the `<model:db_import>` fields/properties and two additional properties. 
Both `SignedFileGetUrlRaw` and `SignedFileGetUrlProcessed` are S3 signed URLs and expire in 15 minutes from being received.  

- `SignedFileGetUrlRaw` Signed S3 GET URL to get the original file.
- `SignedFileGetUrlProcessed` Signed S3 GET URL to get the processed file.

> *[Back to all Requests](#imports)*
---------------












## Paginate

Paginate the Import Jobs of a user.

Pagination is seek based and ordered by creation date in descending order.

#### REQUEST

#### Path
```
/db_import/paginate_user
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
    "Items": [<model:db_import>],
    "PageKey": null
  }
}
```

Use the Find API call to get the original and processed files download urls.

- `PageKey` Will only have a value IF there are more items to be retrieved, otherwise null.

> *[Back to all Requests](#imports)*
---------------
