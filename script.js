const BASE_URL = "http://localhost:3000";
const filmSelect = document.getElementById("film-select");
const movieDetails = document.getElementById("movie-details");
const ticketsRemaining = document.getElementById("tickets-remaining");

// Populate dropdown box with movie list
function populateMovieList(films) {
  films.forEach((film) => {
    const option = document.createElement("option");
    option.value = film.id;
    option.text = film.title;
    filmSelect.add(option);
  });
}

// Get film details by ID
function getFilmDetails(filmId) {
    fetch(`${BASE_URL}/films/${filmId}`)
      .then((response) => response.json())
      .then((film) => {
        console.log(typeof film.capacity, typeof film.tickets_sold);
        // Update movie details on page
        const { title, poster, runtime, showtime, tickets_sold, capacity } = film;
        const availableTickets = parseInt(capacity) - parseInt(tickets_sold);
        movieDetails.querySelector("h2").textContent = title;
        movieDetails.querySelector("img").src = poster;
        movieDetails.querySelector("p:nth-of-type(1)").textContent = `Runtime: ${runtime} minutes`;
        movieDetails.querySelector("p:nth-of-type(2)").textContent = `Showtime: ${showtime}`;
        movieDetails.querySelector("p:nth-of-type(3)").textContent = `Available Tickets: ${availableTickets}`;
        // Update "Buy Ticket" button
        const buyButton = movieDetails.querySelector("#buy-ticket");
        buyButton.disabled = (availableTickets === 0);
        buyButton.textContent = (availableTickets === 0) ? "Sold Out" : "Buy Ticket";
      })
      .catch((error) => {
        console.error(`Error getting film details: ${error}`);
      });
  }
  
// Event listener for movie selection
filmSelect.addEventListener("change", (event) => {
  const filmId = event.target.value;
  getFilmDetails(filmId);
});
// Event listener for "Buy Ticket" button
const buyButton = movieDetails.querySelector("#buy-ticket");
buyButton.addEventListener("click", (event) => {
  const filmId = filmSelect.value;
  fetch(`${BASE_URL}/films/${filmId}/buy`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((film) => {
      // Update movie details on page
      const { tickets_sold, capacity } = film;
      const availableTickets = parseInt(capacity) - parseInt(tickets_sold);
      movieDetails.querySelector("p:nth-of-type(3)").textContent = `Available Tickets: ${availableTickets}`;
      // Update "Buy Ticket" button
      buyButton.disabled = (availableTickets === 0);
      buyButton.textContent = (availableTickets === 0) ? "Sold Out" : "Buy Ticket";
    })
    .catch((error) => {
      console.error(`Error buying ticket: ${error}`);
    });
});


// Load movie list on page load
fetch(`${BASE_URL}/films`)
  .then((response) => response.json())
  .then((films) => {
    populateMovieList(films);
    // Select first movie by default
    const firstOption = filmSelect.querySelector("option");
    const firstFilmId = firstOption.value;
    firstOption.selected = true;
    getFilmDetails(firstFilmId);
  })
  .catch((error) => {
    console.error(`Error getting movie list: ${error}`);
  });
