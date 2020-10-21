Feature: The user can add a new key value parser sms command

    Scenario: The user successfully adds a new command
        Given the user is adding a new key value parser sms command
        When the user enters the name
        And the user chooses a data set
        And the user submits the form
        Then the data should be sent successfully

    Scenario: The user does not provide a name
        Given the user is adding a new key value parser sms command
        When the user chooses a data set
        But the user leaves the name empty
        And the user submits the form
        Then the form should not submit
        And display an error message on the name field

    Scenario: The user does not provide a data set
        Given the user is adding a new key value parser sms command
        When the user enters the name
        But the user leaves the data set field empty
        And the user submits the form
        Then the form should not submit
        And display an error message on the data set field
