function editAccount() {
    let data = window.state.accountInfo;
    showTemplate("account-table-edit-template", "account-place", data);
}

function saveAccount() {
    let form = document.forms.accountEditForm;
    let name = form.elements.UserName.value;
    let height = form.elements.Height.value;
    let targetWeight = form.elements.targetWeight.value;
    data = {name, height, targetWeight};

    putMyAccount(data);
}

function drawLoginStuff() {

}
