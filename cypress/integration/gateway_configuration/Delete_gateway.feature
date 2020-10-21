Feature: Gateway configurations can be deleted

    Background:
        Given the user can delete configurations from the network perspective

    Scenario: The user wants to delete the first gateway configuration
        Given some gateways exist
        And the user navigated to the gateway configuration page
        When the user user selects the first gateway configuration
        And clicks the delete button
        Then a confirmation model should pop up

    Scenario: The user deletes the first gateway configuration
        Given some gateways exist
        And the user wants to delete the first configuration
        And the confirmation model is visible
        When the user confirms the deletion
        Then a delete request with the first gateway configuration's id should be sent
        And the confirmation modal should close

    Scenario: The user attempts to delete the first gateway but cancels the process
        Given some gateways exist
        And the user wants to delete the first configuration
        And the confirmation model is visible
        When the user cancels the deletion
        Then the confirmation modal should close

    Scenario: The user selects all gateway configurations
        Given some gateways exist
        And the user navigated to the gateway configuration page
        When the user clicks the checkbox to select all
        Then all individual gateway configurations' checkboxes should be selected

    Scenario: The user selects all gateway configurations while some are already selected
        Given some gateways exist
        And the user navigated to the gateway configuration page
        And some gateway configurations have been selected
        When the user clicks the checkbox to select all
        Then all individual gateway configurations' checkboxes should be selected

    Scenario: The user deselects all gateway configurations
        Given some gateways exist
        And the user navigated to the gateway configuration page
        And all gateway configurations have been selected
        When the user clicks the checkbox to select all
        Then all individual gateway configurations' checkboxes should not be selected

    Scenario: The delete button is disabled if no gateway configuration is selected
        Given some gateways exist
        And the user navigated to the gateway configuration page
        And no gateway configuration has been selected
        Then the delete button should be disabled

    Scenario: The delete button is disabled if no gateway configuration exists
        Given no gateways exist
        And the user navigated to the gateway configuration page
        Then the delete button should be disabled

    Scenario: The user unsuccessfully tries to delete a gateway configuration
        Given the user can't delete configurations due to a request failure
        And some gateways exist
        And the user wants to delete the first configuration
        And the confirmation model is visible
        When the user confirms the deletion
        Then an alert with an error message should be displayed
