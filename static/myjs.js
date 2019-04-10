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
                let profileUrl ="/profile";
                window.location.replace(profileUrl);
              }
          });
    } else {
        $('#result_pass').text("passwords do not match");
    } 
        event.preventDefault();
});


$("#likesButton").click(function() {
    var title = document.getElementById("show_title");
    var this_dish_name = title.firstChild.nodeValue;
    $.ajax({
            type: 'POST',
            data: {
              dish_name: this_dish_name
            },
            url: '/likes'
          })
          .done(function(data) {
              if(data.success) {
                  $(".wrap").fadeOut(100).fadeIn(100);
                  $(".votes").text(data.likes);
              } else if(data.error)
              { 
                alert("error"+data.error);
              }
          });
});

$('#name_search_form').on('submit', function() {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        data: {
          dish_name: $('#dish_name').val()
        },
        url: '/find_recipe'
      })
      .done(function(data) {
        if (data.error) {
            $('#result_message').text(data.error)
            clearSearchReults();
            }
            else {
                $('#result_message').text("Here is the result of your search")
                clearSearchReults();
                var array = JSON.parse(data);
                console.log(array);
                createHTMLSearch(array);
                }
          });
    });
    
});


$('#ingredientForm').on('submit', function () {
    event.preventDefault();
    var ingred1 = $('#ingredient1').val()
    var ingred2 = $('#ingredient2').val()
    var allergen1 = $('#allergen1').val()
     $.ajax({
            type: 'POST',
            data: {
              ingred1: ingred1,
              ingred2: ingred2,
              allergen1: allergen1
            },
            url: '/ingred_filter'
          })
          .done(function(data) {
               if (data.error) {
                $('#result_message').text(data.error)
                clearSearchReults();
                }
               else {
                    $('#result_message').text("Here is the result of your search")
                    clearSearchReults();
                    var array = JSON.parse(data);
                    console.log(array);
                    createHTMLSearch(array);
                    }
          });
});




$('#origintype_search_form').on('submit', function () {
    event.preventDefault();
    var filter_type = $('#filter_type').val()
 /*   if (filter_type ="Choose your option"){
        alert("PLease choose your type");
    }*/
    var country = $('#country').val() 
  /*  if (country ="Choose your option"){
        alert("PLease choose your Country");
    }*/
    $.ajax({
            type: 'POST',
            data: {
              type: filter_type,
              origin: country 
            },
            url: '/filter_search'
          })
          .done(function(data) {
              if(data.error) {
                  $('#result_message').text(data.error)
                  clearSearchReults();
              } else
              { $('#result_message').text("Here is the result of your search")
              var array = JSON.parse(data);
              console.log(array);
              clearSearchReults();
              createHTMLSearch(array);
              }
          });
});

$('.card-output').hide();
  


