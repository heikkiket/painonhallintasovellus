'use strict';

function getMeasures() {
    fetchResult('GET','/measures/:userId',{}, function (data) {
        let template = "<p>weight: <b><% this.Weight %></b> <% this.MeasureDate %> </p>";
        let contents = applyTemplate(template, data[0]);
        document.getElementById("app").innerHTML = contents;
    });
}

function postMeasure() {

    let form = document.forms.measureForm;
    let weight = form.elements.weightToday.value;
    let userId = 1;

    fetchResult('POST','/measures/' + userId, {weightToday: weight} , function (data) {
    });
}

function getMyAccount() {
    fetchResult('GET','/myaccount/:userId',{},function (data) {
        let template = "<p>weight: <b><% this.Weight %></b> <% this.MeasureDate %> </p>";
        let contents = applyTemplate(template, data[0]);
        document.getElementById("app").innerHTML = contents;
    });
}

function putMyAccount() {
    fetchResult('PUT','/myaccount/:userId', {},function (data) {
    });
}

function postNewUser() {
    fetchResult('POST','/users', {},function (data) {
    });
}
