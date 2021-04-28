Feature: Commands can be deleted

    Scenario: The user wants to delete the first command
        Given some commands exist
        And the user can delete commands
        And the user navigated to the sms commands list page
        When the user selects the first command
        And clicks the delete button
        Then a confirmation modal should pop up

    Scenario: The user deletes the first command
        Given some commands exist
        And the user can delete commands
        And the user wants to delete the first command
        And the confirmation modal is visible
        When the user confirms the deletion
        Then a delete request with the first command's id should be sent
        And the confirmation modal should close

    Scenario: The user attempts to delete the first command but cancels the process
        Given some commands exist
        And the user can delete commands
        And the user wants to delete the first command
        And the confirmation modal is visible
        When the user cancels the deletion
        Then the confirmation modal should close

    Scenario: The user selects all commands
        Given some commands exist
        And the user can delete commands
        And the user navigated to the sms commands list page
        When the user clicks the checkbox to select all
        Then all individual commands' checkboxes should be selected

    Scenario: The user selects all commands while some are already selected
        Given some commands exist
        And the user can delete commands
        And the user navigated to the sms commands list page
        And some commands have been selected
        When the user clicks the checkbox to select all
        Then all individual commands' checkboxes should be selected

    Scenario: The user deselects all commands
        Given some commands exist
        And the user can delete commands
        And the user navigated to the sms commands list page
        And all commands have been selected
        When the user clicks the checkbox to select all
        Then all individual commands' checkboxes should not be selected

    Scenario: The delete button is disabled if no command is selected
        Given some commands exist
        And the user can delete commands
        And the user navigated to the sms commands list page
        And no command has been selected
        Then the delete button should be disabled

    Scenario: The delete button is disabled if no command exists
        Given no commands exist
        And the user can delete commands
        And the user navigated to the sms commands list page
        Then the delete button should be disabled

    Scenario: The user unsuccessfully tries to delete a command
        Given some commands exist
        And the user can't delete commands due to a request failure
        And the user wants to delete the first command
        And the confirmation modal is visible
        When the user confirms the deletion
        Then an alert with an error message should be displayed
