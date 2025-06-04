Feature: Login Functionality
  As a user
  I want to be able to log in to the application
  So that I can access my account

  @smoke @login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username and password
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message

  @regression @login
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @regression @login
  Scenario: Login with empty credentials
    Given I am on the login page
    When I leave username and password fields empty
    And I click the login button
    Then I should see validation error messages
    And I should remain on the login page 