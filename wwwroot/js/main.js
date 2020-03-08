'use strict';

const router = new Router({
	  mode: 'history',
});

const state = {
    userId: 1,
    currentWeight: 58.9,
    weightLoss: 4,
    previousWeight:60,
    bodyIndex:26,
    stillToLose:39.9
};

window.state = state;

function main() {
    router.add('/', () => {
        showView("main-view", "app", {});
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
        showView("search-view", "app", {});
    });
    router.add('/view/history', () => {
        showView("history-view", "app", {});
    });
    router.add('/view/account', () => {
        showView("account-view", "app", {});
        getMyAccount();
    });

    router.add('/login', () => {
        console.log("hello!");
    });

    router.addUriListener();
    router.navigateTo(window.location.pathname);
    window.router = router;
}
