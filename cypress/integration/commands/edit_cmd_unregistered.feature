Feature: Unregistered parsers can be edited

    Scenario Outline: The user edits some fields
        Given the user is editing an unregistered parser command
        When the user changes the <name> field
        And the user submits the form
        Then the complete command should be sent to the endpoint
        And the value of the changed <name> field should be reflected in the payload

        Examples:
            | name |
            | name |
            | confirmMessage |

    Scenario Outline: The user provides an invalid value
        Given the user is editing an unregistered parser command
        When the user changes the <name> field to an invalid value
        And the user submits the form
        Then the form should not submit successfully

        # the confirm message is optional and could be anything,
        # so it's left out
        Examples:
            | name |
            | name |
