Feature: Calculator UI Tests

  Scenario: Add two numbers
    Given I open the calculator app
    When I click "2"
    And I click "+"
    And I click "3"
    And I click "="
    Then I should see "5"

  Scenario: Clear input (AC button)
    Given I open the calculator app
    When I click "9"
    And I click "AC"
    Then input should be empty

  Scenario: Delete last digit
    Given I open the calculator app
    When I click "8"
    And I click "5"
    And I click "Del"
    Then input should show "8"
