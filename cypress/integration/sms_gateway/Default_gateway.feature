Feature: There is always be a default gateway when configurations exist

    Scenario: Exactly one default gateway configuration exists
        Given some gateway configurations exist
        Then there should be exactly one default gateway configuration

    Scenario: The user chooses another gateway configuration as the default
        Given some gateway configurations exist
        When the user clicks on the make default button of a non-default gateway configuration
        Then the endpoint for setting the default gateway should be called with the id of the clicked one
