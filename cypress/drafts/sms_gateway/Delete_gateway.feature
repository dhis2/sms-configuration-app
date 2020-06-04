Feature: Gateway configurations can be deleted

  Background:
    Given the user navigated to the gateway configuration page

  Scenario: The user deletes the first gateway configuration
    Given there are some gateway configurations
    When the user clicks on the delete button in the first row
    Then a confirmation model should pop up
    When the user confirms the deletion
    Then the confirmation model should close
    And the first row should have been deleted

  Scenario: The user attempts to delete the first gateway but cancels the process
    Given there are some gateway configurations
    When the user clicks on the delete button in the first row
    Then a confirmation model should pop up
    When the user cancels the deletion
    Then the confirmation modal should close
    And the first row should still exist
