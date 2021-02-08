Feature: Users should be able to delete messages

    Scenario: User deletes one message
        Given some sent messages exist
        And the user navigated to the sent messages page
        Then the 'delete selected' button should be disabled
        When the user selects a message
        Then the 'delete selected' button should be enabled
        When the user clicks on the 'delete selected' button
        Then the message should be deleted

    Scenario: User deletes all messages
        Given some sent messages exist
        And the user navigated to the sent messages page
        Then the 'delete selected' button should be disabled
        When the user selects all messages
        Then the 'delete selected' button should be enabled
        When the user clicks on the 'delete selected' button
        Then all the messages should be deleted
