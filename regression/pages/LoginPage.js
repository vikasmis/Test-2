import { testData } from '../testdata/EnvironmentCredentials'
import { waitHelper } from "../helpers/wait.helpers"
import { browser } from 'protractor';
class LoginPage {
    constructor() {
        this.loginForm = {
            signIn: $('.mat-button-wrapper'),
            signInButton: $('[id="sign-up-with-email"]'),
            firstName: $('[name="FirstName"]'),
            lastName: $('[name="LastName"]'),
            emailAddress: $('[name="Email"]'),
            confirmEmail: $('[name="ConfirmEmail"]'),
            password: $('[id="Password"]'),
            confirmPassword: $('[name="ConfirmPassword"]'),
            submitButton: $('[id="sign-up-button"]')
        }
        this.dashboard = {
            consultant: $('.ng-star-inserted')
        }
    }

    signIn() {
        waitHelper.waitForElement(this.loginForm.firstName)
        let firstName = testData.sandbox.addConsultant.firstName
        this.loginForm.firstName.sendKeys(firstName)
        this.loginForm.lastName.sendKeys(testData.sandbox.addConsultant.lastName)
        this.loginForm.emailAddress.sendKeys(testData.email)
        this.loginForm.confirmEmail.sendKeys(testData.repeatEmail)
        this.loginForm.password.sendKeys(testData.sandbox.addConsultant.password)
        this.loginForm.confirmPassword.sendKeys(testData.sandbox.addConsultant.repeatPassword)
        this.loginForm.submitButton.click()
        this.consultantValidation(firstName)
    }
    clearField(locator) {
        locator.clear()
    }
    consultantValidation(consultantName) {
        waitHelper.waitForElement(this.dashboard.consultant)
        this.dashboard.consultant.getText().then((text) => {
            expect(text).toContain(consultantName)
        })
    }


}

export const loginPage = new LoginPage()