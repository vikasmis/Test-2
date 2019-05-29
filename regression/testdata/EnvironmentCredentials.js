import { getDefaultService } from "selenium-webdriver/edge";

class EnvironmentCredentials {

    constructor() {

        this.sandbox = {
            addConsultant: {
                firstName: 'MyFirstName' + " " + Math.floor((Math.random() * 10) + 1) + Math.random().toString(36).slice(2),
                lastName: 'MyLastName' + " " + Math.floor((Math.random() * 10) + 1),
                password: 'test@12345',
                repeatPassword: 'test@12345'
            },
        }
        this.email = 'test' + Math.floor((Math.random() * 10) + 1) + Math.random().toString(36).slice(2) + '@gmail.com'
        this.repeatEmail = this.email
    }

    getUrl() {
        switch (browser.params.env) {
            case 'beta':
                return `https://my.lobsterink.com/learn` // You can pass from argument another Environment
            case 'sandbox':
                return `https://my.lobsterink.com/learn` //Default one
            default:
                throw (`Unknown environment to run tests on: ${browser.params.env}`)
        }
    }
}

export const testData = new EnvironmentCredentials()