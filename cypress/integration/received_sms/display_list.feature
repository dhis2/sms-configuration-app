Feature: Received sms should be displayed as a list

    Scenario: Some entries exist
        Given some entries exist
        And the user navigated to the received sms page
        Then the entries should be displayed
        And each entry has a message
        And each entry has a phone number
        And each entry has a status
        And each entry has a sender
        And each entry has a received date

    Scenario: Some entries exist
        Given no entries exist
        And the user navigated to the received sms page
        Then a message for no entries should be displayed
