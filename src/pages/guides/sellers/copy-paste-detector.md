---
title: Copy paste detector
description: Learn how the copy paste detector works for marketplace listings.
keywords:
  - Extensions
---

# Copy paste detector

The copy paste detector check validates that implementation of the submitted product is unique and not duplicated code from an already known listing.

## What testing is for

Only original extensions can be listed in the [Commerce Marketplace](https://commercemarketplace.adobe.com). We test submitted extensions to detect duplication of code from Commerce or from another listing available in the Commerce Marketplace. If duplication is extensive, the submission is rejected on the grounds that the content is plagiarized.

## When testing is done

All submissions are subject to the Copy Past Detector check regardless of product type and scope of changes.

## What is being checked

Copy paste detector performs a static analysis of the source code and tries to detect similar code snippets.

If the Detector identifies many similarities between the submitted extension and a previously known listing, we may mark the check as failed if there is strong evidence of plagiarism. We can also schedule problematic submissions for human code review if there are concerns regarding code fragments. Expert judgment is required to make final decisions about plagiarism.

## Tools and environments used

Copy paste detector includes, but is not limited to, [PHPCPD](https://github.com/sebastianbergmann/phpcpd). We also use a proprietary solution to search for duplicates across multiple listings and their versions. This solution ignores irrelevant implementation details such as variables, classes and method names, and so on.

## Reading an error report

Copy paste detector provides a list of places in your code that were identified as duplicates. If the submission is found to duplicate Commerce code, review the list and remove each instance of duplicated code. Then, upload a new package and resubmit the extension. We reject any submission that has duplicate code from another listing.

## Troubleshooting

Implementing a solution for detecting plagiarism in source code is not a trivial task. As a result, we expect that the test results will sometimes be inaccurate, for example:

-  We may not detect 'copy paste' if the code was changed significantly, or if only the concept of the listing was copied. We still consider such use-cases as plagiarism and hope that the original extension authors and the Magento community will report such behavior.

-  We might incorrectly identify code fragments that follow a common pattern as duplicates.  To prevent a submission from being rejected due to incorrect results, we also perform manual code review. Even with manual reviews, we can still make mistakes.

If you notice a submission that is rejected or approved based on inaccurate information from the copy paste detector, [contact Marketplace Support](mailto:commercemarketplacesupport@adobe.com) so that we can resolve your case and keep our community healthy. Please specify your Submission ID in a ticket.

We always welcome feedback and discussion on the [Magento Community Engineering Slack](https://magentocommeng.slack.com/archives/C7SL5CGDN) #marketplace channel.
