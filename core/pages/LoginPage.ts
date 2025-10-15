import { BasePage } from './BasePage';
export class LoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.byId('email').fill(email);
    await this.byId('password').fill(password);
    await this.byId('login').click();
    await this.expectUrl('/home');
  }
}


