'use strict';

const router = new Router({
	  mode: 'history',
});

function main() {
    router.add('/', () => {
    showTemplate("main-template", "app", {});
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

function showTemplate(templateId, placeId) {
    let tmpl = document.getElementById(templateId).innerHTML;
    document.getElementById(placeId).innerHTML = tmpl;
}

function fetchResult(endpoint,callback) {
    fetch(endpoint)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        });
}

