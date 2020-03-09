'use strict';

let height = 1.60;  //Hae tietokannasta!!
let startingWeight = 100;   //Hae tietokannasta!!

function getMeasures() {
    let userId = 2; //KOVAKOODATTU!!
    fetchResult('GET','/measures/'+userId,{}, function (data) {

        let prevWeight = startingWeight;
        let originalPrevWeight = startingWeight;
        let i;

        for (i = data.length - 1; i >= 0  ; i--) {

            data[i].MeasureDate = (data[i].MeasureDate.substr(0,10)).split("-").reverse().join("-");
            data[i].WeightLoss = (prevWeight - data[i].Weight).toFixed(1);  //TOIMII VÄÄRIN!!!!!!!
            data[i].TotalWeightLoss = (data[i].Weight - originalPrevWeight).toFixed(1);
            data[i].BodyIndex = (data[i].Weight / height / height).toFixed(1);

            prevWeight = data[i].Weight;
        }

        showTemplate("weight-measures-template","weight-history-place", {data: data });
    });
}
function getMeasuresHeader() {
    let userId = 2; //KOVAKOODATTU
    fetchResult('GET','/measures/'+userId,{}, function (data) {
        let originalPrevWeight = startingWeight;
        //startingWeight pitää ottaa myös huomioon!!!!

        if (data.length > 1) {
            document.getElementById("current-weight").innerHTML = data[data.length - 1].Weight + " kg";
            document.getElementById("weight-loss").innerHTML = (data[data.length - 1].Weight - data[data.length - 2].Weight).toFixed(1) + " kg";
            document.getElementById("total-weight-loss").innerHTML = (data[data.length - 1].Weight - originalPrevWeight).toFixed(1) + " kg";
            document.getElementById("body-index").innerHTML = (data[data.length - 1].Weight / height / height).toFixed(1);
            document.getElementById("still-to-lose").innerHTML = originalPrevWeight - data[data.length - 1].Weight + " kg";
        }
        else if (data.length == 1) {
            document.getElementById("current-weight").innerHTML = data[data.length - 1].Weight + " kg";
            document.getElementById("weight-loss").innerHTML = 0 + " kg";
            document.getElementById("total-weight-loss").innerHTML = 0 + " kg";
            document.getElementById("body-index").innerHTML = (data[data.length - 1].Weight / height / height).toFixed(1);
            document.getElementById("still-to-lose").innerHTML = originalPrevWeight + " kg";
        }
        else {
            document.getElementById("current-weight").innerHTML = "- kg";
            document.getElementById("weight-loss").innerHTML = "- kg";
            document.getElementById("total-weight-loss").innerHTML = "- kg";
            document.getElementById("body-index").innerHTML = "- kg";
            document.getElementById("still-to-lose").innerHTML = "- kg";
        }
    });
}

function postMeasure() {

    let form = document.forms.measureForm;
    let weight = form.elements.weightToday.value;

    let userId = window.state.userId;

    fetchResult('POST','/measures/' + userId, {weightToday: weight} , function (data) {
    });
}

function getMyAccount() {
    let userID = window.state.userId;
    fetchResult('GET','/myaccount/'+ userID,{},function (data) {
        data = data[0];
        showTemplate("account-table-template", "account-place", data);
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

