# Cuisines of the world code institute 
## Overview

The cuisines of the worild web site was set up to all people to look up recipes and also add recipes of there own. This could be used as
centrial depository  for all ones fvourite recipes.


## UX

### What is this website for?
This website was created for anyone with an interest in cooking to allow them to look up recipes based on a number of different search
criteria  example meal type, ingredients, origin, (without) allegrns etc. The user can add also add their own recipes to the website which would 
allow other users to try the recipe out. Users should also be able to 'like' othere people recipes. There will also be statistics page
that will provide information on the most popular recipes per meal type, most recipes per country.

### User Stores
This site is used by anyone looking for some new recipes ideas for cooking at home for the family or special ocassions etc.. Someone wishing to store there
favorite recipes for future use either by themself or another user on the website or someone lookin to feedback on there own recipe.

**Existing and New fans.**

* Users should be able to search recipes based on recipe name.
* Users should be able to search recipes based on counrty of orgin.
* Users should be able to search recipes based on meal type.
* Users should be able to search based on ingredents.
* Users should be able to search, discounting any recipes with certain allgerns
* Users should be able to add there own recipes
* Users should be able to like other users recipes
* Users should be able to update or delete the own recipes.
* User should be registered and have the own id.


In the design of this web page I decided to use Balsamiq to create my wire frames. I did two one for mobile and the other for desktop. Both can be seen under 
assets\wire frames folder within the project.

### How does it work

## Features
 
### Existing Features

* top of page left
    -Provides the search attributes that allows you to select country, choose type of place you are looking for and search for a city within that country.

* Google API autocomplete technology
    -As the user types in, it offers suggested cities based on the country selected i.e. if the person selected Ireland and the user typed in G to begin, 
     it would recommend cities beginning with G e.g. Galway. 
    
* top of page right
    -Displays map. Will move to country then city as selected and display the different venues in that area based on your input selection

* About
    -text that provides information on what the web site is for and how it works.
    
* Icons
    -There is a different icon used for each of the 4 different types of search regarding Hotels, Bars, Restaurants, 
     places of interest and one for showing the centre of the city. Once an icon is clicked it will provide a popup box with more information about the venue will
     show up. They will also be a website link to the venues own website. click on this and the webpage will open on a new tab.

* Contact form
    -form to allow users to submit queries or request booking through the company for any of the venue on display.

### Features Left to Implement
    -Would like to add a photo to information window related to the icon.

## Some the tech used includes:
- **HTML**, **CSS**.
  - Base languages used to create website

  - [Cloud9](https://aws.amazon.com/cloud9/)
    - We use **Cloud9** to build our web pages
  - [Google-fonts](https://fonts.google.com/m)
    - Using **Google-fonts** to get use of fonts
  - [emailjs](http://www.emailjs.com/)
    - We use **emailjs** to allow us receive e-mails with the detials once the form is submited
  - [Google-Maps](https://developers.google.com/maps/documentation/javascript/tutorial)
    - Using **Google Maps** to allow us display maps based on location and add icons for the different venues of interest.
  - [GitHub](https://github.com/)
    - Using **GitHub** a web-based hosting service for version control using Git


## Testing
### Manual testing
- All internal links have been checked and work correctly.
   - **About** link, moves to about section and hover effect works correctly
   - **Contact** link, moves to Contact section and hover effect works correctly
   - **Back to top of page** link, moves to Top section and hover effect works correctly
- Search form
    - Drop down box works as expected.
        -**Ireland** Pans Map over Ireland when selected.
        -**England** Pans Map over England when selected.
        -**Wales** Pans Map over Wales when selected.
        -**Scotland** Pans Map over Scotland when selected.
        -**N. Ireland** Pans Map over N. Ireland when selected.
    - Radio buttons work, Once the submit details button is selected.
        -**Bars** The Bar icon is dropped on the map to show the location of the bars on the area. Works as expected.
        -**Restaurants** The Restaurant icon is dropped on the map to show the location of the bars on the area. Works as expected.
        -**Hotels** The Hotel icon is dropped on the map to show the location of the bars on the area. One issued identified is except in case of smaller locations the hotel option places an icon for businesses that may not be a hotel. For cities it is okay.
        -**Tourist Attractions** The Tourist Attractions icon is dropped on the map to show the location of the bars on the area. Works as expected.
    - Search input box and Autocomplete work as expected (Could not narrow autocomplete to country level, only as go as low as UK. That is why you get English 
      cities proposed even if you had selected Wales, Northern Ireland or Scotland as your country). if city left blank will get error message on screen.
    - Submit button works as expected. Pans to city location and drops icons based on type selected. If no venues of that type available, then will receive error message

- Contact form tests. All work as expected
    - Name is a required field, error message displayed if left blank.
    - email is required field, error message displayed if left blank.
    - details is a required field, error message displayed if left blank.
    - Submit Button clears the screen.
    
- Site viewed and tested in the following browsers (all work as expected):
  - Google Chrome
  - Mozilla Firefox    
  - Opera

### Automatic testing
- I tested two functions **moveCenterToCapital()** and **SetCountrySelected()** out of eight because there was significant logic in the two functions I choose.
- If had more time would have like to tested the API calls.

### Site has been tested on mobile, tablet and laptop devices as well as testing on chrome for the different sizes.

### Navbar: 
- Stays the same for all devices

### Main page
- On small screen the map displays under the search form. On larger screen it is displayed at the right hand side of the search form
- The about section and the Contact section stay the same on all screens i.e. the contact form will display under the about section.

### Footer 
- Stays the same for all devices


# Deployment

This web site is deployed on the GitHub platform.
https://johnmellaley.github.io/my-second-project/

# Credits

# Media
## Photos       
### Image background on search form   
- travel.png was obtained from www.freepik.com
- plane.png was obtained from www.flaticon.com 
