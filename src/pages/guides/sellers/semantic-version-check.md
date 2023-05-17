---
title: Semantic version check
description: Learn how the semantic version check (SVC) validates your listing's changes against your suggested change level.
---

# Semantic version check

The semantic version check (SVC) is a quality check that validates the change level of an app or extension submission against the change level declared by the developer.

## What testing is for

[Semantic versioning](https://semver.org) is a good way to communicate what kind of changes were introduced between software releases. Clients can use this information to estimate the risk level of upgrading a particular software package and to determine how much effort is required to adopt the new version.

Commerce follows semantic versioning and encourages all third-party vendors to apply this versioning strategy for their apps and extensions as well.

Commerce Marketplace uses version information to fast-track the validation process for submissions that introduce patch level changes, as these are expected to be backwards compatible bug fixes without any new functionality.

## When testing is done

For the semantic version check to be applied, the submission must meet the following conditions:

1. A new submission must update an already existing version of an app or extension that has been previously published to the Marketplace storefront.
1. The developer must declare the new submission as a "PATCH" level change.

## What is being checked

The semantic version check analyzes the submission to determine the change level of the new submission and to verify whether the change level qualifies as a "PATCH" level change.

If the submission is a "PATCH" level change, the submission is fast-tracked and is exempt from the Manual QA process. Otherwise, this check fails.

A failed semantic version check has no impact on submission approval. If a submission receives Manual QA approval, then the app or extension will be published.

## Tools and environments used

The semantic version check is implemented using the publicly available, [magento/magento-semver](https://github.com/magento/magento-semver) tool.

Magento SemVer is a static analysis tool that validates the change level of Magento source code based on the [Semantic Versioning Specification](https://semver.org) and makes suggestions about the version increment to use, for example _PATCH_, _MINOR_, or _MAJOR_.

Magento SemVer can:

1. Detect PATCH, MINOR and MAJOR change levels and suggest the appropriate change level for a new version.
1. Validate an update against a desired change level.

## Reading the error report

The error report lists minor and major changes detected in the source code.  To fix an error, refactor the implementation until it no longer introduces non-patch level changes.

## Troubleshooting

The semantic version check runs the following command:

```bash
php magento-semver/bin/svc compare <path-to-latest-published-extension-version> <path-to-submitted-extension-version> 1
```

This command requires an environment with PHP version 7.2.29 or later.

If the semantic version check detects any issues, [create a support ticket](https://marketplacesupport.magento.com/hc/en-us) to request assistance. Specify the relevant Submission ID in the ticket.

As the check is solely based on [Magento SemVer open source project](https://github.com/magento/magento-semver), submitting an issue or pull request on GitHub is highly recommended.

We always welcome feedback and discussion on the [Magento Community Engineering Slack](https://magentocommeng.slack.com/archives/C7SL5CGDN) #marketplace channel.
