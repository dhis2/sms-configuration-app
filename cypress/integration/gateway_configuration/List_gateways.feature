Feature: All gateways should be listed

    Scenario: No gateways have been configured yet
        Given there are no gateways
        And the user navigated to the gateway configuration page
        Then no table should be displayed

    Scenario: Some gateways have been configured
        Given some gateways exist
        And the user navigated to the gateway configuration page
        Then the gateways are rendered as tabular data
        And each row displays the gateway configuration's data

    Scenario: A default gateways exists
        Given some gateways exist
        And the user navigated to the gateway configuration page
        Then exactly one default gateway should be displayed

    Scenario: A non-default gateway is made the default gateway
        Given some gateways exist
        And the user navigated to the gateway configuration page
        And the first gateway is the default
        When the user makes the second gateway the default gateway
        Then a PUT request to the default gateways endpoint should be sent with the id as url segment

    Scenario: A gateway is edited
        Given some gateways exist
        And the user navigated to the gateway configuration page
        When the user clicks on the edit button of the first gateway configuration
        Then the edit form should be visible
