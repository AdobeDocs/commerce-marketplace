---
title: API access keys
description: Describes how to create and manage Marketplace EQP access keys.
keywords:
  - Extensions
  - REST
  - Security
---

# API access keys

<InlineAlert variant="info" slots="text"/>

Marketplace EQP API **access keys** are self-serviced.  As long as you are [eligible](../v1/index.md#api-eligibility) to use the Marketplace EQP API, then you can create, regenerate, and delete your own **access keys**.

## What is an API access key

-  An API access key is a pair consisting of an **application ID** and an **application secret**.
-  Use an API access key to obtain a [session token](auth.md#how-to-use-a-session-token).  The **session token** is used when calling the [REST endpoints](rest-api.md).
-  You decide the lifespan of your API access key: you can regenerate it as often as you wish, or you can choose to delete it.
-  API access keys are specific to each **Marketplace Developer Portal** environment.  API access keys generated for the **sandbox** cannot be used for **production**, and vice-versa.
-  For each **Marketplace Developer Portal** environment, you have a limit of three (3) API access keys.

## How do I create an API access key

-  You create your API access key from one, or both, of the **Marketplace Developer Portal** user interfaces:
   -  production - [https://commercedeveloper.adobe.com][1]
   -  sandbox - [https://commercedeveloper-sandbox.adobe.com][2]

### Create a new API access key

1. From the **Marketplace Developer Portal**, sign in, click on your name (top, right corner), and choose either the **Account Information** or the **Marketplace Profile** link.

1. From the left-hand side navigation menu, click on **Manage API Keys**.

1. If you are **not** [eligible](../v1/index.md#api-eligibility) you will see the following screen.  You will **not** be able to create an API access key, and thus you will **not** be able to use the **Marketplace EQP API**.
   ![Not Eligible to Use the Marketplace EQP API](../_images/sandbox-not-eligible.png)

1. If you **are** eligible to use the **Marketplace EQP API**, you will see the following screen.
   ![Empty List of API Access Keys](../_images/sandbox-access-key-empty.png)

1. Click **Create API Access Key**.

1. In the "Create New API Key" dialog, enter an **API Key Name**.  This name is for your own use. Then, click **Continue**.
   ![Create API Access Key Dialog](../_images/sandbox-access-key-create.png)

1. Your new API access key appears in the list.  Notice that your API access key has an associated **application ID** and an **application secret**.
   ![New API Access Key Added](../_images/sandbox-access-key-list.png)

## Manage your API access keys

-  From the list of your API access keys, you can **regenerate** the key.
   -  Regenerating the key will result in a new pair of the **application ID** and **application secret**.
   -  Once regenerated, the previous pair can no longer be used to obtain a [session token](auth.md#how-to-use-a-session-token).
   -  However, any **session tokens** obtained from the previous key will remain valid, until those session tokens expire.
-  From the list of your API access keys, you can **delete** the key.
   -  Once deleted, the key can no longer be used to obtain a [session token](auth.md#how-to-use-a-session-token).
   -  However, any **session tokens** obtained from the previous key will remain valid, until those session tokens expire.

<InlineAlert variant="info" slots="text"/>

Marketplace EQP API **access keys** generated in the [sandbox][2] environment are separate from those generated in [production][1].
You cannot use access keys from one environment in the other.

[1]: https://commercedeveloper.adobe.com
[2]: https://commercedeveloper-sandbox.adobe.com
