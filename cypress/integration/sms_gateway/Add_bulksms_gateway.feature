Feature: BulkSMS gateway configurations can be added

    Background:
        Given the user is adding a new gateway with type BulkSMS

    Scenario: The user successfully adds a BulkSMS gateway
        When the user fills in complete form data
        And the user submits
        Then the entered data should be sent to the endpoint

    Scenario: The user wants to add a BulkSMS gateway but doesn't supply the required data
        When the user fills in incomplete form data
        And the user submits
        Then an error message should be shown at the invalid field
