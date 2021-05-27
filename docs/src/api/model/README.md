# Models

[[toc]]

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

## Link 
#### `<model:link>`

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

## Link History Hourly
#### `<mode:link_history_hourly>`

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
#### `<mode:link_history_daily>`

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
