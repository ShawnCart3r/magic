$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchTitle').val();
    getMovies(searchTitle);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('https://api.scryfall.com/cards/named?fuzzy=sol+ring'+searchTitle)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(magic, (index, magic) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${magic.Poster}">
              <h5>${magic.Title}</h5>
              <a onclick="movieSelected('${magic.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#magic').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('magicId', id);
  window.location = 'magic.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('magicId');

  axios.get('http://www.omdbapi.com?i='+magicId)
    .then((response) => {
      console.log(response);
      let magic = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${magic.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${magic.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${magic.Genre}</li>
             
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${magic.Plot}
            <hr>
            <a href="http://imdb.com/title/${magic.scryFall}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
