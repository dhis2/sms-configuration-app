Feature: The list can be filtered by phone number

    Scenario: Some entries have been found for a phone number
        Given some entries exist
        And the user navigated to the received sms page
        When the user filters by an existing phone number
        Then only entries with the specified phone number should be displayed

    Scenario: Some entries have been found for a partial phone number
        Given some entries exist
        And the user navigated to the received sms page
        When the user filters by an existing partial phone number
        Then only entries with a match of the partial phone number should be displayed

    Scenario: No entries have been found for a phone number
        Given some entries exist
        And the user navigated to the received sms page
        When the user filters by an non-existing phone number
        Then a no-found message should be displayed
