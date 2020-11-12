Feature: Key Value can be edited

    Scenario Outline: The user edits some fields
        Given a sms command with parser type Key Value exists
        And the user is editing an Key Value parser command
        When the user changes the <name> field
        And the user submits the form
        Then the form should submit successfully
        And the complete command should be sent to the endpoint
        And the value of the changed <name> field should be reflected in the payload

        Examples:
            | name |
            | name |
            | completenessMethod |
            | currentPeriodUsedForReporting |
            | fieldSeparator |
            | replyMessage |
            | wrongFormatMessage |
            | noUserMessage |
            | moreThanOneOrgUnitMessage |
            | successMessage |

    Scenario Outline: The user provides an invalid value
        Given a sms command with parser type Key Value exists
        And the user is editing an Key Value parser command
        When the user changes the <name> field to an invalid value
        And the user submits the form
        Then the form should not submit successfully

        # all fields except the name field are optional,
        # so they're left out
        Examples:
            | name |
            | name |

    Scenario: The user edits an sms short code
        Given a sms command with parser type Key Value exists
        And the command has a short code field with a value
        And the user is editing an Key Value parser command
        When the user changes the value of a short code
        And the user submits the form
        Then the form should submit successfully
        And the value of the changed short code should be reflected in the payload

    Scenario: The user adds a formula to the first short code
        Given a sms command with parser type Key Value exists
        And the command has a short code field with a value
        And the user is editing an Key Value parser command
        When the user adds a formula
        Then the formula should be reflected below the code
        When the user submits the form
        Then the form should submit successfully
        And the formula should be send alongside the short code

    Scenario: The user changes the formula of the first short code
        Given a sms command with parser type Key Value exists
        And the command has short code fields with a value and a formula
        And the user is editing an Key Value parser command
        When the user changes the formula
        Then the formula should be reflected below the code
        When the user submits the form
        Then the form should submit successfully
        And the formula should be send alongside the short code

    Scenario: The user removes the formula of the first short code
        Given a sms command with parser type Key Value exists
        And the command has short code fields with a value and a formula
        And the user is editing an Key Value parser command
        When the user removes the formula
        Then the formula should not be shown below the code
        When the user submits the form
        Then the form should submit successfully
        And the formula should not be send alongside the short code
