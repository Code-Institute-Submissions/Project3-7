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
     $('#result_pass').text("")
    if($('#user_password').val() == $('#user_password1').val()){
        var user = $('#username').val();
        $.ajax({
            type: 'POST',
            data: {
              user_name: $('#username').val(),
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
        $('#result_pass').text("passwords do not match");
    } 
        event.preventDefault();
});

$('#ingredientForm').on('submit', function () {
    event.preventDefault();
    var txt;
    var i;
    var len;
    var ingred1 = $('#ingredient1').val()
    var ingred2 = $('#ingredient2').val()
     $.ajax({
            type: 'POST',
            data: {
              ingred1: ingred1,
              ingred2: ingred2
            },
            url: '/ingred_filter'
          })
          .done(function(data) {
               if (data.error) {
                $('result').text(data.error)
                $('.card').hide(); }
               else {
                    $('.card').show(); 
                    var array = JSON.parse(data);
                    console.log(array);
                    len = array.length;
                    for (i=0; i<len; i++) {
                        var rowdiv = document.createElement("div");
                        rowdiv.classList.add('row');
                        var coldiv = document.createElement("div");
                        coldiv.classList.add('col','s12','m3','l3');
                        var carddiv = document.createElement("div");
                        carddiv.classList.add('card');
                        var imagediv = document.createElement("div");
                        imagediv.classList.add('card-image','waves-effect','waves-block','waves-light');
                        var imagetag = document.createElement('img');
                        imagetag.classList.add('activator');
                        imagetag.setAttribute("src", array[i].url_image);
                        var contentdiv = document.createElement('div');
                        contentdiv.classList.add('card-content');
                        var cardspan = document.createElement('span');
                        cardspan.classList.add('card-title','grey-text','text-darken-4');
                        cardspan.innerHTML = array[i].dish_name;
                        var acard =document.createElement('a');
                        acard.classList.add('link');
                        acard.innerHTML= "Cooking instructions";
                        acard.setAttribute("href","/show_recipe"+ array[i]._id);
                        var icard =document.createElement('i');
                        icard.classList.add('activator', 'material-icons', 'right','tooltipped');
                        var cardposition = document.getElementsByClassName('result')[0]; 
                        cardposition.appendChild(rowdiv);
                        rowdiv.appendChild(coldiv);
                        coldiv.appendChild(carddiv);
                        carddiv.appendChild(imagediv);
                        imagediv.appendChild(imagetag);
                        carddiv.appendChild(contentdiv);
                        contentdiv.appendChild(cardspan);
                        contentdiv.appendChild(acard);
                        contentdiv.appendChild(icard);
                    }
               }
          });
    });
});

/*
<section class="card-output"> done
      <div class="col s12 m6 l4"> done
        <div class="card" > done
          <div class="card-image waves-effect waves-block waves-light"> done
            <img class="activator" src=""> no
          </div>
        <div class="card-content">done
            <span class="card-title grey-text text-darken-4"></span> no
            <a id="link" href="#">Cooking Instructions</a>no
            <i class="activator material-icons right tooltipped" data-position="bottom" data-tooltip="Details">add</i>no
        </div>
        
        
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">yesy<i class="material-icons right">close</i></span>
          <div class="back-card-jm">
            <i class=" tiny material-icons">face</i><strong>Author:</strong> <span class ="author"></span></br>
            <i class="fas fa-globe"></i> <strong>Origin: </strong> <span class = "origin"></span></br>
            <i class="fas fa-pizza-slice"></i> <strong>Type:</strong> <span class = "type"></span> </br>
            <i class="far fa-clock"></i> <strong>Prep Time: </strong> <span class = "prep-time"></span></br>
            <i class="far fa-clock"></i> <strong>Cooking Time: </strong> <span class = "cook-time"></span></br>
            <i class=" tiny material-icons">people</i> <strong>Services: </strong> <span class = "serves"></span>  </br>
            <i class="fas fa-heart"></i> <strong>Rating: </strong> <span class = "rating"></span> </br>
          </div>
        </div>
      </div>
    </section> */


$('#origintype_search_form').on('submit', function () {
    event.preventDefault();
    var filter_type = $('#filter_type').val()
    var country = $('#country').val() 
    $.ajax({
            type: 'POST',
            data: {
              type: filter_type,
              origin: country 
            },
            url: '/filter_search'
          })
          .done(function(data) {
              var array = JSON.parse(data);
              console.log(array);
              $('#attresult').text("this dish " + array[0]+ " has been Found")
          });
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
    /*      $('.card-title').text(array[0].dish)
          $('.author').text(array[1].author)
          $('.origin').text(array[2].origin)
          $('.type').text(array[3].type)
          $('.prep-time').text(array[4].prep_time)
          $('.cook-time').text(array[5].cook_time)
          $('.serves').text(array[6].serves)
          $('.activator').attr('src', array[7].url_image)
          let recipe_id = array[8].recipe_id;
          let url = "/show_recipe/" + recipe_id;
          $('#link').attr('href', url); */
            console.log(array);
            var i;
            var len = array.length;
            
                var coldiv = document.createElement("div");
                coldiv.classList.add('col','s12','m6','l4');
                var carddiv = document.createElement("div");
                carddiv.classList.add('card');
                var imagediv = document.createElement("div");
                imagediv.classList.add('card-image','waves-effect','waves-block','waves-light');
                var imagetag = document.createElement('img');
                imagetag.classList.add('activator');
                var contentdiv = document.createElement('div');
                contentdiv.classList.add('card-content');
                var cardspan = document.createElement('span');
                cardspan.classList.add('card-title','grey-text','text-darken-4');
                console.log(array[i].dish_name);
              /*  cardspan.innerHTML = array('dish_name');*/
                var acard =document.createElement('a');
                acard.classList.add('link');
                var icard =document.createElement('i');
                icard.classList.add('activator', 'material-icons', 'right','tooltipped');
                var cardposition = document.getElementsByClassName('result')[0];
                cardposition.appendChild(coldiv);
                coldiv.appendChild(carddiv);
                carddiv.appendChild(imagediv);
                imagediv.appendChild(imagetag);
                cardposition.appendChild(contentdiv);
                contentdiv.appendChild(cardspan);
                contentdiv.appendChild(acard);
                contentdiv.appendChild(icard);
        
        }
    });
    event.preventDefault();
});
$("#likesButton").click(function() {
    
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
    ingredinput.setAttribute("name", "ingredient" + ingredCounter);
  
    var portioninput = document.createElement("input");
    portioninput.setAttribute("id", "portion" + ingredCounter);
    portioninput.setAttribute("type", "text");
    portioninput.setAttribute("class", "validate");
    portioninput.setAttribute("name", "portion" + ingredCounter);
  
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
 allergenInput.setAttribute("name", "allergen" + allergenCounter);

 var allergenlabel = document.createElement("label");
 var allergentext = document.createTextNode("Allergen " + allergenCounter);
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
 stepInput.setAttribute("name","step" + stepCounter );
 
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
