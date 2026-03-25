const LoginScreen = require('../../screenObjects/LoginScreen');
const HomeScreen = require('../../screenObjects/HomeScreen');

describe('Login Screen', () => {
  beforeEach(async () => {
    await LoginScreen.waitForScreen();
    await LoginScreen.clearFields();
  });

  it('should display login screen elements', async () => {
    const title = await LoginScreen.getTitleText();
    expect(title).toContain('ShopNest');
  });

  it('should show error when logging in with empty fields', async () => {
    await LoginScreen.tapLogin();
    const error = await LoginScreen.getErrorMessage();
    expect(error).toBe('Please enter both username and password');
  });

  it('should show error when only username is entered', async () => {
    await LoginScreen.enterUsername('testuser');
    await LoginScreen.tapLogin();
    const error = await LoginScreen.getErrorMessage();
    expect(error).toBe('Please enter both username and password');
  });

  it('should show error when only password is entered', async () => {
    await LoginScreen.enterPassword('password123');
    await LoginScreen.tapLogin();
    const error = await LoginScreen.getErrorMessage();
    expect(error).toBe('Please enter both username and password');
  });

  it('should navigate to Home screen on successful login', async () => {
    await LoginScreen.login('testuser', 'password123');
    await HomeScreen.waitForScreen();
    const title = await HomeScreen.getTitleText();
    expect(title).toBe('Products');
  });
});
