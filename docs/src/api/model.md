# Models

[[toc]]

These are the models that can be returned by API calls. They are presented in example format and will be referenced by
name ex: `<model:link>`. All fields will be indicated, but those not defined will not be returned or returned as the 
default for that type.

General information of the field will be indicated if of significant value.

- The **Date Format** is not strictly ISO1806, the `T` is replaced with a space, no time zone indication as this it is always UTC and the 
  milliseconds are included. Example: `2021-05-19 19:33:03.324`
- The `client_id` can be acquired by inspecting the JWT claims of the user or doing the Find User api call of that user. *Reserved for future use*
- The `user_id` can be converted to the `username` field by adding the prefix of `#usr#` some API calls recquire the `username`
  and others the `user_id`.
- When referring to the value `null` it means the JSON value `null`, not string value. 

## Link 
#### `<model:link>`

A record that contains the short URL, long URL and other related data.

```json
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
- `enable` *Reserved for future use*.
- `hidden` Hidden links do not show on the Subscription Portal
- `client_id` This value can be acquired by inspecting the JWT claims of the user or doing the Find User api call. *Reserved for future use*.
- `clicks` Total clicks for the lifespan of the link.
- `clicks_unique` Total unique clicks for the lifespan of the link. 
    Uniqueness counted by the querystring attached to the short url when navigated by user. 
- `clicks_day` Total clicks this link did in the current day, timezone UTC. 
- `clicks_month` Total clicks this link did in the current month, timezone UTC. 

----

## Link History Hourly
#### `<model:link_history_hourly>`

Hourly views aggregated by day, all dates and times are in UTC. 

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
- `period` The period specifies the day the hourly clicks (in the views object) are for, format `YYYY-MM-DD` (UTC).
- `views` An object with the key being the **hour** and the value the count **for that hour**. Keys/hours range from 0 to 23 (UTC).
- `last_updated_at` Last time the link was clicked/record object was updated.


----

## Link History Daily 
#### `<model:link_history_daily>`

Daily views aggregated by month, all dates and times are in UTC.

```
{
    "for": "daily",
    "link_id": "#lnk#/anything",
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "user_id": "#usr#SuperAdmin1",
    "period": "2021-05",
    "views": {
      19: 2578,
      20: 33159,
      21: 8648,
      22: 8640
    },
    "os": {
      "Windows": 2
    },
    "browser": {
      "Firefox": 2
    },
    "country": {
          "ORD": 873,
          "BRU": 35,
          "CDG": 9,
          "BLR": 180,
          "TXL": 5,
          "GRU": 5332,
    },
    "referer": {
      "reddit.com": 1
      "facebook.com": 10
    },
    "bots": 64303,
    "last_updated_at": "2021-05-19 19:33:03.324"
}
```

- `for` Will always be `daily`
- `period` The period specifies the day the hourly clicks (in the views object) are for, format `YYYY-MM-DD` (UTC).
- `views` An object with the key being the **day** and the value is the count for that **day of the month**.
- `os` An object with the key being the operating system and the value is the count for **that month**.
- `browser` An object with the key being the browser and the value is the count for **that month**.
- `country` An object with the key being the [IATA Code](https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm) (airport codes indicating country & city), and the value is the count for **that month**.
- `referer` An object with the key being the site that referered, and the value is the count for **that month**.
- `bots` The amount of bots that followed the link for **that month**.
- `last_updated_at` Last time the link was clicked/record object was updated.

----

## Campaign
#### `<model:campaign>`

A Campaign is just a grouping of links whereby a link can only have one campaign.

```json
{
    "campaign_id": "#cmp#2021-05-16 10:05:56.958#db6f265f-ac89-4004-8c69-bb7f9e8203ed",
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "user_id": "#usr#SuperAdmin1",
    "name": "News letter 2021-05",
    "description": "May 2020 news letter",
    "channels": ["Sms", "Email"],
    "created_at": "2021-05-19 19:33:03.324"
}
```

- `client_id`, `username`, `name` Required.
- `name` Maximum length of 50 characters.
- `description` Maximum length of 1024 characters.
- `channels` Optional, array of strings. Not validated against Account set visible Campaign Channels.
    Maximum 100 channels, with each having a maximum length of 25 characters.
  
----

## Import
#### `<model:db_import>`

Data can be imported in bulk using CSV files. An Import (DB Import) record indicates the status of the import job.

There can only be one import active (in progress) at any point in time, if more are created, then they will be queued. 

Soft limits: 
- The `LINKS` import_type is restricted to 10k rows per CSV. 

```json
{
    "import_id": "#imp#87b3ba4e-a58d-4b27-b292-5867df9c24d6",
    "import_type": "LINKS",
    "import_format": "LINKS_1",
    "import_status": "SUCCESSFUL",
    "import_status_description": "Imported 100%",
    "line_validation_ignore_error": true,
    "file_name": "links-auto-slug-10k.csv",
    "file_sie": "618965",
    "client_id": "#clt#952be1ae-ca1f-401f-a9a2-6ab2b2116e57",
    "user_id": "#usr#SuperAdmin1",
    "processed_at": "2021-05-16 21:08:47.275",
    "created_at": "2021-05-16 20:59:47.626",
    "notes": "10k links auto slug",
    "total_rows": 10000,
    "total_error": 0,
    "total_ignored": 0,
    "total_success": 10000
}
```

- `import_type` The type of record to import. Available values are:
    - `LINKS`
- `import_format` The format of the data, this is dependent on the `import_type`. Available values grouped by import type:
    - `LINKS`:
        - `LINKS_1` This is the standard WarpURL format that can be downloaded [here](https://warpurl.com/cdn/files/import_templates/links/warpurl.csv).
- `import_status` The current status of the job, available values are:
    - `QUEUED` Initial status after creating the record. This status will be retained untill processing actually starts,
        where it will transition to  `PROCESSING`.
    - `PROCESSING` Busy processing and importing the file.
    - `SUCCESSFUL` Processing complete. Not an indication that all records were imported successfully.
    - `ERROR_VALIDATION` Validation Error occurred that prematurely stopped the import process. 
        Not an indication that all records were imported successfully.
    - `ERROR_GENERAL`
- `import_status_description` Text description of import status and percentage.
- `line_validation_ignore_error` Reserved for future use. 
- `file_name` The name of the file that was used.
- `file_size` The size of the file in bytes.
- `notes` Optional, Any additional notes for this import. Maximum length 1024 characters.
- `total_rows` Count of rows detected.
- `total_error` Count of rows that could not be imported. Errors can be viewed by downloading the processed file.
    Each row's error will be appended (last) as a new column on that row. 
- `total_ignored` Count of rows that were ignored. Reserved for future use.
- `total_success` Count of rows that were imported successfully.

----

## Access Key
#### `<model:access_key>`

Access Keys are exchanged for a short-lived JWT ID Token used for authorization when making API calls.

```json
{
    "key_id": "2IEx7239xMzmhCdJ2nbWX",
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "user_id": "#usr#SuperAdmin1",
    "key_name": "Test Key",
    "enabled": true,
    "created_at": "2021-05-19 19:33:03.324"
}
```

- All fields are Required.
- `key_name` Maximum length of 100 characters.
- `enabled` Only supported values are `true` and `false`.

----

## Client
#### `<model:client>`

The main/top *container*, every model can only belong to a single client.

```json
{
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "name": "AccountName",
    "link_tags": [
                    "2021",
                    "Blog",
                    "Product",
                    "Meetup"
                 ],
    "campaign_channels": [
                            "SMS",
                            "Email",
                            "Twitter",
                            "LinkedIn"
                         ],
    "clicks": 21072,
    "clicks_day": 0,
    "clicks_month": 21002,
    "clicks_month_unique": 16,
    "created_at": "2021-04-08 19:59:38.509",
    "updated_at": "2021-05-16 19:41:39.021",
    "links": 11012
}
```

- `name` Maximum length of 50 characters.
- `link_tags` An array of values that are used for displaying the available **Tag** options on the frontend. Tags are used
    to group similar links.
- `campaign_channels` An array of values that are used for displaying the available **Campaign Channel** options on the frontend. 
    Campaign Channels are used to categorize links with similarities within a campaign. 
- `clicks` Total clicks for the lifespan of the client.
- `clicks_day` Total clicks this client did in the current day, timezone UTC.
- `clicks_month` Total clicks this client did in the current month, timezone UTC.
- `clicks_month_unique` Total unique clicks this client did in the current month, timezone UTC.
  Uniqueness counted same as for the Link Model.
- `links` The amount of links this client has.

----


## User
#### `<model:user>`

The secondary *container*, every model (except client) can only belong to a single user.

```json
{
    "client_id": "#clt#6be8d279-591a-4210-922e-d6caa605b063",
    "username": "SuperAdmin1",
    "name": "Rehan",
    "email": "rehan@warpurl.com",
    "user_type": "root",
    "clicks": 21071,
    "clicks_day": 0,
    "clicks_month": 21001,
    "created_at": "2021-04-08 19:59:38.509",
    "updated_at": "2021-04-08 19:59:38.509",
    "enabled": true,
    "share_can_assume": []
}
```

- `name` Maximum length of 50 characters.
- `user_type` Can be one of the following values:
    - `root` The Super Admin user that has all rights. They can assume any admin and user. 
    - `admin` Has all rights except creating other admins and updating client information. They can also assume any user but not admins. 
    - `user` Can only see their own links, campaigns, ect.
- `link_tags` An array of values that are used for displaying the available **Tag** options on the frontend. Tags are used
  to group similar links.
- `campaign_channels` An array of values that are used for displaying the available **Campaign Channel** options on the frontend.
  Campaign Channels are used to categorize links with similarities within a campaign.
- `clicks` Total clicks for the lifespan of the client.
- `clicks_day` Total clicks this client did in the current day, timezone UTC.
- `clicks_month` Total clicks this client did in the current month, timezone UTC.
- `enabled` Only supported values are `true` and `false`.
- `share_can_assume` The users that this user can assume. *Reserved fo future use, subject to change*

----
