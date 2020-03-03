'use strict';

const router = new Router({
	  mode: 'history',
});

function main() {
	  router.add('/', () => {
        showTemplate("main-template", "app", {});
        //getMeasures();
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

function getMeasures() {
    fetchResult('/measures/:userId', function (data) {
        let template = "<p>weight: <b><% this.Weight %></b> <% this.MeasureDate %> </p>";
        let contents = applyTemplate(template, data[0]);
        document.getElementById("app").innerHTML = contents;
    });
}
