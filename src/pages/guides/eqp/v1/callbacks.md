---
title: API callbacks
description: Register a URL to receive notifications when the status of a EQP process has changed.
---

# API callbacks

The multiple steps of the EQP process take time to complete. The results of these steps can impact the availability or status of data that was previously submitted.
Rather than having to continuously poll for updates, you can register an API callback URL in the user profile.

<InlineAlert variant="info" slots="text"/>

API Callback URLs can only be registered through the API.

Whenever an update occurs to a product or a file, a JSON API request will be sent -- via a POST -- to the registered callback URL.

## Register a callback

Callbacks are registered using the [User Profile](users.md) API.

|Field|Type|Description|
|-------------|-----|-----------------|
|`name`|string|Optional: name for this callback|
|`url`|string|URL that will receive callback JSON requests|
|`username`|string|Basic authorization username|
|`password`|string|Basic authorization password - never returned in the GET response|

<CodeBlock slots="heading, code" repeat="2" languages="CURL, JSON" />

### Request

```curl
curl -X PUT \
     -H 'Authorization: Bearer baGXoStRuR9VCDFQGZNzgNqbqu5WUwlr.cAxZJ9m22Le7' \
     -H 'Content-Type: application/json' \
     -d '{"api_callbacks": [{"name": "My 1st EQP Callback","url": "https://developer.example.com/rest/v1/callback","username": "key","password": "secret"}]}' \
     https://commercedeveloper-sandbox-api.adobe.com/rest/v1/users/MAG123456789
```

### Response

```json
{
    ...
    "api_callbacks": [
        {
            "name": "My 1st EQP Callback",
            "url": "https://developer.example.com/rest/v1/callback",
            "username": "key"
        }
    ],
    ...
}
```

## Authentication

API callbacks are authenticated using a Basic Authorization header.
Callbacks are only sent using HTTPS to ensure the security and integrity of the request.

For the callback registered in the example above, the following
header will be constructed and sent in every callback request:

```http
Authorization: Basic a2V5OnNlY3JldA==
```

## Callback structures

Each event has a unique code provided in the `callback_event` field.
The `update_info` object has a different structure, depending on the event code.
Resource IDs are provided in the `update_info` structure so that additional
information can be requested using the API endpoints for those resources.

### File upload callbacks

Malware scan results are sent out for [File](files.md) resources when the asynchronous scan completes.

```json
{
    "callback_event": "malware_scan_complete",
    "update_info": {
        "file_upload_id": "2309480238.238475.0",
        "tool_result": "passed",
        "modified_at": "2022-08-25 19:20:21"
    }
}
```

### Package callbacks

EQP status updates are sent out for [Package](packages.md) resources when the product's EQP state is modified.

```json
{
    "callback_event": "eqp_status_update",
    "update_info": {
        "submission_id": "s5w9k703ru",
        "item_id": "user_upload_version_1",
        "eqp_flow": "marketing",
        "current_status": "approved",
        "eqp_status": {
            "overall": "in_progress",
            "technical": "draft",
            "marketing": "approved"
        },
        "modified_at": "2022-08-25 19:20:21"
    }
}
```
