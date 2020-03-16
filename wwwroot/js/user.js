/**
 * Return either valid 'Authorization' header content or an empty string
 */
function loginToken() {
    if (window.state.token == null) {
        window.state.userId = localStorage.getItem('userId');
        if (localStorage.getItem('token') == null)
            return '';

        window.state.token = localStorage.getItem('token');
    }

    return "Bearer " + window.state.token;
}

/**
 * This function is used as boolean variable: is user logged in? 
 */
function loggedin() {
    if(loginToken() == '')
        return false;
    else
        return true;
}

/**
 * This function is executed if login was succesful. It saves login
 * token to application state and to the local storage.
 */
function userLogin(data) {
    window.state.token = data.token;
    window.state.userId = data.resultWithoutPassword.Id;
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.resultWithoutPassword.Id);
    renderMenu();
    window.router.navigateTo('/');
}

/**
 * Remove login token from state and from local storage.
 */
function userLogout() {
    window.state.token = null;
    window.state.userId = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    renderMenu();
    router.navigateTo('/');
}

/**
 * Handle user login.
 * TODO: Write proper error handling.
 */
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
