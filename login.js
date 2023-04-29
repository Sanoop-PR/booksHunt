userDetails = {}
function saveData(){
    if (userDetails) {
        localStorage.setItem("database",JSON.stringify(userDetails))
    }
}
function getData(){
    userDetails = JSON.parse(localStorage.getItem('database'))
}
function register(){
    let uName =regUname.value;
    let pswd = regPswd.value;

    if (uName && pswd) {
        //verify username is in userDetails
        if (uName in userDetails) {
            //present
            output.innerHTML = "User already exist.. please log in "
        } else {
            //not present
            userDetails[uName] = {username:uName,password:pswd}
            saveData()
            alert("Register successfully")
            //redirect to login page
            window.location = "login.html"
        }
    } else {
        output.innerHTML = "please enter valid input"
    }
}
function login(){
    let username = loginUname.value
    let pswd = loginPswd.value
    getData();
    if (username && pswd) {
        if (username in userDetails) {
            if (pswd == userDetails[username].password) {
                //store username in local storage
                localStorage.setItem('user',username)
                alert('login success')
                window.location = 'index.html'
            } else {
                output.innerHTML = "incorrect password"
                // alert('incorrect password')
            }
        } else {
            output.innerHTML = "incorrect username"
            // alert('incorrect username')
        }
    } else {
        output.innerHTML = "please enter valid input"
    }
}




function logout(){
    localStorage.removeItem('user')

    window.location = 'login.html'
}