Feature: Generic gateway configurations can have custom key-value pairs

    Background:
        Given the user navigated to the gateway configuration page

    Scenario Outline: The user adds a standard key value pair
        Given the user is <operation> a generic gateway configuration
        When the user clicks on the "add more" button
        Then the key-value form should appear
        When the user enters values for the key and value
        And the user submits the form
        Then the additional key-value pair should be sent to the endpoint

        Examples:
            | operation |
            | editing   |
            | adding    |

    Scenario Outline: The user adds a confidential key value pair
        Given the user is <operation> a generic gateway configuration
        When the user clicks on the "add more" button
        Then the key-value form should appear
        When the user enters values for the key and value
        And checks the "confidential" checkbox
        And the user submits the form
        Then the additional key-value pair should be sent to the endpoint

        Examples:
            | operation |
            | editing   |
            | adding    |

    Scenario Outline: The user adds a key value pair as header
        Given the user is <operation> a generic gateway configuration
        When the user clicks on the "add more" button
        Then the key-value form should appear
        When the user enters values for the key and value
        And checks the "header" checkbox
        And the user submits the form
        Then the additional key-value pair should be sent to the endpoint

        Examples:
            | operation |
            | editing   |
            | adding    |

    Scenario Outline: The user adds multiple key value pairs
        Given the user is <operation> a generic gateway configuration
        And the user has added multiple key value pairs
        When the user submits the form
        Then all provided key value pairs should be sent to the endpoint

        Examples:
            | operation |
            | editing   |
            | adding    |
