'use strict';

const router = new Router({
	  mode: 'history',
});

const state = {
    userId: null,
    currentWeight: null,
    height: null,
    targetWeight: null,
    token: null,
    accountInfo: {}
};

window.state = state;

function main() {

    window.router = router;

    router.add('/view/login', () => {
        showView("login-view");
    });

    router.add('/', () => {
        if(!loggedin()) {
            showView('login-view');
        } else {
            showView("main-view");

            let name = window.state.accountInfo.UserName;
            showTemplate("weight-today-template", "weight-today-place", {name});
            getMyAccount();
            getMeasuresHeader();
        }
    });
    router.add('/view/history', () => {
        if(!loggedin()) {
            showView('login-view');
        } else {
            showView("history-view");
            getMeasures();
        }
    });
    router.add('/view/account', () => {
        if(!loggedin()) {
            showView('login-view');
        } else {
            showView("account-view");
            getMyAccount();
        }
    });


    router.addUriListener();
    router.navigateTo(window.location.pathname);

    renderMenu();
}

function renderMenu() {
    let logged = loggedin();
    showTemplate("menu-template", "menu-place", {loggedin: logged});
}

main();
