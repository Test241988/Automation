const {setWorldConstructor} = require('@cucumber/cucumber');
const controller = require('./controller');
const base64Img = require('base64-img');
const config = require('../../.testcaferc.json')

function CustomWorld({attach, parameters}) {

    this.waitForTestController = controller.get()
        .then(function(tc) {
            return testController = tc;
        });

    this.attach = attach;

    this.setBrowser = function() {
        if (config.browsers === undefined) {
            return 'chrome:headless';
        } else {
            return config.browsers;
        }
    };

    this.attachScreenshotToReport = function(pathToScreenshot) {
        const imgInBase64 = base64Img.base64Sync(pathToScreenshot);
        const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
        return attach(imageConvertForCuc, 'image/png');
    };
}

setWorldConstructor(CustomWorld);