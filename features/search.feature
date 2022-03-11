Feature: Search

    This is a feature file containing scenarios for testing search functionality.

Scenario: Verify the presence of search options on the page (UI verification)
Given User navigate to the website
Then Search box and Search button should be present

Scenario: Search for "iPhone" on the website (exact search)
Given User navigate to the website
When User enters "iPhone" in the search box
And Click on Search button
Then User should be able to search successfully and Search results should contain "iPhone" 

Scenario: Search for "Macbook" on the website and verify if the multiple results matching the string is displayed  
Given User navigate to the website
When User enters "Macbook" in the search box
And Click on Search button
Then User should be able to search successfully and Search results should contain "Macbook"

Scenario: Click on Search without entering any search text
Given User navigate to the website
And Click on Search button
Then No products should be displayed

Scenario: Search for empty space and verify the search results on multiple pages
Given User navigate to the website
When User enters " " in the search box
And Click on Search button
Then User should be able to search successfully and Search results should contain " "

Scenario: Search for incorrect text that doesn't produce any search results
Given User navigate to the website
When User enters "abcd" in the search box
And Click on Search button
And No products should be displayed
And User enters "#@!!!" in the search box
And Click on Search button
And No products should be displayed

Scenario: Verify search by pressing enter key
Given User navigate to the website
When User enters "samsung" in the search box
And Press Enter Key
Then User should be able to search successfully and Search results should contain "samsung" 

Scenario: Verify the results when user performs case-insensitive search
Given User navigate to the website
When User enters "SAMsung" in the search box
And Press Enter Key
And User should be able to search successfully and Search results should contain "SAMsung"
And User enters "SAMSUNG" in the search box
And Press Enter Key
And User should be able to search successfully and Search results should contain "SAMSUNG"  