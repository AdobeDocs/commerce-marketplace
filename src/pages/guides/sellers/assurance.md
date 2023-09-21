---
title: Listing assurance program
description: This page describes the assurance program for marketplace apps and extensions for Adobe Commerce.
---

# Listing Assurance Program

With almost 4,000 listings in the Adobe Commerce Marketplace, it is difficult for customers to find the listing that fits their needs and difficult for Adobe listing developers to get the visibility they desire. To address this, Adobe has created an assurance program that benefits customers and developers alike.

The Listing Assurance Program evaluates the quality of a listing to ensure it meet Adobe's high standards. Customers can now easily access a curated collection of listings that have passed a higher standard and are built with scale and performance in mind. These developers receive preferable placement in the marketplace, a rich technical consultation, and verified badging on the marketplace.

## Review process

After passing our [Extension Quality Program](./extension-quality-program.md), submissions to our assurance program undergo a thorough code review, Magento Functional Testing Framework (MFTF) testing, and performance testing. The following sections provide a description of each step of the verification process.

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
- Ensure proper uses of classes, methods, etc

### Magento Functional Testing Framework (MFTF) testing

MFTF (Magento Functional Testing Framework) tests help assess the critical functionality of a listing within Adobe Commerce.

Listing developers must provide an MFTF test suite that includes a smoke test of their submission. Developers should also consider providing end-to-end tests that cover the core functionality of their submission.

These submitted tests are used extensively in the review process for the assurance program.

### Performance testing

Performance testing helps to identify bottlenecks and scalability issues by utilizing the submission along with simulated data and real-world customer activities. These tests help developers understand the product's capabilities and identify improvement areas to maintain high-performance standards.

Listings only pass the performance testing step if they have a low rate of errors and degradation. Listings must also retain a response time of less than 200ms.
