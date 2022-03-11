const { Given, When, Then } = require('@cucumber/cucumber');
const homepage = require('../../pages/HomePage');
const common = require('../../helper/helper');
const config = require('../../config/config_info.json');


Given('User navigate to the website', async function () {
    await testController
    .navigateTo(config.baseUrl);

    var url =  await common.getURL.url();
    await testController
    .expect(url).eql('https://demo.opencart.com/');
    });

When('User enters {string} in the search box', async function (string) {
    await testController
    .selectText(homepage.HomePage.SearchBox()).pressKey("delete")
    .typeText(homepage.HomePage.SearchBox(),string);
    });

When('Click on Search button', async function () {
    await testController
    .click(homepage.HomePage.SearchButton());
    });

When('Press Enter Key', async function () {
    await testController
    .pressKey('enter');
    });
    
Then('User should be able to search successfully and Search results should contain {string}', async function (string) {
    
    var pageCount = 1;
    // Get page count if pagination exists
    if(await homepage.HomePage.Pagination().exists)
    {
        var text = await homepage.HomePage.PaginationText()
        pageCount = text.substring(text.indexOf("(") + 1, text.lastIndexOf(")")).split(" ")[0]
    }

    for(var i=1;i<=pageCount;i++){
        // Verify all page elements
    await testController
    .expect(homepage.HomePage.ResultGrid().count).gte(1);
    var resultCount = await homepage.HomePage.ResultGrid().count;
    console.log("\n\nProduct count: "+resultCount)
    console.log("Following products are found after the search:")
        for(var j=0;j<resultCount;j++){
            await testController
                .expect(homepage.HomePage.SearchResults(string.trim()).nth(j).exists).ok();
            console.log(await homepage.HomePage.SearchResults(string.trim()).nth(j).innerText)
        }  
    
    if(i<pageCount)
    {
        // click on pagination button
        await testController
        .click( homepage.HomePage.PageButton((i+1).toString()));
    }
}
    });

Then('Search box and Search button should be present', async function () {
    await testController
        .expect(homepage.HomePage.SearchBox().exists).ok()
        .expect(homepage.HomePage.SearchButton().exists).ok();
        
    });

Then('No products should be displayed', async function () {
    await testController
        .expect(homepage.HomePage.ResultGrid().exists).notOk()
        .expect(homepage.HomePage.NoProductFoundText('There is no product that matches the search criteria.').exists).ok();            
        });