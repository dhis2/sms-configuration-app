Feature: All gateways should be listed

    Scenario: No commands have been configured yet
        Given there are no commands
        And the user navigated to the sms commands list page
        Then no table should be displayed

    Scenario: Some commands have been configured
        Given some commands exist
        And the user navigated to the sms commands list page
        Then the commands are rendered as tabular data
        And each row displays the commands's data
