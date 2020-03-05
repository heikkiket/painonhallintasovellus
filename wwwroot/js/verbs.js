'use strict';

let height = 160;

function getMeasures() {
    console.log("Sisällä");
    let userId = 2;
    fetchResult('GET','/measures/'+userId,{}, function (data) {

        console.log("length" + data.length);
        console.log(data);
        let curWeight = data[data.length-1].Weight;
        let prevWeight = data[data.length-2].Weight;
        console.log("Weight" + data[0].Weight);
        let loss = prevWeight - curWeight;
        let totalLoss = data[0].Weight - curWeight;
        let bIndex = curWeight / height / height;
        let dat = {data: data};
        //let dat = {loss: loss, tLoss: totalLoss, index: bIndex, data: data};
    console.log(data);
        showTemplate("weight-measures-template","weight-history-place", {data: data });

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
        console.log(data);
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
