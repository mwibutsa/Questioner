function onReady(){
    showModal();
    
}
function toggleCommentForm(){
    var toggleButton = document.getElementsByClassName('comment-toggle');
    var commentForm = document.getElementsByClassName('comment');
    for(i = 0; i< toggleButton.length; i++){
        (function(index){
            toggleButton[index].onclick = function(){
                commentForm[index].classList.toggle('show-comment');
            }
        })(i);

    }
}
function showModal(){
    var buttons  = document.getElementsByClassName("toggle-reserve-form");
    var modal = document.getElementById('modal-container');
    var closeButton = document.getElementsByClassName('close')[0];
    for(i = 0; i <buttons.length; i++){
        buttons[i].onclick = function() {
            modal.style.display = "block";
        }
    }
   closeButton.onclick = function() {
       modal.style.display = "none";
   }
   window.onclick = function(params) {
       if(params.target === modal){
           modal.style.display = "none";
       }
   }
}

function showNavigation(){
    var menu = document.getElementById('mainNav');
    menu.classList.toggle("change");
}
function sowUserNavigation(){
    var menu = document.getElementById("sideNav");
    menu.classList.toggle("change");


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
    return false;
}



