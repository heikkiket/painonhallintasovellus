/*
  This file contains a few helper functions for this project.
  */
'use strict';

function showView(viewId) {
    let tmpl = document.getElementById(viewId).innerHTML;
    document.getElementById("app").innerHTML = tmpl;
}


function showTemplate(templateId, placeId, data) {
    let tmpl = document.getElementById(templateId).innerHTML;
    tmpl = tmpl.replace(/(\r\n|\n)/gm, "");
    let res = applyTemplate(tmpl, data);
    document.getElementById(placeId).innerHTML = res;
}

function fetchResult(method,endpoint,data,callback) {
    let init = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    init.headers.Authorization = loginToken();

    if (method != 'GET') {
        init.body = JSON.stringify(data);
    }
    fetch(endpoint, init)
        .then((response) => {
            return response.json();
        })
        .then((resdata) => {
            callback(resdata);
        });

}

function navigateMenu(target, path) {
    window.router.navigateTo(path);

    for(const item of document.getElementById("menu-place")
              .getElementsByClassName('active')
       ) {
        item.className="";
    }

    target.className="active";
}
