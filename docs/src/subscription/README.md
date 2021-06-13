# Subscription

::: tip EXPLORE THE DEMO
A picture is worth a thousand words, but a demo is worth a million. Interact directly with the Demo Subscription here: 
[app.demo.warpurl.net](https://app.demo.warpurl.net) to see all the features in action.
:::

## Users
A Subscription has only 1 Super Admin which is the first user to complete registration after the Subscription has been created.
The Super Admin can then invite additional Admins and Users. Admins can only invite Users and can not
change any account settings.

Every user (SuperAdmin/Admin/User) has their own  profile, dashboard, links ect. Super Admins and Admins can by default assume/impersonate
any User in that Subscription. Users can also assume/impersonate each other but explicit permission must be granted by
the Super Admin/Admin. Each user can generate Access Keys for their profile to use with the API.

## Links
Each user (SuperAdmin/Admin/User) manages their own links and other data. A Link can belong to a single Campaign and Campaign Channel,
but can have more than one Tag. Tags and Campaign Channels displayed on the frontend are Account level settings that only 
the Super Admin can update.

Links can be viewed by:

- Most recently created
- Popularity, most popular(descending) or least popular(ascending)
  - For all time
  - For that month
  - For today
- Campaign
- Tag
- Searched via slug

The built-in UTM Builder can be used to easily assign the UTM components on the long URLs.

## Link History

Multiple Link Histories(Statistics) can be viewed at the same time.
Enabling a single statistic page view and comparison for all the Links of a Campaign/Tag/multiple individually selected links.

We record the following per link:

- Total Clicks
- Monthly Clicks
- Daily Clicks
- Hourly Clicks
- Unique Clicks

When available we also record the following per link:

- Locations, the closest major country and city
- Top Referrers
- Devices
- Operating System
- Browser
- Human vs Bot clicks

Similar metrics are recorded for the user as well, which is just the aggregation of all the Links for that user.
This statistics alongside other metrics are shown in each user Dashboard.

Processing history of link clicks to create statistics is done in batches and happen in **near real time (approximately 5 minutes).**

We **don't store any IP addresses or Personal Information(PI)** for longer than is needed to process the history into statistics.
Unique Clicks are identified by the querystring of the Short URL. The two links below are considered unique.

```
<shortening-domain>/my-link
<shortening-domain>/my-link?user=3917402
```



## Imports

Links can be imported using CSV files. Different CSV formats are supported, the only implemented one at the moment is the
WarpURL format. This format template can be downloaded when creating an Import.
Links can be imported in batches of maximum 10k per CSV file. This is just a soft limit and can be increased
by contacting support.

The "Short URL" column can be left empty if the import should auto generate a value for the slug.

After the import has been processed, an additional column will be added on a per-row basis ONLY if it had an error. The 
error will be specified in this last column. This is visible by downloading the Output file.

## Campaigns

A Campaign is a logical grouping of links, ex: Jan 2020 newsletter, Product X promotion. A Link can only belong to one Campaign.

Campaign history/statistics are
calculated as the summation of all the individual Link histories/statistics. Links in a Campaign can each belong to sub/smaller
grouping within the Campaign known as a Campaign Channel.

## Tags

A Tag is used to track/group multiple links regardless of Campaign, ex: Newsletter, Marketing, Blog, SMS. A Link can thus
have multiple tags associated to it.
