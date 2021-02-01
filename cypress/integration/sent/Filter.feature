Feature: Messages can be filtered

    Background:
        Given some sent messages exist
        And the user navigated to the sent messages page

    Scenario: Messages can be filtered by status
        When the user clicks on the status filter and selects 'Failed'
        Then only messages with the status of 'Failed' will be shown
