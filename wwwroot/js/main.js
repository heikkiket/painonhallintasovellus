'use strict';

function main() {
    getMeasures();
    postMeasure();
    getMyAccount();
    putMyAccount();
    postNewUser();
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