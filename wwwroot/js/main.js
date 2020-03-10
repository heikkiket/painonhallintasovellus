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

    router.add('/', () => {
        showView("main-view");
        showTemplate("weight-today-template", "weight-today-place", {});
        getMyAccount();
        getMeasuresHeader();
    });
    router.add('/view/history', () => {
        showView("history-view");
        getMeasures();
    });
    router.add('/view/account', () => {
        showView("account-view");
        getMyAccount();
    });

    router.add('/view/login', () => {
        showView("login-view");
    });

    router.addUriListener();
    router.navigateTo(window.location.pathname);
    window.router = router;

    renderMenu();
}

function renderMenu() {
    let logged = loggedin();
    showTemplate("menu-template", "menu-place", {loggedin: logged});
}

main();
