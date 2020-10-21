Feature: The user can add a new program stage data entry parser sms command

    Scenario: The user successfully adds a new command
        Given the user is adding a new program stage data entry parser sms command
        When the user enters the name
        And the user chooses a program
        And the user chooses a program stage
        And the user submits the form
        Then the data should be sent successfully

    Scenario: The user does not provide a name
        Given the user is adding a new program stage data entry parser sms command
        When the user chooses a program
        And the user chooses a program stage
        But the user leaves the name empty
        And the user submits the form
        Then the form should not submit
        And display an error message on the name field

    Scenario: The user does not provide a program
        Given the user is adding a new program stage data entry parser sms command
        When the user enters the name
        But the user leaves the program field empty
        And the user submits the form
        Then the form should not submit
        And display an error message on the program field

    Scenario: The user does not provide a program stage
        Given the user is adding a new program stage data entry parser sms command
        When the user enters the name
        And the user chooses a program
        But the user leaves the program stage field empty
        And the user submits the form
        Then the form should not submit
        And display an error message on the program stage field

    Scenario: The user chooses a program
        Given the user is adding a new program stage data entry parser sms command
        And the user hasn't chosen a program
        Then the program stage field should be disabled
        When the user chooses a program
        Then the program stage field should be enabled
        And the program stage field should contain program stages related to the program
