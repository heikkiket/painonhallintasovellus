'use strict';

let height = 1.60;  //Hae tietokannasta!!
let startingWeight = 100;   //Hae tietokannasta!!

function getMeasures() {
    let userId = 2;
    fetchResult('GET','/measures/'+userId,{}, function (data) {

        console.log("length" + data.length);
        console.log("data" + data);

        let prevWeight = startingWeight;
        let originalPrevWeight = startingWeight;
        let i;

        for (i = data.length - 1; i >= 0  ; i--) {

            data[i].MeasureDate = (data[i].MeasureDate.substr(0,10)).split("-").reverse().join("-");
            data[i].WeightLoss = (prevWeight - data[i].Weight).toFixed(1);
            data[i].TotalWeightLoss = (originalPrevWeight - data[i].Weight).toFixed(1);
            data[i].BodyIndex = (data[i].Weight / height / height).toFixed(1);

            prevWeight = data[i].Weight;
        }

        console.log(data);
        showTemplate("weight-measures-template","weight-history-place", {data: data });

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

