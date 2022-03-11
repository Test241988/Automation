const { Given, When, Then } = require('@cucumber/cucumber');
const uploadpage = require('../../pages/UploadPage');
const common = require('../../helper/helper');
const config = require('../../config/config_info.json');


Given('User navigate to the upload website', async function () {
    await testController
    .navigateTo(config.uploadUrl);

    var url =  await common.getURL.url();
    await testController
    .expect(url).eql('https://the-internet.herokuapp.com/upload');
    });

When('User selects a file {string} and click open', async function (string) {
    await testController
        .setFilesToUpload(uploadpage.Upload.ChooseFileButton(),'../Data/'+string);

    console.log("\nFile \""+string+"\" selected!!")
});

When('Click on Upload button', async function () {
    await testController
        .click(uploadpage.Upload.UploadButton());
});

When('Verify whether file {string} is uploaded successfully', async function (string) {
    await testController
        .expect(uploadpage.Upload.SuccessMessage().exists).ok()
        .expect(uploadpage.Upload.UploadedFile().innerText).contains(string);
    
    if(await uploadpage.Upload.SuccessMessage().exists)
        console.log("\nFile \""+string+"\" uploaded successfully!!");
});

When('Clear the selection', async function () {
    await testController
        .clearUpload(uploadpage.Upload.ChooseFileButton());

    console.log("File selection is cleared!!")
});


Then('Error message should be displayed', async function () {
    await testController
        .expect(uploadpage.Upload.ErrorMessage().exists).ok();

    if(await uploadpage.Upload.ErrorMessage().exists)
        console.log("\nError while uploading!!");
});