Feature: User API Endpoints
  As an API user
  I want to interact with user-related endpoints
  So that I can manage user data

  @api @smoke
  Scenario: Get user profile with valid token
    Given I have a valid authentication token
    When I send a GET request to "/api/users/profile"
    Then the response status code should be 200
    And the response should contain user profile data

  @api @regression
  Scenario: Get user profile without token
    Given I don't have an authentication token
    When I send a GET request to "/api/users/profile"
    Then the response status code should be 401
    And the response should contain an error message

  @api @regression
  Scenario: Update user profile with valid data
    Given I have a valid authentication token
    And I have valid user profile data
    When I send a PUT request to "/api/users/profile"
    Then the response status code should be 200
    And the response should contain updated profile data

  @api @regression
  Scenario: Update user profile with invalid data
    Given I have a valid authentication token
    And I have invalid user profile data
    When I send a PUT request to "/api/users/profile"
    Then the response status code should be 400
    And the response should contain validation error messages 