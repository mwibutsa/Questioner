function onReady(){
    showModal();
}
function showModal(){
    var buttons  = document.getElementsByClassName("showModal");
    var modals = document.getElementsByClassName('modal');
    var closeButtons = document.getElementsByClassName('close');

    for (var i = 0; i  < modals.length; i++) {
       (function(index){
        /* open modal button*/
            buttons[index].onclick = function(){
               modals[index].style.display = "block";
               console.log(index);
            }
            /*span as close button*/
            closeButtons[index].onclick = function(){
                modals[index].style.display = "none";
            }      
        })(i);
    }
}
function showNavigation(){
    var menu = document.getElementById('mainNav');
    menu.classList.toggle("change");
    if(menu.style.display === "block"){
        menu.style.display  ="none";
    }
    else{
        menu.style.display = "block";
    }
    
}
function sowUserNavigation(){
    var menu = document.getElementById("sideNav");
    menu.classList.toggle("change");
    if(menu.style.display === "none"){
        menu.style.display = "block";

    }
    else{
        menu.style.display = "none";
    }
}


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
    console.log(document.getElementById('signup-form'))
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
/*DOM & ANIMATIONS*/

