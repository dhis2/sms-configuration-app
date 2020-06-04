Feature: Generic gateway configurations can be added

  Background:
    Given the user navigated to the gateway configuration page

  Scenario: The user opens the add form
    When the user clicks on the add gateway button
    Then the add gateway form should be displayed
    And the default gateway type is "generic"

  Scenario: The user successfully adds a generic gateway
    When the user clicks on the add gateway button
    And the user fills in the form data
      | name | messageParameter | recipientParameter | urlTemplate |
      | foo  | bar              | baz                | foobar      |
    And the user clicks on the add button
    Then the user should be redirected to the gateway configuration page
    And the newly added gateway should be listed in the table at the bottom

  Scenario Outline: The user wants to add a generic gateway but doesn't supply the required data
    When the user clicks on the add gateway button
    And the user fills in incomplete form data
    And the user clicks on the add button
    Then the form does not submit
    And an error message should be shown at the invalid field

  Scenario: The user adds a generic gateway with custom key-value pairs
    Given the user adds a generic gateway configuration
    When the user clicks on the "add more" button
    Then the key/value form should appear
    When the user enters values for the key and value
    And the user submits the form
    Then the additional key/value pair should be send to the endpoint
