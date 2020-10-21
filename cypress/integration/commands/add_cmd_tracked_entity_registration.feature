Feature: The user can add a new tracked entity registration parser sms command

    Scenario: The user successfully adds a new command
        Given the user is adding a new tracked entity registration parser sms command
        When the user enters the name
        And the user chooses a program
        And the user submits the form
        Then the data should be sent successfully

    Scenario: The user does not provide a name
        Given the user is adding a new tracked entity registration parser sms command
        When the user chooses a program
        But the user leaves the name empty
        And the user submits the form
        Then the form should not submit
        And display an error message on the name field

    Scenario: The user does not provide a program
        Given the user is adding a new tracked entity registration parser sms command
        When the user enters the name
        But the user leaves the program field empty
        And the user submits the form
        Then the form should not submit
        And display an error message on the program field
