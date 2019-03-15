$(document).ready(function() {
    

flashed_messages();



/*
Alerts modal
*/

function flashed_messages() {
	let messages = parseInt($("#messages p").length);
	if (messages) {
		$("#alerts").slideDown(1500);
		setTimeout(() => {
			$("#alerts").slideUp(1500);
		}, 7000);
	}
}
 $('#form-signin').on('submit', function() {
    
    if($('#user_password').val() == $('#user_password1').val()){
        var user = $('#username').val();
        $.ajax({
            type: 'POST',
            data: {
              user_name: $('#username').val(),
              user_email: $('#useremail').val(),  
              user_password: $('#user_password').val()
            },
            url: '/register'
          })
          .done(function(data) {
              if (data.error) {
                $('#result_pass').text(data.error)
              }
              else {
                $('#result_pass').text(data.success)
                $('#regModal').hide()
                alert("You have been registered. You can now login");
               /* let profileUrl ="/profile/<"+user +">";
                window.location.replace(profileUrl);*/
              }
          });
    } else {
        alert("passwords do not match");
    } 
        event.preventDefault();
});

function loadProfilePage(user){
    console.log(user);
     $.ajax({
            data: {
              user_name: user
            },
            url: '/profile',
            success:function(response)
               {document.write(response)}
          });
}


  $('.card-output').hide();
  $('#name_search_form').on('submit', function() {
    $.ajax({
        type: 'POST',
        data: {
          dish_name: $('#dish_name').val()
        },
        url: '/find_recipe'
      })
      .done(function(data) {
        if (data.error) {
          $('#result').text(data.error)
          $('.card-output').hide();
        }
        else {
          var array = JSON.parse(data);
          $('#result').text("this dish " + array[0].dish + " has been Found")
          $('.card-output').show();
          $('.card-title').text(array[0].dish)
          $('.author').text(array[1].author)
          $('.origin').text(array[2].origin)
          $('.type').text(array[3].type)
          $('.prep-time').text(array[4].prep_time)
          $('.cook-time').text(array[5].cook_time)
          $('.serves').text(array[6].serves)
          $('.activator').attr('src', array[7].url_image)
          let recipe_id = array[8].recipe_id;
          let url = "/show_recipe/" + recipe_id;
          $('#link').attr('href', url);
        }
      });
  
    event.preventDefault();
  });
  
  var ingredCounter = 4;
  $("#addIngredButton").click(function() {
    if (ingredCounter >= 10) {
      alert("Only 10 textboxes allow");
      return false;
    }
  
    ingredCounter++;
    var ingreddiv = document.createElement("div");
    ingreddiv.classList.add('input-field');
  
    var portiondiv = document.createElement("div");
    portiondiv.classList.add('input-field');
  
    var ingredinput = document.createElement("input");
    ingredinput.setAttribute("id", "ingredient" + ingredCounter);
    ingredinput.setAttribute("type", "text");
    ingredinput.setAttribute("class", "validate");
  
    var portioninput = document.createElement("input");
    portioninput.setAttribute("id", "portion" + ingredCounter);
    portioninput.setAttribute("type", "text");
    portioninput.setAttribute("class", "validate");
  
    var ingredlabel = document.createElement("label");
    var ingredtext = document.createTextNode("Ingredient " + ingredCounter);
    ingredlabel.setAttribute("for", "ingredient" + ingredCounter);
    ingredlabel.appendChild(ingredtext);
  
    var portionlabel = document.createElement("label");
    var portiontext = document.createTextNode("Portion " + ingredCounter);
    portionlabel.setAttribute("for", "Portion" + ingredCounter);
    portionlabel.appendChild(portiontext);
  
    var ingredbr = document.createElement("br");
    var portionbr = document.createElement("br");
    
    ingreddiv.appendChild(ingredinput);
    ingreddiv.appendChild(ingredlabel);
  
    portiondiv.appendChild(portioninput);
    portiondiv.appendChild(portionlabel);
  
    var ingredposition = document.getElementsByClassName('ingredientbox')[0];
    ingredposition.appendChild(ingreddiv);
    ingredposition.appendChild(ingredbr);
  
    var portionposition = document.getElementsByClassName('portionbox')[0];
    portionposition.appendChild(portiondiv);
    portionposition.appendChild(portionbr);
  
  });


var allergenCounter = 2;                
$("#addAlergenButton").click(function(){
  
 if (allergenCounter >= 5) {
   alert("Only 5 textboxes allow");
   return false;
 }

 allergenCounter++;
 var allergendiv = document.createElement("div");
 allergendiv.classList.add('input-field');

 var allergenInput = document.createElement("input");
 allergenInput.setAttribute("id", "allergen" + allergenCounter);
 allergenInput.setAttribute("type", "text");
 allergenInput.setAttribute("class", "validate");

 var allergenlabel = document.createElement("label");
 var allergentext = document.createTextNode("Alergen " + allergenCounter);
 allergenlabel.setAttribute("for", "allergen" + allergenCounter);
 allergenlabel.appendChild(allergentext);
 
var allergenbr = document.createElement("br");
    allergendiv.appendChild(allergenInput);
    allergendiv.appendChild(allergenlabel);
    
    var allergenposition = document.getElementsByClassName('allergenBox')[0];
    allergenposition.appendChild(allergendiv);
    allergenposition.appendChild(allergenbr);
});

var stepCounter = 4;   
$("#addStepButton").click(function(){
   if (stepCounter >= 10) {
   alert("Only 10 textboxes allow");
   return false;
 }

 stepCounter++;
 var stepdiv = document.createElement("div");
 stepdiv.classList.add('input-field');

 var stepInput = document.createElement("input");
 stepInput.setAttribute("id", "step" + stepCounter);
 stepInput.setAttribute("type", "text");
 stepInput.setAttribute("class", "validate");

 var steplabel = document.createElement("label");
 var steptext = document.createTextNode("Step " + stepCounter);
 steplabel.setAttribute("for", "step" + stepCounter);
 steplabel.appendChild(steptext);
 
var stepbr = document.createElement("br");
    stepdiv.appendChild(stepInput);
    stepdiv.appendChild(steplabel);
    
    var stepposition = document.getElementsByClassName('stepBox')[0];
    stepposition.appendChild(stepdiv);
    stepposition.appendChild(stepbr);
});
    
});