'use strict';

function getMeasures() {
    let userId = window.state.userId;
    fetchResult('GET','/measures/'+userId,{}, function (data) {
        let results = countResults(data);

        showTemplate("weight-measures-template","weight-history-place", {data: results.data });
    });
}
function getMeasuresHeader() {
    let userId = window.state.userId;
    fetchResult('GET','/measures/'+userId,{}, function (data) {
        let results = countResults(data);
        
        let {last,beforeLast,first} = results;

        let loss = (last.Weight - beforeLast.Weight).toFixed(1);
        if (loss >= 0) {
            loss = "+" + (last.Weight - beforeLast.Weight).toFixed(1);
        }
        let displayData = {
            currentWeight: last.Weight,
            weightLoss: loss,
            totalWeightLoss: (last.Weight - first.Weight).toFixed(1),
            prevWeight: beforeLast.Weight,
            bodyIndex: bodyIndex(last.Weight,window.state.height).toFixed(1),
            stillToLose: (last.Weight - window.state.targetWeight).toFixed(1)
        };

        showTemplate("weight-header-template","weight-header-place",displayData);
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
        window.state.accountInfo = data;
        window.state.height = data.Height;
        window.state.targetWeight = data.TargetWeight;
        showTemplate("account-table-template", "account-place", data);
    });
}

function putMyAccount(data) {
    let userId = window.state.userId;
    fetchResult('PUT','/myaccount/' + userId, data, function (data) {
        // Fetch new stuff after inserting
        getMyAccount();
    });
}

function postNewUser() {
    fetchResult('POST','/users', {},function (data) {
    });
}

function bodyIndex(weight, height) {
    return weight / height / height;
}

function countResults(data) {
    let stack = data;

    let last = data[data.length-1];
    let beforeLast = last;
    let first = last;

    if (stack.length > 1) {
        beforeLast = data[data.length-2];
        first = beforeLast;
    }
    if (stack.length > 2) {
        first = data[0];
    }

    window.state.currentWeight = last.Weight;
    let prevWeight = first.Weight;

    let i;
    for (i = data.length - 1; i >= 0  ; i--) {

        data[i].MeasureDate = new Date(data[i].MeasureDate);

        data[i].WeightLoss = data[i].Weight - prevWeight;
        data[i].WeightLoss = data[i].WeightLoss.toFixed(1);
        if (data[i].WeightLoss >= 0) {
            data[i].WeightLoss = "+" + (data[i].Weight - prevWeight).toFixed(1);
        }
        data[i].TotalWeightLoss = data[i].Weight - first.Weight;
        data[i].BodyIndex = bodyIndex(data[i].Weight,window.state.height);

        data[i].TotalWeightLoss = data[i].TotalWeightLoss.toFixed(1);
        data[i].BodyIndex = data[i].BodyIndex.toFixed(1);
        data[i].MeasureDate = data[i].MeasureDate.toLocaleDateString();
        prevWeight = data[i].Weight;
    }
    return {last, beforeLast, first, data};
}
