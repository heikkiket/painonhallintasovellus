'use strict';

function main() {
    getMeasures();
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
    fetchResult('/measures', function (data) {
        let template = "<p>weight: <b><% this.Weight %></b> <% this.MeasureDate %> </p>";
        let contents = applyTemplate(template, data[0]);
        document.getElementById("app").innerHTML = contents;
    });
}