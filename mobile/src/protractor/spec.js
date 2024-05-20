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

  it('should not register user because email is already taken', () => {
    browser.get('http://localhost:8100/register');

    element(by.css('input[name="username"]')).sendKeys('testuser22');
    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('troonbeeckxhugo@hotmail.com');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user123');

    expect(element(by.css('#registerButton')).isEnabled()).toBeTruthy();

    element(by.css('#registerButton')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/register');
  }); 

  it('should not register user because username is already taken', () => {
    browser.get('http://localhost:8100/register');

    element(by.css('input[name="username"]')).sendKeys('hugotnbx');
    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('usertest22@example.com');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user123');

    expect(element(by.css('#registerButton')).isEnabled()).toBeTruthy();

    element(by.css('#registerButton')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/register');
  }); 

  it('should register user with valid data', () => {
    browser.get('http://localhost:8100/register');

    element(by.css('input[name="username"]')).sendKeys('testuser');
    element(by.css('input[name="name"]')).sendKeys('Test');
    element(by.css('input[name="firstName"]')).sendKeys('User');
    element(by.css('input[name="mail"]')).sendKeys('testuser@example.com');
    element(by.css('input[name="password"]')).sendKeys('user123');
    element(by.css('input[name="confirm"]')).sendKeys('user123');

    expect(element(by.css('#registerButton')).isEnabled()).toBeTruthy();

    element(by.css('#registerButton')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/login');
  }); 
});

describe('Login tests', function() {
  it('should not login because username is inexistant', () => {
    browser.get('http://localhost:8100/login');

    element(by.css('input[name="username"]')).sendKeys('hugotnbxx');
    element(by.css('input[name="password"]')).sendKeys('user123');

    element(by.css('#loginButton')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/login');

    const errorMessage = element(by.css('#loginError')); 

    expect(errorMessage.isDisplayed()).toBe(true);
    expect(errorMessage.getText()).toEqual('Nom d\'utilisateur ou mot de passe incorrect');
  });

  it('should not login because password is wrong', () => {
    browser.get('http://localhost:8100/login');

    element(by.css('input[name="username"]')).sendKeys('hugotnbx');
    element(by.css('input[name="password"]')).sendKeys('user124');

    element(by.css('#loginButton')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/login');

    const errorMessage = element(by.css('#loginError')); 

    expect(errorMessage.isDisplayed()).toBe(true);
    expect(errorMessage.getText()).toEqual('Nom d\'utilisateur ou mot de passe incorrect');
  });

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

  /* it('should open the menu when clicking on the menu button', () => {
    browser.get('http://localhost:8100/tabs/tab1');
    const menuButton = element(by.css('[aria-label="menu"]'));
    menuButton.click();
    browser.sleep(1000);
    const menu = element(by.id('main-content'));
    expect(menu.isPresent()).toBeTruthy();
  }); */
});

describe('Events creation tests', function() {
  it('should not create an event because there are more than 10 beds', () => {
    browser.get('http://localhost:8100/tabs/tab2');

    element(by.css('input[name="Nom"]')).sendKeys('Test end to end');
    element(by.css('input[name="Lieu"]')).sendKeys('Rue du test end to end');
    element(by.css('input[name="nbrLit"]')).sendKeys('11'); 

    browser.executeScript("arguments[0].click();", element(by.id('eventButton')));

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/tabs/tab2');

    /* const errorMessage = element(by.css('.error-message')); 
    expect(errorMessage.isDisplayed()).toBe(true);
    expect(errorMessage.getText()).toContain('Vous ne pouvez pas proposer plus de 10 lits'); */
  });

  it('should successfully create an event', () => {
    browser.get('http://localhost:8100/tabs/tab2');
    element(by.css('input[name="Nom"]')).sendKeys('Test end to end');
    element(by.css('input[name="Lieu"]')).sendKeys('Rue du test end to end');
    element(by.css('input[name="nbrLit"]')).sendKeys('6'); 
    browser.executeScript("arguments[0].click();", element(by.id('eventButton')));
    
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('http://localhost:8100/evenement/');
  }); 
});

describe('Profil informations tests', function() {
  it('should display the profile information', () => {
    browser.get('http://localhost:8100/tabs/tab3');

    const profileName = element(by.css('#photoProfil ion-card-title'));
    const profileUsername = element(by.css('#photoProfil ion-card-subtitle'));

    expect(profileName.getText()).toBe('Hugo Troonbeeckx');
    expect(profileUsername.getText()).toContain('@hugotnbx');
  });
});

describe('Home page tests', function() {
  it('should display the events of the user', () => {
    browser.get('http://localhost:8100/tabs/tab1');

    const eventsList = element.all(by.css('ion-card'));
    expect(eventsList.count()).toBeGreaterThan(0);
  });

  it('should navigate to event page when an event is clicked', () => {
    browser.get('http://localhost:8100/tabs/tab1');

    const firstEvent = element.all(by.css('ion-card')).first();
    firstEvent.click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toContain('http://localhost:8100/evenement/');
  });
});

describe('Event page tests for admin', function() {
  it('should display the event name', () => {
    browser.get('http://localhost:8100/evenement/8');

    let eventName = element(by.id('event-name'));

    expect(eventName.isPresent()).toBe(true);
    expect(eventName.getText()).toBe('Test 12000'); 
  });

  it('should display the correct date and time', () => {
    let dateTime = element(by.id('date-time'));

    expect(dateTime.isPresent()).toBe(true);
    expect(dateTime.getText()).toBe('2024-05-21 à 21:25'); 
  });

  it('should display the correct location', () => {
    let location = element(by.id('location'));

    expect(location.isPresent()).toBe(true);
    expect(location.getText()).toBe('11 rue du test'); 
  });

  it('should display the correct number of free beds', () => {
    let nbrLit = element(by.id('nbrLit'));

    expect(nbrLit.isPresent()).toBe(true);
    expect(nbrLit.getText()).toBe('1'); 
  });

  it('should display the correct number of bobs', () => {
    let nbrBob = element(by.id('nbrBob'));

    expect(nbrBob.isPresent()).toBe(true);
    expect(nbrBob.getText()).toBe('0'); 
  });

  it('should display the share button if admin', () => {
    let shareButton = element(by.id('shareEventButton'));

    expect(shareButton.isPresent()).toBe(true);
  });

  it('should display the update button if admin', () => {
    let updateButton = element(by.id('updateEventButton'));

    expect(updateButton.isPresent()).toBe(true);
  });

  it('should display the cancel button if admin', () => {
    let cancelButton = element(by.id('cancelEventButton'));

    expect(cancelButton.isPresent()).toBe(true);
  });

  it('should display the users of the event', () => {
    const profileCards = element.all(by.css('ion-card.status'));

    expect(profileCards.count()).toBeGreaterThan(0);
  });

  it('should navigate to the profile of the user on profile card click', () => {
    let profileCard = element.all(by.css('ion-card.status')).first();

    profileCard.click();

    expect(browser.getCurrentUrl()).toContain('http://localhost:8100/profil-event/'); 
  });
}); 

describe('Event page tests for guests', function() {
  it('should display the event name', () => {
    browser.get('http://localhost:8100/evenement/10');

    let eventName = element(by.id('event-name'));

    expect(eventName.isPresent()).toBe(true);
    expect(eventName.getText()).toBe('Test 2'); 
  });

  it('should display the correct date and time', () => {
    let dateTime = element(by.id('date-time'));

    expect(dateTime.isPresent()).toBe(true);
    expect(dateTime.getText()).toBe('2024-05-22 à 15:08'); 
  });

  it('should display the correct location', () => {
    let location = element(by.id('location'));

    expect(location.isPresent()).toBe(true);
    expect(location.getText()).toBe('Rue du test end to end'); 
  });

  it('should display the correct number of free beds', () => {
    let nbrLit = element(by.id('nbrLit'));

    expect(nbrLit.isPresent()).toBe(true);
    expect(nbrLit.getText()).toBe('7'); 
  });

  it('should display the correct number of bobs', () => {
    let nbrBob = element(by.id('nbrBob'));

    expect(nbrBob.isPresent()).toBe(true);
    expect(nbrBob.getText()).toBe('1'); 
  });

  it('should display the share button if admin', () => {
    let shareButton = element(by.id('shareEventButton'));

    expect(shareButton.isPresent()).toBe(false);
  });

  it('should display the update button if admin', () => {
    let updateButton = element(by.id('updateEventButton'));

    expect(updateButton.isPresent()).toBe(false);
  });

  it('should display the cancel button if admin', () => {
    let cancelButton = element(by.id('cancelEventButton'));

    expect(cancelButton.isPresent()).toBe(false);
  });

  it('should display the users of the event', () => {
    const profileCards = element.all(by.css('ion-card.status'));

    expect(profileCards.count()).toBeGreaterThan(0);
  });
}); 