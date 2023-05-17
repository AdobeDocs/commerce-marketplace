---
title: MFTF Commerce-supplied tests
description: Learn about the Magento Functional Testing Framework (MFTF) tests supplied by Adobe Commerce and how they can improve your listing.
---

# MFTF Commerce-supplied tests

<InlineAlert variant="info" slots="text"/>

At this stage, the MFTF Commerce-supplied check is not required to pass technical review. The pass/fail status of this check is ignored. We are still observing the behavior of this set of tests and will start requiring these tests at a later time, with sufficient notice.

The Functional Testing Framework (MFTF) is a browser-based acceptance testing framework used to validate the functionality of a Adobe Commerce or Magento Open Source site. Running Commerce-supplied MFTF tests aids Extension Quality Program (EQP) QA efforts in assessing critical functionality of an instance with the app or extension installed.

Commerce supplied MFTF tests are not required to pass for technical review. The outcome of this testing is used to assist with QA efforts and provide feedback on functional quality.

For information on how to setup, create and modify MFTF tests, see [Introduction to the Functional Testing Framework](https://developer.adobe.com/commerce/testing/functional-testing-framework/).

## What testing is for

Commerce-supplied MFTF tests validate critical user flows via browser-based testing against an operational Commerce instance.

MFTF runs tests in a browser, using Selenium and Codeception, to emulate user behavior. MFTF tests are designed to be extensible and can be used in conjunction with other Commerce-developed MFTF code coverage or your own vendor-supplied tests. The results of this testing will inform QA about the state of the extension or app and allow them to prioritize manual testing.

## When testing is done

Commerce-supplied MFTF tests will be run for all Marketplace extension and app submissions on Commerce 2.4 release lines. The tests will also be run for extensions running Magento Open Source 2.4.

The MFTF tests executed are:

-  StorefrontGuestCheckoutTest
-  AdminCreateCustomerWithCountryUSATest
-  AdminCreateNewCustomerOnStorefrontTest
-  StorefrontCustomerCheckoutTest
-  AddConfigurableProductToOrderFromShoppingCartTest
-  StorefrontReorderAsGuestTest
-  StorefrontUpdateWishlistTest
-  StorefrontClearAllCompareProductsTest
-  MoveConfigurableProductsInComparedOnOrderPageTest
-  CreateInvoiceWithZeroSubtotalCheckoutTest
-  CreateInvoiceWithShipmentAndCheckInvoicedOrderTest
-  AdminCreateCreditMemoPartialRefundTest
-  AdminCreateOrderWithSimpleProductTest
-  AdminCreateSimpleProductTest
-  AdminConfigurableProductCreateTest
-  AdminCreateCategoryTest
-  AdminCreateAndEditBundleProductSettingsTest
-  AdminCreateAndEditConfigurableProductSettingsTest
-  AdminCreateAndEditVirtualGiftCardProductSettingsTest

## What is being checked

MFTF tests verify the proper functioning of basic Commerce workflows. They are meant to mimic the same code paths that the end user would take, by automating the clicks and data entry that the user would do. The codebase contains thousands of MFTF tests.

## Tools and environments used

The test infrastructure executes Commerce-supplied MFTF tests in the most up-to-date version of Commerce in the 2.4.x and 2.3.x release lines, as well as the most up-to-date software compatible with that release. The test infrastructure follows the recommended setup for an installation, MFTF setup, and system configuration. You can use [Cloud Docker](https://github.com/magento/magento-cloud-docker) to create a similar environment.

## Reading the error report

MFTF returns two types of results, displayed as `MFTF Magento` within the developer portal:

-  Simplified results showing the status of each test executed
-  Allure XML results

See [MFTF Reporting](https://developer.adobe.com/commerce/testing/functional-testing-framework/reporting/) for further information.

-  Test failures are generally due to:
   -  The MFTF test flow being breaking due to changes to Commerce user flows as intended by the extension or app under test. These can be fixed by using vendor-supplied MFTF Tests.
   -  A failure in the Commerce user flow due to an unintended side-effect of the extension or app under test. This may be a type of regression bug and will be tested and verified by manual QA as part of EQP technical review.
-  The Allure results returned to Marketplace can be downloaded and displayed as an Allure report for simple consumption and identification of failure points.

## Troubleshooting

-  Ensure that your tests generate, execute and pass in the specified environment configuration
-  Tests must be in the `Test/Mftf` directory within the extension
-  MFTF tests within this directory must follow the standard directory structure, separating ActionGroups, Tests, Pages, Sections, etc into their own directories
-  Ensure that tests names do not clash with existing tests
-  If you are extending from, or merging into, an existing test (or relying upon its entities), it must be required as a Composer prerequisite
-  The MFTF tests will be part of the final package that is made available to your customers. Do not include any sensitive or confidential data in test comments or code
-  If necessary, include a README, or other instructions, within the `Test` directory, to explain any setup steps or caveats for running your MFTF tests
-  Ensure that any necessary credentials or user authorization (for example, to communicate via API key to your backend) is explained and supported via credential management in tests
-  Always follow the [MFTF Best Practices](https://developer.adobe.com/commerce/testing/functional-testing-framework/test-writing/best-practices/) and use the [MFTF Tips & Tricks](https://developer.adobe.com/commerce/testing/functional-testing-framework/test-writing/tips-tricks/).
