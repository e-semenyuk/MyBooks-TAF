import { BasePage } from './BasePage';
export class LoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.byId('nav-login-button').click();
    await this.byId('login-email-input').fill(email);
    await this.byId('login-password-input').fill(password);
    await this.byId('login-submit-button').click();
  }
}


