# Email Action Link

## User Stories

* As a product developer, I want to be able to email the customer a link that performs one or more action on their behalf.

* By sending customer a link through email, the customer's primary identity, their email address, can be captured and verified.

## Customer Journey

### Introduction

The customer will receive a link via email. By clicking the link, one or more actions will be performed in behalf of the user.

### Goals

As a customer, my goals are to:

* receive an email with the link.
* know why I am clicking the link.
* be able to find and click the link.
* upon clicking the link, know if the action(s) were performed successfully or not.

### Steps

1. **Send Email**
   * The customer is sent a templated email with a prompt and an action link.

2. **Perform Action**
   * Upon clicking the link:
       * the customer's email address is verified.
       * some actions are performed for the customer's account.

   If the action is successful, the customer is directed to the success page (or redirected to some resource).

   If the action is not successful, the customer is directed to the fail page.
