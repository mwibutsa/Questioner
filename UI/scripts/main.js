class User{
    constructor(firstname,lastname,otheName,email,username,phoneNumber,password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.otheName = otheName;
        this.email = email;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}
var users = [];

function registerUser(form){
    var form = document.getElementById('signup-form');
    var firstname = form.firstname.value;
    var lastname = form.lastname.value;
    var otheName = form.otherName.value;
    var email = form.email.value;
    var username = form.username.value;
    var phoneNumber = form.phoneNumber.value;
    var password = form.password.value;
    var cpassword = form.cpassword.value;
    users.push(new User(firstname,lastname,otheName,email,username,phoneNumber,password))
    console.log(users);
    return false;
}
function validate(){

}
function validatename(name,fieldName){
    var nameError = false;
    if(name == ""){
        nameError = feildName+"is required*";
        
    }
    else if(name.length <3){
        error = feildName +'can not be less than 3 characters';
    }
}
function comparePasswords(password1,password2){
    if(password1 ===  password2){
        return true;
    }
    else{
        return 'Passwords are not the same';
    }
}
function validateUsername(username){
    if(username.length < 5){
        return 'username can not have less than 5 characters';
    }
    else if(username == ""){
        return "username field is required*";
    }
}
function validateEmail(email){
    if(email == ""){
        return "Email is required*";
    }
}