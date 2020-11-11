Feature: Tracked entity registration commands can be edited

    Scenario Outline: The user edits some fields
        Given the user is editing an tracked entity registration parser command
        When the user changes the <name> field
        And the user submits the form
        Then the form should submit successfully
        And the complete command should be sent to the endpoint
        And the value of the changed <name> field should be reflected in the payload

        Examples:
            | name |
            | name |
            | fieldSeparator |
            | replyMessage |
            | wrongFormatMessage |
            | noUserMessage |
            | moreThanOneOrgUnitMessage |
            | successMessage |

    Scenario Outline: The user provides an invalid value
        Given the user is editing an tracked entity registration parser command
        When the user changes the <name> field to an invalid value
        And the user submits the form
        Then the form should not submit successfully

        # all fields except the name field are optional,
        # so they're left out
        Examples:
            | name |
            | name |

    Scenario: The user edits an sms short code
        Given the user is editing an tracked entity registration parser command
        And the command has short codes
        When the user changes the value of a sms short code
        And the user submits the form
        Then the form should submit successfully
        And updated value of the sms short code should be reflected in the payload
