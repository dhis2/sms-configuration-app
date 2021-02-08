Feature: All received messages should be listed

    Scenario: No received messages exist
        Given there are no received messages
        And the user navigated to the received messages page
        Then the user should be notified that there are no messages

    Scenario: Some received messages exist
        Given some received messages exist
        And the user navigated to the received messages page
        Then the received messages are rendered as tabular data
        And each row displays the message contents and metadata
