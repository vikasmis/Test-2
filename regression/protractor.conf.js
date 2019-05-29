var HtmlReporter = require('protractor-beautiful-reporter');

process.env.CHROME_BIN = require('puppeteer').executablePath();
exports.config = {
    directConnect: true,
    chromeDriver: './selenium/chromedriver.exe',
    capabilities: {
        logName: 'Chrome',
        logLevel: 'ERROR',
        browserName: 'chrome',
        count: 1,
        shardTestFiles: false,
        maxInstances: 1,
        specs: ['*spec.js'],
        'directConnect': true,
        'browserName': 'chrome',
        // chromeOptions: {
        //     args: ["--headless", "--disable-gpu", "--window-size=800x600"]
        // },

        chromeOptions: {
            binary: process.env.CHROME_BIN,
            //disable "chrome is being controlled by automated software"
            args: [
                // "--headless",
                "--disable-gpu",
                "--window-size=1280,1024",
                '--disable-infobars',
                '--enable-logging=false',
                '--disable-extensions',
                '--disk-cache-size=0',
                '--media-cache-size=0',
                '--start-maximized'
            ],
            //  disable Password manager popup
            prefs: {
                credentials_enable_service: false
            }
        }
    },
    framework: 'jasmine2',
    params: {
        env: 'sandbox'
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000
    },
    allScriptsTimeout:30000,
    getPageTimeout:30000,
    onPrepare: () => {
        'use strict';

        require("babel-core/register")({
            presets: ["es2015"]
        });

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'report',
            screenshotsSubfolder: 'screenshots',
            takeScreenShotsOnlyForFailedSpecs: true,
            docTitle: 'LOBSTER Test',
            preserveDirectory: false
        }).getJasmine2Reporter());
        browser.ignoresynchronization = true
    },

};
