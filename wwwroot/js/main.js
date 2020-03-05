'use strict';

const router = new Router({
	  mode: 'history',
});

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
    });
    router.add('/view/search', () => {
        showView("search-view", "app", {});
    });
    router.add('/view/history', () => {
        showView("history-view", "app", {});
    });
    router.add('/view/account', () => {
        showView("account-view", "app", {});
    });

    router.add('/login', () => {
        console.log("hello!");
    });

    router.addUriListener();
    router.navigateTo(window.location.pathname);
    window.router = router;
}
