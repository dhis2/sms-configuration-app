Feature: All sent messages should be listed

    Scenario: No sent messages exist
        Given there are no sent messages
        And the user navigated to the sent messages page
        Then the user should be notified that there are no messages

    Scenario: Some sent messages exist
        Given some sent messages exist
        And the user navigated to the sent messages page
        Then the sent messages are rendered as tabular data
        And each row displays the message contents and metadata
