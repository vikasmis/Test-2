import { loginPage } from "./pages/LoginPage"
import { waitHelper } from "./helpers/wait.helpers"
import { testData } from "./testdata/EnvironmentCredentials"
import { ExpectedConditions } from "protractor";

fdescribe('Login', () => {
    describe('Happy flow', () => {
        beforeEach(() => {
            browser.ignoresynchronization = false
            browser.manage().deleteAllCookies()
            browser.get(testData.getUrl())
            waitHelper.waitForElement(loginPage.loginForm.signIn)
        })
        fit('Login and validating the added consultant', () => {
            loginPage.loginForm.signIn.getText().then((text) => {
                expect(text).toEqual('SIGN UP')
                loginPage.loginForm.signIn.click()
                browser.ignoreSynchronization = true
                waitHelper.waitForElement(loginPage.loginForm.signInButton)
                loginPage.loginForm.signInButton.click()
                loginPage.signIn()              
            })
        })
    })
})