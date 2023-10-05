---
title: App Assurance Program
description: Learn about the App Assurance Program for Marketplace apps and extensions for Adobe Commerce.
---

# App Assurance Program

With almost 4,000 listings in the Adobe Commerce Marketplace, both developers and merchants face similar challenges:

- How can developers achieve better visibility for their products?
- How can merchants easily identify high-quality listings that fit their needs?

To address these challenges, Adobe has created an App Assurance Program that benefits merchants and developers alike.

The App Assurance Program evaluates the quality of apps and extensions to ensure they meet Adobe's high standards. Merchants can now easily access a curated collection of listings that have passed a higher standard and are built with scale and performance in mind. These developers receive preferable placement in the marketplace, a rich technical consultation, and verified badging on the marketplace.

## Review process

After passing our [Extension Quality Program](./extension-quality-program.md), submissions to the App Assurance Program undergo a thorough code review, Magento Functional Testing Framework (MFTF) testing, and performance testing. The following sections provide a description of each step of the verification process.

### Code review

The enhanced code review consists of a static code review and a security code review. The static code review consists of the following:

- Review the code for any bugs
- Validate that the submission adheres to the [Magento coding standard](https://github.com/magento/magento-coding-standard)
- Validate the change level against the level submitted by the developer
- Check dependencies for any known vulnerabilities
- Confirm that the listing is compatible with the newest version of Adobe Commerce

The security code review consists of the following:

- Check for outdated frameworks with known vulnerabilities
- Check for possible SQL injection and data sanitization issues
- Check databases for proper structure
- Ensure proper usage of classes and methods

### Functional Testing Framework testing

The [Functional Testing Framework](https://developer.adobe.com/commerce/testing/functional-testing-framework/) tests help assess the critical functionality of a listing within Adobe Commerce.

Listing developers must provide a test suite that includes a smoke test of their submission. Developers should also consider providing end-to-end tests that cover the core functionality of their submission.

These submitted tests are used extensively in the review process for the App Assurance Program.

### Performance testing

Performance testing helps to identify bottlenecks and scalability issues by utilizing the submission along with simulated data and real-world activities. These tests help developers understand the product's capabilities and identify improvement areas to maintain high-performance standards.

Listings pass the performance testing step only if they have a low rate of errors and degradation. Listings must also retain a response time of less than 200ms.
