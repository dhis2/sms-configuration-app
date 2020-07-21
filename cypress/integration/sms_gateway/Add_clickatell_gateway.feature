Feature: Clickatell Gateway configurations can be added

    Background:
        Given the user is adding a new gateway with type Clickatell

    Scenario: The user successfully adds a Clickatell gateway
        When the user fills in complete form data
        And the user submits
        Then the entered data should be sent to the endpoint

    Scenario: The user wants to add a Clickatell gateway but doesn't supply the required data
        When the user fills in incomplete form data
        And the user submits
        Then an error message should be shown at the invalid field