function clearSearchReults(){
var myNode = document.getElementsByClassName("searchresult")[0];
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function createHTMLSearch(array){
    var len = array.length;
    var j=0;
    for (var i=0; i<len; i++) {
        if(j==0 || j/3==0){
            var rowdiv = document.createElement("div");
            rowdiv.classList.add('row');
        }
        j++;
        var coldiv = document.createElement("div");
        coldiv.classList.add('col','s12','m6','l4');
        var carddiv = document.createElement("div");
        carddiv.classList.add('card','small');
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
        var link = JSON.stringify(array[i]._id);
        acard.setAttribute("href","/show_recipe"+ link);
        var icard =document.createElement('i');
        icard.classList.add('activator', 'material-icons', 'right','tooltipped');
        icard.setAttribute('data-position','bottom');
        icard.setAttribute('data-tooltip','Details');
        icard.innerHTML = "add";
        var cardposition = document.getElementsByClassName('searchresult')[0]; 
        cardposition.appendChild(rowdiv);
        rowdiv.appendChild(coldiv);
        coldiv.appendChild(carddiv);
        carddiv.appendChild(imagediv);
        imagediv.appendChild(imagetag);
        carddiv.appendChild(contentdiv);
        contentdiv.appendChild(cardspan);
        contentdiv.appendChild(acard);
        contentdiv.appendChild(icard);
        
        var revealdiv = document.createElement("div");
        revealdiv.classList.add("card-reveal");
        carddiv.appendChild(revealdiv);
        
        var cardspanback = document.createElement('span');
        cardspanback.classList.add('card-title','grey-text','text-darken-4');
        cardspanback.innerHTML = array[i].dish_name;
        revealdiv.appendChild(cardspanback);
        var iclose = document.createElement("i");
        iclose.classList.add("material-icons","right");
        iclose.innerHTML ="close";
        cardspanback.appendChild(iclose);
        
        var backcarddiv = document.createElement('div');
        backcarddiv.classList.add("back-card-jm");
        revealdiv.appendChild(backcarddiv);
        
        var strongface= document.createElement("strong");
        strongface.innerHTML = "Author: "+ array[i].user_name ;
        var strongorigin= document.createElement("strong");
        strongorigin.innerHTML= "Origin: "+ array[i].origin;
        
        var strongtype= document.createElement("strong");
        strongtype.innerHTML="type: "+ array[i].type;
        
        var strongprep= document.createElement("strong");
        strongprep.innerHTML="Prep Time: "+ array[i].prep_time;
        
        var strongcook= document.createElement("strong");
        strongcook.innerHTML= "Cook Time: "+ array[i].cook_time;
        var strongserves= document.createElement("strong");
        strongserves.innerHTML= "Serves: "+ array[i].serves;
        var strongrating= document.createElement("strong");
        strongrating.innerHTML="Rating: "+ array[i].likes;
        var iface =document.createElement("i");
        iface.classList.add("tiny", "material-icons");
        iface.innerHTML = "face";
        
     
        var itype =document.createElement("i");
        itype.classList.add("fas", "fa-pizza-slice");
        
        var iorigin =document.createElement("i");
        iorigin.classList.add("fas","fa-globe");
       
        var iprep =document.createElement("i");
        iprep.classList.add('far', 'fa-clock');
        
        var icook =document.createElement("i");
        icook.classList.add('far', 'fa-clock');
        
        var iserves =document.createElement("i");
        iserves.classList.add("tiny", "material-icons");
        iserves.innerHTML= "people";
        
        var irating =document.createElement("i");
        irating.classList.add("fas", "fa-heart");
        
        
        var mybr = document.createElement('br');
        strongface.appendChild(mybr);
        strongorigin.appendChild(mybr.cloneNode());
        strongtype.appendChild(mybr.cloneNode());
        strongprep.appendChild(mybr.cloneNode());
        strongcook.appendChild(mybr.cloneNode());
        strongserves.appendChild(mybr.cloneNode());
        strongrating.appendChild(mybr.cloneNode());
        
        backcarddiv.appendChild(iface);
        backcarddiv.appendChild(strongface);
        backcarddiv.appendChild(iorigin);
        backcarddiv.appendChild(strongorigin);
        backcarddiv.appendChild(itype);
        backcarddiv.appendChild(strongtype);
        backcarddiv.appendChild(iprep);
        backcarddiv.appendChild(strongprep);
        backcarddiv.appendChild(icook);
        backcarddiv.appendChild(strongcook);
        backcarddiv.appendChild(iserves);
        backcarddiv.appendChild(strongserves);
        backcarddiv.appendChild(irating);
        backcarddiv.appendChild(strongrating);
        
    }
}

var ingredCounter = 4;
$("#addIngredButton").click(function() {
    if (ingredCounter > 10) {
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

var updateIngredCounter = 10;
$("#updateAddIngredButton").click(function() {
    if (updateIngredCounter > 12) {
      alert("Only 2 extra textboxes allowed for an");
      return false;
    }
    updateIngredCounter++;
    var ingreddiv = document.createElement("div");
    ingreddiv.classList.add('input-field');
  
    var portiondiv = document.createElement("div");
    portiondiv.classList.add('input-field');
  
    var ingredinput = document.createElement("input");
    ingredinput.setAttribute("id", "ingredient" + updateIngredCounter);
    ingredinput.setAttribute("type", "text");
    ingredinput.setAttribute("class", "validate");
    ingredinput.setAttribute("name", "ingredient" + updateIngredCounter);
  
    var portioninput = document.createElement("input");
    portioninput.setAttribute("id", "portion" + updateIngredCounter);
    portioninput.setAttribute("type", "text");
    portioninput.setAttribute("class", "validate");
    portioninput.setAttribute("name", "portion" + updateIngredCounter);
    
    var ingredlabel = document.createElement("label");
    var ingredtext = document.createTextNode("Extra Ingredient");
    ingredlabel.setAttribute("for", "ingredient" + updateIngredCounter);
    ingredlabel.appendChild(ingredtext);
  
    var portionlabel = document.createElement("label");
    var portiontext = document.createTextNode("Exra Portion ");
    portionlabel.setAttribute("for","Portion" + ingredCounter);
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
  
 if (allergenCounter > 5) {
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



var updateAllergenCounter = 5;                
$("#updateAddAlergenButton").click(function(){
  
 if (updateAllergenCounter >= 7) {
   alert("Only 2 extra textboxes allowed");
   return false;
 }

 updateAllergenCounter++;
 var allergendiv = document.createElement("div");
 allergendiv.classList.add('input-field');

 var allergenInput = document.createElement("input");
 allergenInput.setAttribute("id", "allergen" + updateAllergenCounter);
 allergenInput.setAttribute("type", "text");
 allergenInput.setAttribute("class", "validate");
 allergenInput.setAttribute("name", "allergen" + updateAllergenCounter);

 var allergenlabel = document.createElement("label");
 var allergentext = document.createTextNode("extra Allergen");
 allergenlabel.setAttribute("for", "allergen" + updateAllergenCounter);
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
   if (stepCounter >= 9) {
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


var updateStepCounter = 8;   
$("#updateAddStepButton").click(function(){
   if (updateStepCounter >= 11) {
   alert("Only 3  EXTRA textboxes allow");
   return false;
 }

 updateStepCounter++;
 var stepdiv = document.createElement("div");
 stepdiv.classList.add('input-field');

 var stepInput = document.createElement("input");
 stepInput.setAttribute("id", "step" + updateStepCounter);
 stepInput.setAttribute("type", "text");
 stepInput.setAttribute("class", "validate");
 stepInput.setAttribute("name","step" + updateStepCounter );
 
 var steplabel = document.createElement("label");
 var steptext = document.createTextNode("Extra Step");
 steplabel.setAttribute("for", "step" + updateStepCounter);
 steplabel.appendChild(steptext);
 
var stepbr = document.createElement("br");
    stepdiv.appendChild(stepInput);
    stepdiv.appendChild(steplabel);
    
    var stepposition = document.getElementsByClassName('stepBox')[0];
    stepposition.appendChild(stepdiv);
    stepposition.appendChild(stepbr);
});

