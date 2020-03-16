function editAccount() {
    let data = window.state.accountInfo;
    showTemplate("account-table-edit-template", "account-place", data);
}

function saveAccount() {
    let form = document.forms.accountEditForm;
    let name = form.elements.UserName.value;
    let height = form.elements.Height.value;
    let startingWeight = form.elements.StartingWeight.value;
    let targetWeight = form.elements.TargetWeight.value;
    data = {name, height, targetWeight, startingWeight};

    putMyAccount(data);
}
