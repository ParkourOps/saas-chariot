# Waiting List with Lead Magnet

## User Stories

-   As a product developer, I want to implement a customer flow where the customer is given the option to join a waiting list (a mailing list), and, in return, gets to access a specific resource as a lead magnet as a "thank you" gift.

    -   Having customer join a waiting list will allow us (the organisation) to track demand for a particular product/service/feature and establish rapport with them about it.

    -   Offering a lead magnet will allow us (the organisation) to build trust with the customer so that they can be assured they are not signing up for nothing in return. We want to be able to tell them how valuable the lead magnet is.

    -   A waiting list will allow us to capture and verify the customer's email address so that we may get in touch with them in the future.

-   As a developer, I want the choice of implementing the customer journey using either modals (implemented) or pages (to do).

## Customer Journey

### Introduction

The customer will be presented with an appealing "poster" featuring a lead magnet with the suggestion/option to join the waiting list to get access.

### Goals

As a customer, my goals are to:

-   know why there is a waiting list.
-   know what I get if I join the waiting list.
-   join the waiting list with minimal effort, OR reject the option.
-   access the lead magnet with minimal effort.
-   get back to what I was doing before being presented with the waiting list.

### Steps

1. **Offer**

    - The customer is presented with a modal.
        - The modal informs the user about the option to join a waiting list.
        - The modal informs the user about the purpose of the waiting list.
        - The modal is informed of what resource they will get access to if they join the waiting list.
        - The modal acts as a poster for the lead magnet.
    - The customer is presented with a Call to Action (CTA) which allows them to join the waiting list simply by entering their email address and clicking the "Join" button. Alternatively, the customer may choose to reject the offer.

2. **Instructions**

    - If the customer rejects the offer (i.e. cancels), they will drop off and not get to this stage.
    - On the customer accepting the offer by joining the waiting list (CTA), they will be
      prompted to check their inbox.
    - The user will be able to click "Done" to dismiss the prompt.

3. **Access the Lead Magnet**
    - The customer will receive an email with a link to download the lead magnet.
    - When the customer clicks the link:
        - If the link is still valid (i.e. not expired):
            - the customer's email address will be verified if it hasn't been verified already.
            - the customer will be redirected to the resource via a download link.
        - If the link is invalid:
            - the customer will be redirected to the fail link, if provided.
