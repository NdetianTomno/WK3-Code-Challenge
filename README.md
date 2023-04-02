# WK3-Code-Challenge

The application is meant to allow a user to select a movie title and this enables them to see all the details of the movie, including the title, runtime and the available tickets.

They can then buy a ticket, by clicking on the 'Buy Ticket' button.

The page is made responsive by first making a fetch request from the json database containing the details.
The movie details are then updated on the page. The available tickets are determined by subtracting the tickets-sold from the film capacity.

The movie selector is added an event listener to listen for a click on a movie title and respond by displaying the particular title's information.
 The event listener is also added to the buy ticket button in order to allow the user to click the button and the available tickets are updated.

 The film details are changed on the page.