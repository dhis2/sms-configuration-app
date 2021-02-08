Feature: Messages can be filtered

    Background:
        Given some received messages exist
        And the user navigated to the received messages page

    Scenario: Messages can be filtered by status
        When the user clicks on the status filter and selects 'Failed'
        Then only messages with the status of 'Failed' will be shown

    Scenario: Messages can be filtered by phone number
        When the user clicks on the phone number filter and types in a phone number
        Then only messages from that phone number will be shown

    Scenario: Filters can be reset
        When the user clicks on 'Reset filter' button
        Then all filters are reset
