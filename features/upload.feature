Feature: Upload a file

    This is a feature file containing scenarios for uploading a file.

Scenario: Verify uploading of an image
Given User navigate to the upload website
When User selects a file "test_upload.jpg" and click open
And Click on Upload button
Then Verify whether file "test_upload.jpg" is uploaded successfully

Scenario: Verify uploading of a text file
Given User navigate to the upload website
When User selects a file "text-file.txt" and click open
And Click on Upload button
Then Verify whether file "text-file.txt" is uploaded successfully

Scenario: Verify uploading of word document
Given User navigate to the upload website
When User selects a file "doc-file.docx" and click open
And Click on Upload button
Then Verify whether file "doc-file.docx" is uploaded successfully

Scenario: Verify uploading of an excel sheet
Given User navigate to the upload website
When User selects a file "excel-file.xlsx" and click open
And Click on Upload button
Then Verify whether file "excel-file.xlsx" is uploaded successfully

Scenario: Click on Upload Button without choosing a file
Given User navigate to the upload website
When Click on Upload button
Then Error message should be displayed

Scenario: Choose a file, clear the selection and upload 
Given User navigate to the upload website
When User selects a file "test_upload.jpg" and click open
And Clear the selection
And Click on Upload button
Then Error message should be displayed