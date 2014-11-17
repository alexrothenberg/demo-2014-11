Feature: Tracking my stocks
  In order to be a wise investor
  As a person who invests in stocks
  I want to track stock prices

Background:
  Given The stock ticker app is running
    And I am on the homepage

Scenario: I can track Voya
  When I track "voya"
   And I wait 5 seconds
  Then I should see a listing for "VOYA"

Scenario: I cannot track a company that does not exist
  When I track "this-is-not-a-real-company"
   And I wait 5 seconds
  Then I should not see a listing for "this-is-not-a-real-company"


