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

/**
 * This is a wrapper to Fetch API
 * @param {string} method - HTTP method to use.
 * @param {string} endpoint - endpoint to reach.
 * @param {Object} data - Request body to send.
 * @param {Function} callback - Function to run when request succeeds.
 */
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

/**
 * This navigates to menu link and updates menu status
 * @param {Node} target - A DOM node target, practically a clicked a-element.
 * @param {string} path - Path to navigate to.
 */
function navigateMenu(target, path) {
    window.router.navigateTo(path);

    // Loop through menu links and remove all "active" classes
    for(const item of document.getElementById("menu-place")
              .getElementsByClassName('active')
       ) {
        item.className="";
    }

    // Insert "active class to clicked link"
    target.className="active";
}
