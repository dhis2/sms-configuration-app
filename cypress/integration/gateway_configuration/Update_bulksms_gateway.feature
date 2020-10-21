Feature: Generic gateway configurations can be edited and updated

    Background:
        Given the user navigated to the gateway configuration page

    Scenario: The user opens the update form of a BulkSMS gateway configuration
        When the user clicks on the update button in the first bulksms gateway
        Then the app should navigate to the update form
        And the input fields contain the information of the chosen gateway configuration

    Scenario Outline: The user changes a field in the first BulkSMS gateway configuration
        When the user clicks on the update button in the first bulksms gateway
        Then the app should navigate to the update form
        When the user changes the <field> field's value to another valid value
        And submits the form
        Then the updates should be sent to the correct endpoint

        Examples:
            | field    |
            | name     |
            | username |
            | password |

    Scenario Outline: The user changes a field in the first BulkSMS gateway configuration to an invalid value
        When the user clicks on the update button in the first bulksms gateway
        Then the app should navigate to the update form
        When the user changes the <field> field's value to another invalid value
        And submits the form
        Then the form does not submit
        And an error message should be shown at the invalid field

        Examples:
            | field    |
            | name     |
            | username |
            | password |
            | passwordConfirmation |

    Scenario: The user submits the changes successfully
        When the user clicks on the update button in the first bulksms gateway
        Then the app should navigate to the update form
        When the user changes some fields to valid values
        And submits the form
        Then the user should be redirected to the gateway configuration overview page
