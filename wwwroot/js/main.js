'use strict';

const router = new Router({
	  mode: 'history',
});

const state = {
    userId: null,
    currentWeight: 58.9,
    weightLoss: 4,
    previousWeight: 60,
    bodyIndex:26,
    stillToLose:39.9,
    token: null
};

window.state = state;

function main() {

    router.add('/', () => {
        showView("main-view");
        showTemplate("weight-today-template", "weight-today-place", {});
        /*getMeasures();
        postMeasure();*/
        getMyAccount();
        /*putMyAccount();
        postNewUser();*/
        getMeasures();
        getMeasuresHeader();
    });
    router.add('/view/search', () => {
        showView("search-view");
    });
    router.add('/view/history', () => {
        showView("history-view");
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
