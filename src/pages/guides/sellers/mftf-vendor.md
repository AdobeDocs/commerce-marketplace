---
title: Vendor-supplied tests
description: Learn about the Functional Testing Framework tests that you can create and how they can improve your listing.
keywords:
  - Extensions
---

# MFTF Vendor-supplied tests

<InlineAlert variant="info" slots="text"/>

At this stage, the MFTF Vendor-supplied check is not required to pass technical review. The pass/fail status of this check is ignored. We are still observing the behavior of this set of tests and will start requiring these tests at a later time, with sufficient notice.

This check runs the MFTF tests supplied by the vendor as a part of the extension package.

The Magento Functional Testing Framework (MFTF) is a browser-based acceptance testing framework used to validate the functionality of a Magento site. Running vendor-supplied MFTF tests helps to ensure that the extension functionality is operating as expected for the end user.

Vendor supplied MFTF tests are not required to pass for technical review. The outcome of this testing is used to assist with QA efforts and provide feedback on functional quality.

For information on how to setup, create and modify MFTF tests, see [Introduction to the Magento Functional Testing Framework](https://developer.adobe.com/commerce/testing/functional-testing-framework/).

## What testing is for

To ensure that extension submissions perform correctly for a user, MFTF tests are used to mimic the functionality expected via browser-based testing against a Magento instance.

MFTF runs tests in a browser, using Selenium and Codeception to emulate the user behavior. MFTF tests are designed to be extensible and used in conjunction with existing MFTF code coverage. This allows vendor-supplied MFTF tests to describe the behavior of the extension and to integrate with the existing suites of MFTF coverage, leveraging reusable tests elements and modifying existing test flows as necessary.

Functional testing in this way ensures that the experience of the end-user is as intended by the extension developer, allowing for the customizability and extensibility of Magento as a platform.

## When testing is done

MFTF vendor supplied tests are run only where:

-  There are MFTF tests included in the submission in the correct directory (`Tests/Mftf`)
-  Only for MFTF v3.0 or greater
-  Only for Magento v2.4.0 or greater

## What is being checked

MFTF tests verify the proper functioning of the workflows that the extension introduces. They are meant to mimic the same code paths that the end user would take, by automating the clicks and data entry that the user would do. Providing comprehensive MFTF test coverage helps to speed up the EQP QA process.

## Tools and environments used

The Magento test infrastructure executes vendor-supplied MFTF tests in the most recent version of Magento in the 2.4.x release line, as well as the most up-to-date software compatible with that release. The test infrastructure uses the recommended setup for Magento installation with the standard MFTF setup and configuration. You can use the [Magento Cloud Docker](https://github.com/magento/magento-cloud-docker) image to create a similar environment.

See [System Requirements](https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/system-requirements.html) for more information on supported software.

## Reading the error report

MFTF returns two types of results, displayed as `MFTF Vendor` within the developer portal::

-  Simplified results showing the status of each test executed
-  Allure XML results

See [MFTF Reporting](https://developer.adobe.com/commerce/testing/functional-testing-framework/reporting/) for further information.

To diagnose a test failure, first ascertain if you can replicate the failure on your local environment. If you cannot, this indicates a configuration and/or environmental difference.

The Allure results returned to Marketplace can be downloaded and displayed as an Allure report for simple consumption and identification of failure points.

## Troubleshooting

-  Ensure that your tests generate, execute and pass in the specified environment configuration
-  Tests must be in the `Test/Mftf` directory within the extension
-  MFTF tests within this directory must follow the standard directory structure, separating ActionGroups, Tests, Pages, Sections, and so on, into their own directories
-  Ensure that tests names do not clash with existing Magento tests
-  If you are extending from, or merging into, an existing Magento test (or relying upon its entities), it must be required as a Composer prerequisite
-  The MFTF tests will be part of the final package that is made available to your customers. Do not include any sensitive or confidential data in test comments or code
-  If necessary, include a README, or other instructions, within the `Test` directory, to explain any setup steps or caveats for running your MFTF tests
-  Ensure that any necessary credentials or user authorization (for example, to communicate via API key to your backend) is explained and supported via credential management in tests
-  Always follow the [MFTF Best Practices](https://developer.adobe.com/commerce/testing/functional-testing-framework/test-writing/best-practices/) and use the [MFTF Tips & Tricks](https://developer.adobe.com/commerce/testing/functional-testing-framework/test-writing/tips-tricks/).
