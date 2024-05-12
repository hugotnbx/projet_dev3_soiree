describe('Launching app tests', function() {
    it('should have a title', function() {
      browser.get('http://localhost:8100');
  
      expect(browser.getTitle()).toEqual('Iziplan');
    });

    it('should redirect to /login on startup', function() {
      browser.get('http://localhost:8100');

      expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/login');
    });

    it('should redirect to /register when user clicks on register link', function() {
      browser.get('http://localhost:8100/login');
  
      element(by.css('#register a')).click();
  
      browser.sleep(1000); 
      
      expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/register');
    });
});

describe('Register pages tests', function() {
  it('should enable register button', () => {
    browser.get('http://localhost:8100/register');
    
    element(by.css('input[name="username"]')).sendKeys('testuser');
    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('usertest@example.com');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user123');

    expect(element(by.css('#registerButton')).isEnabled()).toBeTruthy();
  });

  it('should not register user because required data is missing', () => {
    browser.get('http://localhost:8100/register');

    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('usertest@example.com');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user123');

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/register');
  });

  it('should not register user because confirm password is not the same as the password', () => {
    browser.get('http://localhost:8100/register');

    element(by.css('input[name="username"]')).sendKeys('testuser');
    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('usertest@example.com');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user124');

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/register');
  });

  it('should not register user because bad email address', () => {
    browser.get('http://localhost:8100/register');

    element(by.css('input[name="username"]')).sendKeys('testuser');
    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('usertest');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user123');

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/register');
  });

  it('should register user with valid data', () => {
    browser.get('http://localhost:8100/register');

    element(by.css('input[name="username"]')).sendKeys('testuser');
    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('usertest@example.com');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user123');

    expect(element(by.css('#registerButton')).isEnabled()).toBeTruthy();

    element(by.css('#registerButton')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/login');
  }); 
});

describe('Login tests', function() {
  it('should login user with valid data', () => {
    browser.get('http://localhost:8100/login');
  
    element(by.css('input[name="username"]')).sendKeys('hugotnbx');
    element(by.css('input[name="password"]')).sendKeys('user123');
  
    element(by.css('#loginButton')).click();
  
    browser.waitForAngular();
  
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/tabs/tab1');
  });
  
  it('should have a token for connected user', () => {
    browser.get('http://localhost:8100/tabs/tab1');
  
    const token = browser.executeScript("return window.localStorage.getItem('ACCESS_TOKEN')");
  
    expect(token).toBeTruthy();
  });
});

describe('Tabs redirections', function() {
  it('should redirect to page tab2', () => {
    browser.get('http://localhost:8100/tabs/tab1');

    element(by.css('[href="/tabs/tab2"]')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/tabs/tab2');
  });

  it('should redirect to page tab3', () => {
    browser.get('http://localhost:8100/tabs/tab2');

    element(by.css('[href="/tabs/tab3"]')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/tabs/tab3');
  });

  it('should redirect to page tab1', () => {
    browser.get('http://localhost:8100/tabs/tab3');

    element(by.css('[href="/tabs/tab1"]')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/tabs/tab1');
  });
});

describe('Launching app tests', function() {
  /* it('should open the menu when clicking on the menu button', () => {
    browser.get('http://localhost:8100/tabs/tab1');
    const menuButton = element(by.css('[aria-label="menu"]'));

    menuButton.click();

    browser.sleep(1000);

    const menu = element(by.id('main-content'));
    expect(menu.isPresent()).toBeTruthy();
  }); */

  it('should successfully create an event', () => {
    browser.get('http://localhost:8100/tabs/tab2');

    element(by.css('input[name="Nom"]')).sendKeys('Mon nouvel événement');
    element(by.css('input[name="Lieu"]')).sendKeys('Lieu de l\'événement');
    element(by.css('input[name="nbrLit"]')).sendKeys('6'); 

    browser.executeScript("arguments[0].click();", element(by.id('eventButton')));

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('http://localhost:8100/evenement/');
  });
});