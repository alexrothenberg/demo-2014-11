Given(/^The stock ticker app is running$/) do
  unless app_is_running?
    start_app
    sleep 1 until app_is_running?
  end
end

Given(/^I am on the homepage$/) do
  visit 'http://localhost:9000'
end

When(/^I track "(.*?)"$/) do |ticker|
  fill_in 'New Ticker', with: ticker
  click_button 'Add'
end

Then(/^I should( not)? see a listing for "(.*?)"$/) do |negative, ticker|
  tracked_stocks = all('ul li').map(&:text)
  if negative
    expect(tracked_stocks.join(',')).not_to match(ticker)
  else
    expect(tracked_stocks.join(',')).to match(ticker)
  end
end

When(/^I wait (\d+) seconds$/) do |seconds_to_wait|
  sleep seconds_to_wait.to_i
end


