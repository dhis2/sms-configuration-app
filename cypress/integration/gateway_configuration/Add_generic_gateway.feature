Feature: Generic gateway configurations can be added

    Background:
        Given the user navigated to the gateway configuration page

    Scenario: The user opens the add form
        When the user clicks on the add gateway button
        Then the add gateway form should be displayed
        And the default gateway type is "generic"

    Scenario: The user successfully adds a generic gateway
        When the user clicks on the add gateway button
        And the user fills in complete form data
        And the user submits
        Then the entered data should be sent to the endpoint

    Scenario: The user wants to add a generic gateway but doesn't supply the required data
        When the user clicks on the add gateway button
        And the user fills in incomplete form data
        And the user submits
        Then an error message should be shown at the invalid field
