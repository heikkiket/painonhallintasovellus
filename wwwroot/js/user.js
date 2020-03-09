function loginToken() {
    if (window.state.token == null) {
        if (localStorage.getItem('token') == null)
            return '';

        window.state.token = localStorage.getItem('token');
    }

    return "Bearer " + window.state.token;
}

function loggedin() {
    if(loginToken() == '')
        return false;
    else
        return true;
}

function userLogin(data) {
    window.state.token = data.token;
    window.state.userId = data.resultWithoutPassword.Id;
    localStorage.setItem('token', data.token);
    renderMenu();
    window.router.navigateTo('/');
}


function userLogout() {
    window.state.token = null;
    window.state.userId = null;
    localStorage.removeItem('token');
    renderMenu();
}

function login() {
    let form = document.forms.loginForm;
    let username = form.elements.username.value;
    let password = form.elements.password.value;
    fetch("/login",
          {method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({username, password})
          })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            userLogin(data);
        })
        .catch((error) => {
            console.log("Kirjautuminen epäonnistui");
            console.log(error);
        });
}
