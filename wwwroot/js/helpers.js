/*
  This file contains a few helper functions for this project.
  */
'use strict';

function showView(viewId, placeId) {
    let tmpl = document.getElementById(viewId).innerHTML;
    document.getElementById(placeId).innerHTML = tmpl;
}


function showTemplate(templateId, placeId, data) {
    let tmpl = document.getElementById(templateId).innerHTML;
    tmpl = tmpl.replace(/(\r\n|\n)/gm, "");
    let res = applyTemplate(tmpl, data);
    document.getElementById(placeId).innerHTML = res;
}

function fetchResult(method,endpoint,data,callback) {
    fetch(endpoint, {
        method: method,
        headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json();
        })
        .then((resdata) => {
            callback(resdata);
        });

}
