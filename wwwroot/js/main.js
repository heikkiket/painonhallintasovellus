'use strict';

const router = new Router({
	  mode: 'history',
});

/**
 * This object saves the application state.
 */
const state = {
    userId: null,
    currentWeight: null,
    height: null,
    targetWeight: null,
    token: null,
    accountInfo: {}
};

// Make the state global
window.state = state;

function main() {

    window.router = router;

    router.add('/view/login', () => {
        showView("login-view");
    });

    router.add('/', () => {
        if(!loggedin()) {
            showView('login-view');
            getMeasuresHeader();
        } else {
            showView("main-view");

            getMyAccount();

            let timeout = 0;
            // Wait for account information to load:
            if(window.state.accountInfo.UserName == null) {
                timeout = 1500;
            }
            setTimeout(() => {
                let name = window.state.accountInfo.UserName;
                showTemplate("weight-today-template", "weight-today-place", {name});
                getMeasuresHeader();
            }, timeout);

        }
    });
    router.add('/view/history', () => {
        if(!loggedin()) {
            showView('login-view');
            getMeasuresHeader();
        } else {
            showView("history-view");
            getMeasures();
        }
    });
    router.add('/view/account', () => {
        if(!loggedin()) {
            showView('login-view');
            getMeasuresHeader();
        } else {
            showView("account-view");
            getMyAccount(true);
        }
    });


    router.addUriListener();
    router.navigateTo(window.location.pathname);

    renderMenu();
}

/**
 * This function renders either logged out or logged in menu
 */
function renderMenu() {
    let logged = loggedin();
    showTemplate("menu-template", "menu-place", {loggedin: logged});
}

main();
