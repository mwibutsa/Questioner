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
/**
 * SLIDE SHOW JAVASCRIPT
 */

 /**SHOW SLIDES */
 var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var bars = document.getElementsByClassName("bars");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < bars.length; i++) {
      bars[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  bars[slideIndex-1].className += " active";
} 

