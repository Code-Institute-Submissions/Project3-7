$(document).ready(function() {
  $('.card-output').hide();
  $('form').on('submit', function() {
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
  
 
    
});