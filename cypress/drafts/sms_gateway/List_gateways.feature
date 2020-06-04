Feature: All gateways should be listed

  Background:
    Given the user navigated to the gateway configuration page

  Scenario: No gateways have been configured yet
    Given there are no gateways
    Then no table should be displayed

  Scenario: Some gateways have been configured
    Given some gateways exist
    Then the gateways are rendered as tabular data
    And each row has the following cells
      | name      |
      | label     |
      | operation |
    And the operation cell should include actions
      | action          |
      | Mark as default |
      | Edit            |
      | Delete          |
