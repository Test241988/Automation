const fs = require('fs');
const createTestCafe = require('testcafe');
const controller = require('./controller');
const {AfterAll, setDefaultTimeout, Before, After, Status, Given, When} = require('@cucumber/cucumber');
const errorHandling = require('./error_handler');
const common = require('../../helper/helper');
const TIMEOUT = 60000;

let isTestCafeError = false;
let attachScreenshotToReport = null;
let cafeRunner = null;
let n = 0;

function createTestFile() {
    fs.writeFileSync('test.js',
        'import errorHandling from "./features/support/error_handler.js";\n' +
        'import controller from "./features/support/controller.js";\n\n' +
        'fixture("fixture")\n' +
        'test\n' +
        '("test", controller.capture)')
}

function runTest(n,browser) {
    createTestCafe('localhost', 1338+n , 1339+n)
        .then(function(tc) {
            cafeRunner = tc;
            const runner = tc.createRunner();
            return runner
                .src('./test.js')
                .screenshots('report/screenshots/', true)
                .browsers(browser)
                .run()
                .catch(function(error) {
                    console.error(error);
                });
        })
        .then(function(report) {
        });
}


setDefaultTimeout(TIMEOUT);

Before(function() {
    runTest(n,this.setBrowser());
    createTestFile();

    n += 2;
    return this.waitForTestController.then(function(testController) {
        return testController.maximizeWindow();
    });
});

After(function() {
    fs.unlinkSync('test.js');
    controller.free();
});

After(async function(testCase) {
    const world = this;
    if (testCase.result.status === Status.FAILED) {
        isTestCafeError = true;
        attachScreenshotToReport = world.attachScreenshotToReport;
        errorHandling.addErrorToController();
        await errorHandling.ifErrorTakeScreenshot(testController);
        
    }
});

AfterAll(function() {

    function waitForTestCafe() {
        intervalId = setInterval(checkLastResponse, 500);
    }

    function checkLastResponse() {
        if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
            cafeRunner.close();
            process.exit();

        }
    }

    waitForTestCafe();
});

const getIsTestCafeError = function() {
    return isTestCafeError;
};

const getAttachScreenshotToReport = function(path) {
    return attachScreenshotToReport(path);
};

exports.getIsTestCafeError = getIsTestCafeError;
exports.getAttachScreenshotToReport = getAttachScreenshotToReport;