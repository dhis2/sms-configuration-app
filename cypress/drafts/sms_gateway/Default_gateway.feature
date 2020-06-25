Feature: There is always be a default gateway when configurations exist

    Scenario: The first gateway is being added
        Given no gateway configuration exists
        When the user adds a new gateway configuration
        Then the new gateway configuration should be the default

    Scenario: The first gateway is deleted and the second one becomes the default
        Given multiple gateway configurations exist
        And then first gateway configuration is the default
        When the user deletes the first gateway configuration
        Then the second gateway configuration should become the default

    Scenario: The user chooses another gateway configuration as the default
        Given multiple gateway configurations exist
        And then first gateway configuration is the default
        When the user makes the second gateway configuration the default
        Then the second gateway configuration should become the default
        And the first gateway configuration should not be the default configuration
