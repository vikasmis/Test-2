class WaitHelper {
    waitForRedirect(expectedUrl, timeout = 10000) {
        var loaded = false;

        browser.wait(function () {
            browser.executeScript(function () {
                return {
                    url: window.location.href,
                    haveAngular: !!window.angular
                };
            }).then(function (obj) {
                loaded = (obj.url.includes(expectedUrl) && obj.haveAngular);
            });

            return loaded;
        }, timeout);
    }
    // this will wait until non angular page loads
    WaitforNonAngular() {
        browser.waitForAngularEnabled(false)
        browser.wait(function () {
            return browser.executeScript('return jQuery.active;').then(function (text) {
                return text == 0;
            });
        });
    }
    waitforAngular() {
        browser.wait(function () {
            return browser.executeScript('return document.readyState==="complete" &&' +
                ' jQuery !== undefined && jQuery.active==0;').then(function (text) {
                    return text === true;
                });
        }, 30000);
    }
    /**
     * Wait until an element is Displayed
     * @param {object} element The element that should be Displayed
     * @param {number} timeout Time to wait for the element to be Displayed. Default is 10 seconds
     * @returns {boolean} Will return true once the element is Displayed
     */
    getElement(element, timeout = 10000) {
        // Wait for the element to be Displayed
        browser.driver.wait(function () {
            return element.isDisplayed().then(function (displayed) {
                return displayed;
            });
        }, timeout, `${element} not Displayed`);
        return element;
    }
    waitForElement(element, timeout=10000) {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(element), timeout, `${element} taking too long to appear in the DOM`);
    }
}

export const waitHelper = new WaitHelper();