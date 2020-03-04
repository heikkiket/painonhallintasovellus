'use strict';

const router = new Router({
	  mode: 'history',
});

function main() {
    router.add('/', () => {
        showView("main-template", "app", {});
        /*getMeasures();
        postMeasure();
        getMyAccount();
        putMyAccount();
        postNewUser();*/
    });

    router.add('/login', () => {
        console.log("hello!");
    });

    router.addUriListener();
    router.navigateTo(window.location.pathname);
    window.router = router;
}

function getMeasures() {
    fetchResult('/measures/:userId', function (data) {
        let template = "<p>weight: <b><% this.Weight %></b> <% this.MeasureDate %> </p>";
        let contents = applyTemplate(template, data[0]);
        document.getElementById("app").innerHTML = contents;
    });
}

function postMeasure() {
    fetchResult('/measures/:userId', function (data) {
    });
}

function getMyAccount() {
    fetchResult('/myaccount/:userId', function (data) {
        let template = "<p>weight: <b><% this.Weight %></b> <% this.MeasureDate %> </p>";
        let contents = applyTemplate(template, data[0]);
        document.getElementById("app").innerHTML = contents;
    });
}

function putMyAccount() {
    fetchResult('/myaccount/:userId', function (data) {
    });
}

function postNewUser() {
    fetchResult('/users', function (data) {
    });
}
