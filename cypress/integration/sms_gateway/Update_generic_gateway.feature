Feature: Generic gateway configurations can be edited and updated

    Background:
        Given the user navigated to the gateway configuration page

    Scenario: The user opens the update form of a generic gateway configuration
        When the user clicks on the edit button in the first row
        Then the app should navigate to the update form
        And the input fields contain the information of the chosen gateway configuration

    Scenario Outline: The user changes a field in the first generic gateway configuration
        Given the user is editing a generic gateway configuration
        When the user changes the <field> field's value to another valid value
        And submits the form
        Then the user should be redirected to the gateway configuration page

        Examples:
            | field              |
            | messageParameter   |
            | recipientParameter |
            | urlTemplate        |

    Scenario Outline: The user changes a field in the first generic gateway
                      configuration to an invalid value
        Given the user is editing a generic gateway configuration
        When the user changes the <field> field's value to another invalid value
        And submits the form
        Then the form does not submit
        And an error message should be shown at the invalid field

        Examples:
            | field              |
            | messageParameter   |
            | recipientParameter |
            | urlTemplate        |
