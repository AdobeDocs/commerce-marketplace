---
title: Packages
description: Describes the Marketplace EQP review process and how to submit packages for review.
---

# Packages

Use this resource to initiate and manage all aspects of submitting a package to the
[Marketplace Extension Quality Program (EQP)](../../sellers/extension-quality-program.md).
You can provide all metadata associated with a package, both the technical and the marketing information, in a single step, or in several steps, using incremental updates.

*  **Technical information** - References to code artifacts, such as Composer-compliant Magento 2 ZIP files, version compatibility, and release notes.

*  **Marketing information** - Includes package descriptions, images for icons and galleries, pricing information, support and installation services offered, and various guides (user, installation, and reference) in PDF.

Before submitting a package, you must first [upload your files](files.md) and associate the ID returned by the
`/rest/v1/files/uploads` endpoint with your package using JSON parameters in the request body.

You can also check package submission status and retrieve [testing information](test-results.md) from the technical and marketing reviews.

A successful submission results in a package being published to the [Commerce Marketplace](https://marketplace.magento.com/).

## EQP review process

The EQP review process includes two steps:

*  In **technical review**, we perform all automated testing. This step also involves manual testing after all automated tests run.
*  In **marketing review**, we manually review all marketing content associated with your package before you can publish it on the Commerce Marketplace.

These review steps occur in parallel when you submit a package.
If both steps are successful, the package can be published to the Commerce Marketplace.
If there is a failure, you can iteratively fix issues until they are resolved.

## Package submissions

```http
POST /rest/v1/products/packages
PUT /rest/v1/products/packages
PUT /rest/v1/products/packages/:submission_id
PUT /rest/v1/products/packages/:item_id
```

### Submit a package

You can submit a package in either of the following ways:

*  A single POST request with all required fields set. You must explicitly indicate that you are submitting for technical and marketing review using the `action` parameter.
   *  If this package represents a newer version to an already existing extension, then also supply the `sku` parameter.
*  A series of requests, typically in the following order:
   1. A single POST request with the minimum required fields set and `action` set to `draft` in either `technical`, `marketing`, or both. This request accepts the new package and saves it on the Developer Portal for further updates. It returns a unique `submission_id` for subsequent PUT operations.
   1. One or more PUT requests in which you configure the package parameters. In these requests, set `action` to `draft` in `technical`, `marketing`, or both.
   1. A final PUT request indicating submission for `technical`, `marketing`, or both.

You can update one or more parameters in `draft` mode.
In this mode, the API checks only for basic type-validation issues.

When the `action` field is set to `submit`, the API validates fields to ensure all
required parameters are available on the Developer Portal to initiate the EQP process,
and that parameters which depend upon each other match up correctly.

<InlineAlert variant="info" slots="text"/>

All `action` fields are optional. If not specified, `draft` is the default value.

The following example shows a POST request with all required parameters set for both technical and marketing submissions:

```json
[
  {
    "action" : {
      "technical" : "submit",
      "marketing" : "submit"
    },
    "type" : "extension",
    "platform" : "M2",
    "version_compatibility" : [
      {
        "edition" : "CE",
        "versions" : ["2.3", "2.4"]
      },
      {
        "edition" : "EE",
        "versions" : ["2.3", "2.4"]
      },
      {
        "edition" : "ECE",
        "versions" : ["2.3", "2.4"]
      }
    ],
    "name" : "One Click Checkout",
    "long_description" : "<Long description here>",
    "release_notes" : "<Release notes here>",
    "version" : "1.1.5",
    "artifact" : {
      "file_upload_id" : "5c11e656057b42.97931218.5"
    },
    "documentation_artifacts" : {
      "user" : {
        "file_upload_id" : "5c644d97bb7c41.37505716.6"
      },
      "installation" : {
        "file_upload_id" : "5c644daf21fee4.39102137.2"
      },
      "reference" : {
        "file_upload_id" : "5c644f4dcb1900.18508194.9"
      }
    },
    "media_artifacts" : {
      "icon_image" : {
        "file_upload_id" : "5c129cd41ba478.65767699.1"
      },
      "gallery_images" : [
        {
          "file_upload_id" : "5c644fa344e5d7.04253635.8"
        },
        {
          "file_upload_id" : "5c648b98446065.77844389.4"
        },
        {
          "file_upload_id" : "5c648b984d0228.21794482.7"
        },
        {
          "file_upload_id" : "5c648b98698ed0.64632056.3"
        },
        {
          "file_upload_id" : "5c648b986a3d98.83415858.0"
        }
      ],
      "video_urls" : [
        "https://www.youtube.com/watch?v=l33T2-YC4tk",
        "https://www.youtube.com/watch?v=682p52tFcmY"
      ]
    },
    "categories" : [
      "//Extensions//Payments & Security//Checkout Enhancements"
    ],
    "pricing_model" : {
       "pricing_type" : "one-time",
       "payment_period" : 1
    },
    "prices" : [
      {
        "edition" : "CE",
        "currency_code" : "USD",
        "price" : 15.50
      },
      {
        "edition" : "EE",
        "currency_code" : "USD",
        "price" : 45.00,
        "installation_price" : 0.00
      },
      {
        "edition" : "ECE",
        "currency_code" : "USD",
        "price" : 30.00,
        "installation_price" : 0.00
      }
    ],
    "license_type" : "bsd"
  }
]
```

Since the API accepts batch requests for both POST and PUT operations,
single submissions must be sent as an array containing one item.

If you save the request body to a file, for example, `/tmp/one-click-submission-1.0.0.json`,
the following example shows the package submission process:

<CodeBlock slots="heading, code" repeat="2" languages="CURL, JSON" />

#### Request

```curl
curl -X POST \
     -H 'Authorization: Bearer baGXoStRuR9VCDFQGZNzgNqbqu5WUwlr.cAxZJ9m22Le7' \
     -H 'Content-Type: application/json' \
     --data-binary  @/tmp/one-click-submission-1.0.0.json \
     https://developer-stg-api.magento.com/rest/v1/products/packages
```

#### Response

```json
[
  {
    "code": 200,
    "message": "Success",
    "submission_id": "f4eacd72be",
    "eqp_status": {
      "overall": "in_progress",
      "technical": "in_automation",
      "marketing": "awaiting_marketing_review"
    },
    "created_at": "2020-04-17 16:00:00",
    "modified_at": "2020-04-17 16:00:00"
  }
]
```

*  The API returns a HTTP 200 batch response listing items in the same order as they were provided in the request.
*  Each item contains a `code` and `message` indicating success or failure. Any non-200 code indicates an error.
   Refer to the message for more details.
*  A unique `submission_id` is returned for each successful item, which must be used for any subsequent GET or PUT methods.
*  Optionally, if a user-defined `item_id` was supplied during the POST,
   the response will echo back the same `item_id` for each item in the batch.
   The resource can be retrieved via GET using the `item_id`.
*  Any non-200 HTTP response code indicates an error for the entire batch request. See [handling errors](handling-errors.md).

### Update a package

The PUT method can be used to update packages in the following states:

*  The package is in draft mode for the technical or marketing review; or both.
*  The package has been rejected in either the technical or marketing review; or both.
   You must fix these issues and re-submit the package.
*  The package has been released to the Commerce Marketplace.
*  The package was removed from Commerce Marketplace by the developer and needs to be re-published.
*  The package can be recalled while in the EQP pipeline.
*  After a package has been released to the Commerce Marketplace, you can update marketing information only.
   Changing marketing information causes the package to be placed in marketing review.
   The package continues to be live on the marketplace, and after the marketing approval,
   the updated fields will be published to the store.

You cannot modify a package during the EQP process, except to recall the package.

Updating several packages in a batch request is similar to the POST version above.
The only difference is to supply `submission_id` for each item obtained from the POST request.

The PUT method also allows for updating a single package with `submission_id` as shown in the following example:

**Request:**

```bash
curl -X PUT \
     -H 'Authorization: Bearer baGXoStRuR9VCDFQGZNzgNqbqu5WUwlr.cAxZJ9m22Le7' \
     -H 'Content-Type: application/json' \
     -d '{ "action" : { "marketing" : "submit"} }' \
     https://developer-stg-api.magento.com/rest/v1/products/packages/f4eacd72be
```

The HTTP response code will indicate success or failure.

#### Required parameters

If the **action** parameter gives a `submit` value for **technical**, **marketing** or both,
the required parameters are listed below by their respective parallel EQP pipelines:

##### Technical

|Parameter|Comments|
----------|--------|
|`type`||
|`platform`||
|`version_compatibility`||
|`release_notes`||
|`version`||
|`sku`|Only valid when a previous version exists|
|`artifact`||
|`documentation_artifacts`|At least the `user` guide must be supplied.|

##### Marketing

|Parameter|Comments|
|---------|---------|
|`name`||
|`long_description`||
|`documentation_artifacts`||
|`categories`||
|`media_artifacts`|The icon, and at least one image in the gallery is required. The video urls are optional.|
|`license_type`||
|`custom_license_name`|Only if license_type is `custom`.|
|`custom_license_url`|Only if license_type is `custom`.|
|`submission_id`|For PUT commands.|

##### Submission in several steps

As described earlier, a submission can also be done in several steps in draft mode, followed by the action to `submit` for **technical** and/or **marketing** review. In such cases, the first
POST request in draft mode can be done with a minimal set of parameters:

|Parameter|Comments|
|---------|--------|
|`type`|
|`platform`|
|`name`||
|`version`||
|`sku`|Only valid when a previous version exists|
|`long_description`||

With the returned  `submission_id`, the remaining required parameters can be supplied using a PUT request in draft mode, and/or with an `action` to submit to either technical or marketing review; or both.

## Get package details

```http
GET /rest/v1/products/packages
GET /rest/v1/products/packages/:submission_id
GET /rest/v1/products/packages/skus
GET /rest/v1/products/packages/skus/:url_encoded_sku
GET /rest/v1/products/packages/items
GET /rest/v1/products/packages/items/:item_id
```

There are various ways to retrieve package details, most of which are convenient alternatives to the typical way using `submission_id` for a specific package submission. The data returned is the same for the primary and the secondary ways.

The alternative ways provided are:

*  `skus`: Retrieves all versions of a particular package sku. An additional `version` filter is available to retrieve a specific sku and version.
*  `item_id`: Retrieves package details by specifying a user-defined unique `item_id` if one was supplied during the POST call.

The following basic endpoints retrieve all package details (every version of every package submitted):

```http
GET /rest/v1/products/packages
GET /rest/v1/products/packages/skus
GET /rest/v1/products/packages/items
```

This sample call lists all packages belonging to a user:

<CodeBlock slots="heading, code" repeat="2" languages="CURL, JSON" />

### Request

```curl
curl -X GET \
     -H 'Authorization: Bearer baGXoStRuR9VCDFQGZNzgNqbqu5WUwlr.cAxZJ9m22Le7' \
     https://developer-stg-api.magento.com/rest/v1/products/packages
```

### Response

```json
[
  {
    "submission_id" : "f4eacd72be",
    "type" : "extension",
    "platform" : "M2",
    "version_compatibility" : [
      {
        "edition" : "CE",
        "versions" : ["2.3", "2.4"]
      },
      {
        "edition" : "EE",
        "versions" : ["2.3", "2.4"]
      },
      {
        "edition" : "ECE",
        "versions" : ["2.3", "2.4"]
      }
    ],
    "name" : "One Click Checkout",
    "short_description" : "",
    "long_description" : "<Long description here>",
    "sku" : "acme/one-click-checkout",
    "version" : "1.1.5",
    "release_notes" : "<Release notes here>",
    "artifact" : {
      "file_upload_id" : "5c11e656057b42.97931218.5",
      "filename" : "acme_one-click-checkout.zip",
      "content_type" : "application/zip",
      "size" : 182934,
      "malware_status" : "pass",
      "file_hash" : "f53f5db985b8815f1ce6fd4b48a0439a"
    },
    "documentation_artifacts" : {
      "user" : {
        "file_upload_id" : "5c644d97bb7c41.37505716.6",
        "filename" : "user.pdf",
        "content_type" : "application/pdf",
        "size" : 48392,
        "malware_status" : "pass",
        "file_hash" : "7f99e16a20457859fc0c86b5676a62ca"
      },
      "installation" : {
        "file_upload_id" : "5c644daf21fee4.39102137.2",
        "filename" : "installation.pdf",
        "content_type" : "application/pdf",
        "size" : 34876,
        "malware_status" : "pass",
        "file_hash" : "94392b98f02c56083995d23f02e460ab"
      },
      "reference" : {
        "file_upload_id" : "5c644f4dcb1900.18508194.9",
        "filename" : "reference.pdf",
        "content_type" : "application/pdf",
        "size" : 23845,
        "malware_status" : "pass",
        "file_hash" : "ec78ded664c71d80acf0e29f5dbafe2b"
      }
    },
    "media_artifacts" : {
      "icon_image" : {
        "file_upload_id" : "5c129cd41ba478.65767699.1",
        "filename" : "icon.png",
        "content_type" : "image/png",
        "size" : 37492,
        "malware_status" : "pass",
        "file_hash" : "dd0d04057cd1420afb76d6afa838d394"
      },
      "gallery_images" : [
        {
          "file_upload_id" : "5c644fa344e5d7.04253635.8",
          "filename" : "acme-logo.png",
          "content_type" : "image/png",
          "size" : 23947,
          "malware_status" : "pass",
          "file_hash" : "515f2eaf3cd4e43c32fda89a004306aa"
        },
        {
          "file_upload_id" : "5c648b98446065.77844389.4",
          "filename" : "catalog_demo.png",
          "content_type" : "image/png",
          "size" : 37492,
          "malware_status" : "pass",
          "file_hash" : "8da78313887fdc3d2506f39c46ccde4e"
        },
        {
          "file_upload_id" : "5c648b984d0228.21794482.7",
          "filename" : "cart-demo.png",
          "content_type" : "image/png",
          "size" : 38023,
          "malware_status" : "pass",
          "file_hash" : "30b6fef138e1433e6f8ff23a45b2fbb9"
        },
        {
          "file_upload_id" : "5c648b98698ed0.64632056.3",
          "filename" : "click-demo.png",
          "content_type" : "image/png",
          "size" : 48293,
          "malware_status" : "pass",
          "file_hash" : "0ced4d071dddc6e354acfa11f56a56f1"
        },
        {
          "file_upload_id" : "5c648b986a3d98.83415858.0",
          "filename" : "click-success.png",
          "content_type" : "image/png",
          "size" : 39482,
          "malware_status" : "pass",
          "file_hash" : "dfa3183472cc265a5510be1da0fe444c"
        }
      ],
      "video_urls" : [
        "https://www.youtube.com/watch?v=l33T2-YC4tk",
        "https://www.youtube.com/watch?v=682p52tFcmY"
      ]
    },
    "categories" : [
      "//Extensions//Payments & Security//Checkout Enhancements"
    ],
    "pricing_model" : {
       "pricing_type" : "one-time",
       "payment_period" : 1
    },
    "prices" : [
      {
        "edition" : "CE",
        "currency_code" : "USD",
        "price" : 15.50
      },
      {
        "edition" : "EE",
        "currency_code" : "USD",
        "price" : 45.00,
        "installation_price" : 0.00
      },
      {
        "edition" : "ECE",
        "currency_code" : "USD",
        "price" : 30.00,
        "installation_price" : 0.00
      }
    ],
    "license_type" : "bsd",
    "eqp_status" :  {
      "overall" : "in_progress",
      "technical" : "rejected",
      "marketing" : "approved"
    },
    "created_at": "2020-04-17 16:00:00",
    "modified_at": "2020-04-17 22:00:00"
  }
]
```

<!-- M1: tar ball ... packages.xml -->

*  The previous example shows one product only, but an array of products can be returned.
*  The `sku` and version will be determined from the code artifact (M2 zip file) meta-information (M2 `composer.json`), once it passes the malware checks.
*  The code, documentation, and media artifact files have additional info indicating meta-information on these files, including their current malware status.
*  The `eqp_status` field will indicate the current state of the package in the EQP process.
*  The `short_description` field will always be returned as an empty string.  This field is no longer used.  It is returned for backward compatibility.

To get additional details about the results of EQP testing, see [EQP Test Reports](test-results.md)

### Sorting and Filtering

The following fields enable both sorting and filtering support. Refer to the [Package fields](#package-fields) section above for valid values for certain fields):

|Field|Comments|
|-----|--------|
|`type`|Exact string match|
|`platform`|Exact string match|
|`item_id`|Sub-string match|
|`submission_id`|Sub-string match|
|`sku`|Sub-string match|
|`version`|Sub-string match|
|`name`|Sub-string match|
|`long_description`|Sub-string match|
|`release_notes`|Sub-string match|
|`is_patch`|Exact match|
|`license_type`|Exact string match|
|`custom_license_name`|Sub-string match|
|`custom_license_url`|Sub-string match|
|`requested_launch_date`|date match, allows range|
|`created_at`|date match, allows range|
|`modified_at`|date match, allows range|

A sample cURL request filtering all `themes` sorted by `platform` in ascending order and `created_at` in descending order:

**Request:**

```bash
curl -X GET \
     -H 'Authorization: Bearer baGXoStRuR9VCDFQGZNzgNqbqu5WUwlr.cAxZJ9m22Le7' \
     https://developer-stg-api.magento.com/rest/v1/products/packages?type=theme&sort=+platform,-created_at
```

**Response:**

A list of theme packages can be returned in the same way as described in [Get package details](#get-package-details).

## Package fields

The following sections describe all package object properties.
Unknown and readonly properties will be ignored in submissions.

<InlineAlert variant="info" slots="text"/>

Both `POST` and `PUT` requests support a batch model where multiple packages can be created or updated.

### action

The actions to be taken towards technical or marketing review during a package POST or PUT submission.

<InlineAlert variant="info" slots="text"/>

There is no way to directly re-publish a product to the store.
Send the "submit" action for the marketing content to re-publish the product.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|POST, PUT|-|no|

**JSON structures:**

During the EQP process, it can take the following fields to control the parallel technical and marketing review flows:

```json
"action" : {
  "technical" : "submit",
  "marketing" : "submit"
}
```

|Technical/Marketing Field Value|Type|Description|
|-------------------------------|----|-----------|
|`draft`|string|Save the supplied parameter values but take no further action.|
|`submit`|string|Submit to the EQP process.|
|`recall`|string|Recall the earlier submission from the EQP process.|

Once a package has been published to the store, this takes the following field:

```json
{
    "action" : {
      "overall" : "remove"
    }
}
```

|Value|Type|Description|
|-----|----|-----------|
|`remove`|string|Removes the package from the store.|

#### action.marketing

The actions to be taken towards a marketing review. Possible values:

*  `draft` (default)
*  `submit` (...to review)
*  `recall` (...from review)

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|POST, PUT|-|no|

#### action.overall

General actions to be taken. Possible values:

*  `remove`(...from the store)
*  `cancel` (abandon this version)

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|POST, PUT|-|no|

#### action.technical

Actions to be taken towards technical review. Possible values:

*  `draft` (default)
*  `submit` (...to review)
*  `recall` (...from review)

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|POST, PUT|-|no|

### actions_now_available

A comma-separated list of values currently valid in the `action` field for this package

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|no|

### artifact

This is the package code artifact (ZIP file for Commerce) associated with this version.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|technical|no|

**JSON structure:**

```json
"artifact" : {
  "file_upload_id" : "5c11e656057b42.97931218.5"
}
```

#### artifact.content_type

The mime-type given when uploading the file. The value can be any valid mime-type.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|no|

#### artifact.filename

The filename given when uploading the file. The value can be any valid filename.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|technical|no|

#### artifact.file_hash

The MD5 hash of the file.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|no|

#### artifact.file_upload_id

The only writable field of this sub-object, used to associate a file with this package version. The value is a unique file upload ID obtained from the Files API.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|technical|no|

#### artifact.malware_status

The status of the malware check on the file. Possible values:

*  `pass`
*  `fail`
*  `in-progress`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|no|

#### artifact.size

An integer indicating the size of the file, in bytes.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|int|GET, POST, PUT|-|no|

#### artifact.url

The link to download the file, if applicable. The value can be any valid URL.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|no|

### browser_os_compatibility

The browser and its associated OS capabilities this package supports. The list of valid values for the `browser_os_compatibility` are:

Browsers:

*  `chrome`
*  `firefox`
*  `safari`
*  `opera`
*  `edge`

OS:

*  `linux`
*  `mac`
*  `windows`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

**JSON structure:**

Sample structure for a package supporting only Chrome and Firefox:

```json
"browser_os_compatibility" : {
  "chrome" : {
    "mac" : [ "39", "44"],
    "windows" : ["43", "44"],
    "linux" : ["43", "44"]
  },
  "firefox" : {
    "mac" : [ "40", "41"],
    "windows" : ["40", "41"],
    "linux" : ["40", "41"]
  }
}
```

### browsers

A simplified way to specify browser compatibility. It is assumed that each browser listed is compatible on all platforms.

If [`browser_os_compatibility`](#browser_os_compatibility) is also present, this field is ignored. Otherwise, if present, this field overwrites all previously stored compatibility rules for this package version.

The list of valid browsers is the same as for `browser_os_compatibility`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

**JSON structure:**

```json
"browsers" : [
  "chrome",
  "firefox"
]
```

### categories

A list of one to three categories, all from the same main category, expressed as a `path` for the package. For example, `//Extension//Marketing//SEO/SEM`. Note that the path separator is `//`, which allows for a single slash like `SEO/SEM` in the path name. Refer to the [Marketplace Store](https://marketplace.magento.com) for the current list of categories.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

### created_at

The UTC date and time the package was first submitted. The format is `YYYY-MM-DD HH:MM:SS`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|DateTime|GET|-|yes|

### custom_license_name

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST, PUT|technical|yes|

The name of custom license. This value is required only if `license_type` is set to `custom`.

### custom_license_url

The valid URL that points to the license. This value is required only if `license_type` is set to `custom`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST, PUT|technical|yes|

### documentation_artifacts

The user, installation, and reference PDF manuals. At least one of these is required for extensions, but not for shared packages.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|both|no|

**JSON structure:**

```json
"documentation_artifacts" : {
  "user" : {
    "file_upload_id" : "5c644d97bb7c41.37505716.6"
  },
  "installation" : {
    "file_upload_id" : "5c644daf21fee4.39102137.2"
  },
  "reference" : {
    "file_upload_id" : "5c644f4dcb1900.18508194.9"
  }
}
```

#### documentation_artifacts.installation.file_upload_id

The unique file upload ID of the installation manual PDF obtained from the Files API.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|both|no|

#### documentation_artifacts.reference.file_upload_id

The unique file upload ID of the reference manual PDF obtained from the Files API.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|both|no|

#### documentation_artifacts.user.file_upload_id

The unique file upload ID of the user manual PDF obtained from the Files API.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|both|no|

### eqp_status

A sub-object describing the current status of the package in the EQP review process. This is a read-only field.

The **overall** value indicates where the package is in the EQP pipeline.

Additional details are provided in the two main EQP areas:

*  **technical** - Provides the current technical status.
*  **marketing** - Provides the current marketing status.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|-|no|

**JSON structures:**

```json
"eqp_status" :  {
  "overall" : "in_progress",
  "technical" : "draft",
  "marketing" : "approved"
}
```

#### eqp_status.marketing

The current status of the package in the EQP marketing review process. Possible values:

|Value|Type|Description|
|-----|----|-----------|
|`draft`|string|The package has not been submitted for marketing review.|
|`awaiting_marketing_review`|string|The package has been submitted to the marketing review queue.|
|`in_marketing_review`|string|The package is currently undergoing marketing review.|
|`approved`|string|The package has passed the marketing review process.|
|`approved_with_modifications_pending`|string|The package has passed the marketing review process, but some modifications are required.|
|`rejected`|string|The package has failed the marketing review process.|
|`recalled`|string|The developer has recalled the package.|

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|yes|

#### eqp_status.overall

The current status of the package in the overall EQP process. Possible values:

|Value|Type|Description|
|-----|----|-----------|
|`draft`|string|The submission is in the draft state, not yet submitted to the EQP process.|
|`in_progress`|string|The submission is in the EQP pipeline. Refer to the `technical` and `marketing` status for more details.|
|`approved`|string|The submission has been approved and pending release to the store.|
|`released_to_store`|string|The submission has been approved and is currently live on store.|
|`developer_removed_from_store`|string|The developer has removed the package from the store.|
|`admin_removed_from_store`|string|The EQP admin has removed the package from the store.|
|`canceled_by_developer|string|The developer has canceled the submission.|
|`canceled_by_admin`|string|The EQP admin has canceled the submission.|

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|yes|

#### eqp_status.technical

The current status of the package in the EQP technical review process. Possible values:

|Value|Type|Description|
|-----|----|-----------|
|`draft`|string|The package has not been submitted for technical review.|
|`in_automation`|string|The package has been submitted for technical review and is currently undergoing automated testing.|
|`awaiting_manual_qa`|string|The package has passed all automated tests and is currently in the manual test queue.|
|`in_manual_qa`|string|The package is currently undergoing manual testing.|
|`approved`|string|The package has passed all tests.|
|`rejected`|string|The package has failed automation or manual tests.|
|`recalled`|string|The developer has recalled the package.|

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|yes|

### external_services

The list of services that the extension integrates with. The value is a sub-object.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

#### external_services.is_saas

Indicates whether this integration is a gateway to a SaaS service (`true` or `false`).

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|boolean|GET, POST, PUT|marketing|no|

#### external_services.items

An array containing descriptions of the site(s) the extension integrates with. Only zero or one items are currently supported.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### external_services.items[0].name

The name of the integrated site.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### external_services.items[0].owner

Defines the owner of the service. Possible values:

*  `self`
*  `3rd_party`
*  `unknown`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### external_services.items[0].pay_to

Defines who receives any payments. Possible values:

*  `self`
*  `3rd_party`
*  `both`
*  `none`
*  `unknown`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### external_services.items[0].url

The URL of the integrated site.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

### item_id

A developer-defined unique ID assigned to the package (if available). If a value is supplied, it must be unique for every POST request.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST, PUT|-|yes|

### latest_launch_date

The UTC date and time this version of the package was last released to the store. The format is `YYYY-MM-DD HH:MM:SS`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|DateTime|GET|-|yes|

### launch_on_approval

Indicates whether to publish to the store as soon as all tests are passed (`true` or `false`). Effectively, sets `requested_launch_date` to a point in the past.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|boolean|GET, POST, PUT|marketing|no|

### license_type

The license type supported by the package. See [Additional notes](#additional-notes) for a list of valid license types.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|technical|yes|

### limit

Along with `offset`, used for paging the collection of packages. The value can be a positive integer or -1, indicating for unlimited. The default is 20.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|integer|GET|-|no|

### long_description

The long description for the package. The value can be any string.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST, PUT|marketing|yes|

### marketing_options

Additional marketing options that apply to this package can be provided if applicable.
While this information is not currently used, it may become searchable for buyers in the future, so is potentially worth filling out if relevant. See [Additional notes](#additional-notes) for more information.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

**JSON structure:**

```json
"options" : {
  "released_with_setup_scripts"         : true,
  "included_service_contracts"          : false,
  "included_external_service_contracts" : true,
  "support_responsive_design"           : true,
  "custom_implementation_ui"            : true,
  "support_web_api"                     : true,
  "support_test_coverage"               : false
}
```

### max_version_launched

A sub-object that describes the highest version of this package that has been released to the store. It contains fields `submission_id`, `version`, `eqp_status`, with the same meanings as the similarly named fields.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

### media_artifacts

A sub-object with zero to three fields that holds the package icon, gallery images, and optional video URLs.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

**JSON structure:**

```json
"media_artifacts" : {
  "icon_image" : {
    "file_upload_id" : "5c129cd41ba478.65767699.1"
  },
  "gallery_images" : [
    {
      "file_upload_id" : "5c644fa344e5d7.04253635.8"
    },
    {
      "file_upload_id" : "5c648b98446065.77844389.4"
    },
    {
      "file_upload_id" : "5c648b984d0228.21794482.7"
    },
    {
      "file_upload_id" : "5c648b98698ed0.64632056.3"
    },
    {
      "file_upload_id" : "5c648b986a3d98.83415858.0"
    }
  ],
  "video_urls" : [
    "https://www.youtube.com/watch?v=l33T2-YC4tk",
    "https://www.youtube.com/watch?v=682p52tFcmY"
  ]
}
```

The **video_urls** property is optional.

#### media_artifacts.gallery_images

An array of sub-objects describing the gallery images. Not required for shared packages.Each array element has the same structure as the `artifacts` field in this object.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

#### media_artifacts.icon_image

The sub-object that holds the package icon. It has the same structure as the `artifacts` field in this object.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

#### media_artifacts.video_urls

An array of Youtube video URLs listed in order of appearance in the gallery.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

### modified_at

The UTC date and time the package was last updated. The format is `YYYY-MM-DD HH:MM:SS`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|DateTime|GET|-|yes|

### name

The name or title of the package. Duplicate names are not allowed.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST, PUT|marketing|yes|

### offset

In combination with the `limit` parameter, this field can be used for paging the collection of packages. The default value is 0. See [Get package details](#get-package-details) for more information.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|integer|GET|-|no|

### original_launch_date

The UTC date and time this version of the package was first released to the store. The format is `YYYY-MM-DD HH:MM:SS`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|DateTime|GET|-|yes|

### platform

The Magento platform compatibility of this package. Must be `M2`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|technical|yes|

### prices

The list of prices in USD set for this package by edition, and the respective installation prices (if any). Editions must match `version_compatibility`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

**JSON structure:**

```json
"prices" : [
  {
    "edition" : "CE",
    "currency_code" : "USD",
    "price" : 15.50
  },
  {
    "edition" : "EE",
    "currency_code" : "USD",
    "price" : 45.00,
    "installation_price" : 0.00
  },
  {
    "edition" : "ECE",
    "currency_code" : "USD",
    "price" : 60.00,
    "installation_price" : 0.00
  }
]
```
#### prices[N].currency_code

The currency code for this price. Currently, the only valid value is `USD`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### prices[N].edition

The edition of Magento Open Source or Adobe Commerce for this price. Possible values:

*  `CE`
*  `EE`
*  `ECE`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### prices[N].installation_price

The value for the installation price of this package. This is only paid once, even for subscriptions. The value must be a number with up to two decimal places, such as 123.45.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### prices[N].price

The value for the purchase price of this package. For subscriptions, this is the annual price. The value must be a number with up to two decimal places, such as 123.45.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|number|GET, POST, PUT|marketing|no|

### pricing_model

Defines how to interpret the pricing for this package.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST|marketing|no|

**JSON structure:**

```json
"pricing_model" : {
  "pricing_type" : "subscription",
  "payment_period" : 12
}
```
#### pricing_model.payment_period

For a package using the one-time payment model, the number `1` signifies once.  For a subscription, how often (in terms of months) payments are due.  Currently, only annual subscriptions are supported, so the value must either be `1` for "one-time" payments, or `12` for annual subscriptions.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST|marketing|no|

#### pricing_model.pricing_type

Specifies which pricing model is used by this package. Possible values:

*  `one-time`
*  `subscription`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST|marketing|no|

### priority

The priority for this submission. Possible values:

*  `high`
*  `medium`
*  `low`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|-|no|

### process_as_patch

A flag to indicate the submission should follow the [expedited process for patch releases.](https://community.magento.com/t5/Magento-DevBlog/New-Expedited-Marketplace-Submission-Path/ba-p/77303). Possible values:

*  `yes`
*  `no`
*  `unknown`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|technical|yes|

### release_notes

The release notes for the package submission.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST, PUT|technical|yes|

### requested_launch_date

When the package should be released to the store. If not supplied, it will be released to the store after all checks have passed. The format is `YYYY-MM-DD HH:MM:SS`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|DateTime|POST, PUT|marketing|yes|

### shared_packages

The list of artifact objects. Listing here enables the "access rights" to these shared packages when a buyer purchases this package. Each shared package is specified by `file_upload_id`, or `sku` and `version`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|technical|no|

**JSON structure:**

```json
"shared_packages" : [
  {
    "artifact" : {
      "file_upload_id" : "5c648b986aabc6.62305048.2"
    }
  },
  {
    "artifact" : {
      "file_upload_id" : "5c648b986a70c0.11666567.3"
    }
  }
]
```
#### shared_packages[N].artifact.file_upload_id

The unique file upload ID of shared package file, obtained from the Files API.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|both|no|

#### shared_packages[N].artifact.sku

The SKU of the shared package file.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|both|no|

#### shared_packages[N].artifact.version

The version of the shared package file.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|both|no|

### short_description

Obsolete. This value was the short description for the package, but now will always be returned as an empty string.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET|-|no|

### sku

The SKU generated from metadata in the code artifact. Only specified in a `POST` when creating another version of an existing extension.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST|-|yes|

### sort

A comma-separated list of fields to sort the list, each field prefixed by `-` for descending order, or `+` for ascending order. See [Get package details](#get-package-details) for more information.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET|-|no|

### stability

The version's build stability. Possible values:

*  `stable`
*  `beta`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|yes|

### submission_id

A globally unique ID assigned to a package when it is submitted in a POST request. All further references to this package using GET or PUT requests can be made supplying this identifier.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, PUT|-|yes|

### support_tiers

A list of up to three support tiers per edition. Not used for subscriptions.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

**JSON structure:**

Up to three tiers per edition (`CE` (Open Source), `EE` (Commerce), `ECE` (Cloud)) can be supported:

```json
"support_tiers" : [
  {
    "tier" : 1,
    "edition" : "CE",
    "monthly_period" : 1,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 25.00
      }
    ]
  },
  {
    "tier" : 2,
    "edition" : "CE",
    "monthly_period" : 3,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 75.00
      }
    ]
  },
  {
    "tier" : 3,
    "edition" : "CE",
    "monthly_period" : 6,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 100.00
      }
    ]
  },

  {
    "tier" : 1,
    "edition" : "EE",
    "monthly_period" : 1,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 50.00
      }
    ]
  },
  {
    "tier" : 2,
    "edition" : "EE",
    "monthly_period" : 9,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 60.00
      }
    ]
  },
  {
    "tier" : 3,
    "edition" : "EE",
    "monthly_period" : 12,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 70.00
      }
    ]
  },

  {
    "tier" : 1,
    "edition" : "ECE",
    "monthly_period" : 1,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 45.00
      }
    ]
  },
  {
    "tier" : 2,
    "edition" : "ECE",
    "monthly_period" : 6,
    "short_description" : "<Short description goes here.>",
    "long_description" : "<Long description goes here.>",
    "prices" : [
      {
        "currency_code" : "USD",
        "price" : 60.00
      }
    ]
  }
]
```

#### support_tiers[N].edition

Which Magento edition this support is for. Possible values:

*  `CE`
*  `EE`
*  `ECE`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|marketing|no|

#### support_tiers[N].monthly_period

How many months the support lasts. The value can be `1`, `3`, `6`, `9`, or `12`

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|int|GET, POST, PUT|marketing|no|

#### support_tiers[N].prices

Array of prices for this support level. One item per currency code.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

#### support_tiers[N].prices[0].currency_code

The currency code for this price. Currently, only `USD` is supported.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

#### support_tiers[N].prices[0].price

The cost of this support level. The value must be a number with up to two decimal places, such as 123.45.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|marketing|no|

#### support_tiers[N].tier

Which of the three support tiers (numbered 0-2 or 1-3).

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|int|GET, POST, PUT|marketing|no|

### technical_options

Additional technical options that apply to this package can be provided if applicable.
These options are relevant to the technical review.

See [Additional notes](#additional-notes).

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|object|GET, POST, PUT|marketing|no|

**JSON structure:**

```json
"options" : {
  "page_builder_new_content_type"          : true,
  "page_builder_extends_content_type"      : false,
  "page_builder_used_for_content_creation" : true
}
```
### type

The type of package. Possible values:

*  `extension`
*  `theme`
*  `shared_package`
*  `all` (default).

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|technical|yes|

### version

The version of this package, in the form `major.minor.patch`, such as `2.4.3`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|substring|GET, POST|both|yes|

### version_compatibility

A list of Magento versions that this package supports. Must match the editions in `prices`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|technical|no|

**JSON structure:**

For a new Magento 2 package:

```json
"version_compatibility" : [
  {
    "edition" : "CE",
    "versions" : ["2.3", "2.4"]
  },
  {
    "edition" : "EE",
    "versions" : ["2.4"]
  },
  {
    "edition" : "ECE",
    "versions" : ["2.4"]
  }
]
```
#### version_compatibility[N].edition

Must be `M2`.

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|string|GET, POST, PUT|technical|no|

#### version_compatibility[N].versions

A list of Magento Open Source/Adobe Commerce versions that this package supports in the given edition. The value must be an array of version strings, such as ["2.3","2.4"].

|Type|HTTP Commands|Review Type|Filter
|----|-------------|-----------|------
|array|GET, POST, PUT|technical|no|

### Additional notes

*  For required fields in a POST or PUT operation, see the [Required Parameters](#required-parameters) section.
*  The `Review Type` column indicates which part of the EQP review pipeline reviews the field values.
*  The `Filter` column indicates whether a field can be used for filtering and sorting in GET requests.
*  The `Type` column value "substring" means a string which, when filtered, searches for a substring match rather than an exact match.
*  The list of valid values for `license_type` are:
   *  `afl`—Academic Free License 3.0 (AFL)
   *  `apache`—Apache License 2.0
   *  `bsd`—BSD 2-Clause License
   *  `gnu-gpl`—GNU General Public License 3.0 (GPL-3.0)
   *  `gnu-lgpl`–GNU Lesser General Public License 3.0 (LGPL-3.0)
   *  `mit`—MIT License (MIT)
   *  `mozilla`—Mozilla Public License 1.1 (MPL-1.1)
   *  `osl`—Open Software License 3.0 (OSL-3.0)
   *  `custom`—Custom License
