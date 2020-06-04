Feature: BulkSMS gateway configurations can be added

  Background:
    Given the user navigated to the gateway configuration page

  Scenario: The user successfully adds a BulkSMS gateway
    When the user clicks on the add gateway button
    And the user changes the gateway type to BulkSMS
    And the user fills in the form data
      | name | username | password |
      | foo  | bar      | baz      |
    And the user clicks on the add button
    Then the user should be redirected to the gateway configuration page
    And the newly added gateway should be listed in the table at the bottom

  Scenario: The user wants to add a BulkSMS gateway
            but doesn't supply the required data
    When the user clicks on the add gateway button
    And the user changes the gateway type to BulkSMS
    And the user fills in incomplete form data
    And the user clicks on the add button
    Then the form does not submit
    And an error message should be shown at the fields that are required but empty
