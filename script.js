// Function to fetch movie data from the OMDB API
    async function fetchMovieData(movieName) {
      try {
        const apiKey = 'df006870'; // Provided API key
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`);
        const data = await response.json();

        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        return data;
      } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
      }
    }

    // Function to handle the movie search event
    async function handleMovieSearch() {
      const searchBox = document.getElementById('movie-search-box');
      const movieName = searchBox.value.trim();

      if (movieName === '') {
        return;
      }

      const movieData = await fetchMovieData(movieName);

      if (movieData) {
        updateMovieDetails(movieData);
      }
    }

    function showFavouriteOffcanvas() {
  const offcanvasBody = document.querySelector('.offcanvas-body');
  offcanvasBody.innerHTML = ''; // Clear previous content

  const pTag = document.createElement('p');
  pTag.style.color = 'black'; // Change text color if needed

  if (favoriteMoviesArray.length === 0) {
    pTag.textContent = 'No favorite movies added yet.';
  } else {
    pTag.textContent = 'Favorite Movies:';
    const ul = document.createElement('ul');

    favoriteMoviesArray.forEach((movieData) => {
      const li = document.createElement('li');
      li.textContent = movieData.Title; // You can change this to display any other movie information
      ul.appendChild(li);
    });

    pTag.appendChild(ul);
  }

  offcanvasBody.appendChild(pTag);
}

    const favoriteMoviesArray = [];
    // Function to update the movie details on the page
    function updateMovieDetails(movieData) {
      const resultGrid = document.getElementById('result-grid');

      // Clear previous movie details
      resultGrid.innerHTML = '';

      // Create elements to display movie details
      const moviePoster = document.createElement('div');
      moviePoster.className = 'movie-poster';
      const posterImg = document.createElement('img');
      posterImg.src = movieData.Poster;
      posterImg.alt = 'Movie Poster';
      moviePoster.appendChild(posterImg);

      const movieInfo = document.createElement('div');
      movieInfo.className = 'movie-info';
      movieInfo.innerHTML = `
        <h3 class="movie-title">${movieData.Title}</h3>
        <ul class="movie-misc-info">
          <li class="year">Year: ${movieData.Year}</li>
          <li class="rated">Ratings: ${movieData.Rated}</li>
          <li class="released">Released: ${movieData.Released}</li>
        </ul>
        <p class="genre"><b>Genre: ${movieData.Genre}</b></p>
        <p class="writer">Director: ${movieData.Director}</p>
        <p class="plot">${movieData.Plot}</p>
        <button id="add-favourite-button">Add Favourite</button>
      `;

      // Append movie details to the result grid
      resultGrid.appendChild(moviePoster);
      resultGrid.appendChild(movieInfo);

      const addFavouriteButton = document.getElementById('add-favourite-button');
      const refreshButton = document.getElementById('add-favourite-button'); 
      // Replace with the actual ID of your button
      refreshButton.addEventListener('click', () => {
        // Refresh the page
        window.location.reload();
       });
       
  addFavouriteButton.addEventListener('click', () => {
    // Add movieData to the favoriteMoviesArray
    favoriteMoviesArray.push(movieData);

    // Store favoriteMoviesArray in local storage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesArray));

    // Show a message or perform any other action indicating the movie is added to favorites
    alert('Movie added to favorites!');
    console.log('favoriteMovies',favoriteMovies)
    showFavouriteOffcanvas();
  });
    }
    
    const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
if (storedFavoriteMovies) {
  favoriteMoviesArray.push(...JSON.parse(storedFavoriteMovies));

  // Update the offcanvas content to display the list of favorite movies
  showFavouriteOffcanvas();
}

    // Attach an event listener to the search box to trigger the movie search
    const searchBox = document.getElementById('movie-search-box');
    searchBox.addEventListener('input', handleMovieSearch);


    function openMoviePage(movieId) {
      const selectedMovie = moviesAPI.find(movie => movie.id === movieId);
      if (selectedMovie) {
        localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
        window.location.href = 'movie.html';
      }
    }

    // Function to load movie details on the movie page
    async function loadMovieDetails(movieName, movieId) {
      // Rest of the code remains the same
      // Replace the line: showMovieDetails(movie);
      // With the following line to open the Movie Page
      openMoviePage(movieId);
    }

    // Event listener for click on a suggestion item
    document.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('suggestion-item')) {
        const movieName = target.querySelector('p').textContent;
        const movieId = target.dataset.movieId;
        loadMovieDetails(movieName, movieId);
      }
    });

    // Show favourite movies on load
    showFavourites();
