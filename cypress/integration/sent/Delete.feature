Feature: Users should be able to delete messages

    Scenario: User navigates to list view
        Given some sent messages exist
        And the user navigated to the sent messages page
        Then the 'delete selected' button should be disabled

    Scenario: User selects some items
        Given some sent messages exist
        And the user navigated to the sent messages page
        When the user selects a message
        Then the 'delete selected' button should be enabled

    Scenario: The user clicks the delete button
        Given some sent messages exist
        And the user navigated to the sent messages page
        When the user selects a message
        When the user clicks on the 'delete selected' button
        Then the user should be asked to confirm his choice

    Scenario: User deletes one message
        Given some sent messages exist
        And the user navigated to the sent messages page
        When the user selects a message
        When the user clicks on the 'delete selected' button
        When the user confirms the deletion
        Then the message should be deleted

    Scenario: User deletes all messages
        Given some sent messages exist
        And the user navigated to the sent messages page
        When the user selects all messages
        When the user clicks on the 'delete selected' button
        When the user confirms the deletion
        Then all the messages should be deleted
