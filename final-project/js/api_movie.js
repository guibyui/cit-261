/* My review Funtion: 

That will allows  us to Save my notes, and display it!

*/
var currentMovie = ""
// saving my review page
function saveNote() {
    var currentDateAndTime = new Date()
    var aNoteText = document.getElementById("note_editor").value
    var aNoteDescription = document.getElementById("description_input").value
    var aCompleteNote = "- " + aNoteDescription
    aCompleteNote += "<p>Review: " + aNoteText + "</p>" + currentDateAndTime.toLocaleString()

    var storedNotesString = localStorage.getItem(currentMovie)
    var allNotes = JSON.parse(storedNotesString)
    if (allNotes == null) {
        allNotes = []
    }
    allNotes.push(aCompleteNote)
    var allNotesString = JSON.stringify(allNotes)
    localStorage.setItem(currentMovie, allNotesString)
    showAllNotes()
    document.getElementById("note_editor").value = null
    document.getElementById("description_input").value = null
}
// displaying the note!
function showAllNotes() {
    var storedNotesString = localStorage.getItem(currentMovie)
    allNotes = JSON.parse(storedNotesString)
    if (allNotes != null) {
        var noteDisplayer = document.getElementById("all_notes_display")
        noteDisplayer.innerHTML = null
        var numberOfNotes = allNotes.length
        for (var i = 0; i < allNotes.length; i++) {
            var aNote = allNotes[i]
            noteDisplayer.innerHTML += "<hr><p>" + aNote + "</p>"
        }
    }
}

const API_KEY = '243617934df15cd416cb4fab0608b4ff';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=243617934df15cd416cb4fab0608b4ff'

const searchButton = document.querySelector('#searchSubmit');
const searchInput = document.querySelector('#inputSearchBox');
const movieSearchable = document.querySelector('#movies-searchable');
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const imgElement = document.querySelector('img');
var lastMovieSearch;

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=243617934df15cd416cb4fab0608b4ff`;
    return url;
}

function movieSelection(movies) {
    return movies.map((movie) => {
        currentMovie = movie.poster_path;
        // if statement to make sure we do not display paths without images
        if (movie.poster_path) {
            return `<img 
                src=${IMAGE_URL + movie.poster_path} 
                data-movie-id=${movie.id}
            />`;
        }
    })
}

function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class = "section" id = "movies">
        ${movieSelection(movies)}
        </section>
        <div class = "content">
        <p id = "content-close">&times; close</p>
        </div>  
        `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
    // data.results []
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ', data);

}

function getMovies(event) {
    if (event != null) {
        event.preventDefault();

    } else {
        document.getElementById("note_entry_area").remove();
    }
    if (searchInput.value == "")
        searchInput.value = lastMovieSearch;
    const value = searchInput.value;
    lastMovieSearch = value;

    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log('Error: ', error);
        });


    searchInput.value = '';

    console.log('value: ', value);
}
searchButton.onclick = function (event) {
    getMovies(event);
}

// function createReviews() {

// }

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 330;
    iframe.height = 300;
    iframe.allowFullscreen = true;

    return iframe;
}

function deleteAllReviews() {
    localStorage.setItem(currentMovie, "[]");
    showAllNotes();
}

function createVideoTemplate(data, content) {
    content.innerHTML = '<p id="content-close">&times; close</p>';
    console.log('Videos: ', data);
    const videos = data.results;
    const length = videos.length > 3 ? 3 : videos.length;
    const iframeContainer = document.createElement('div');
    iframeContainer.setAttribute("id", "bottom_movie");

    for (let i = 0; i < length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
    var div = document.createElement("div");
    div.id = "note_entry_area";
    div.innerHTML = '<h1>Please add your review!</h1>' +

        '<!-- making review stars --> <fieldset class="rating">' +
        '<input type="radio" id="star5" name="rating" value="5"><label class="full" for="star5" title="Awesome - 5 stars"></label>' +
        '<input type="radio" id="star4half" name="rating" value="4 and a half"><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>' +
        '<input type="radio" id="star4" name="rating" value="4"><label class="full" for="star4" title="Pretty good - 4 stars"></label>' +
        '<input type="radio" id="star3half" name="rating" value="3 and a half"><label class="half" for="star3half" title="Meh - 3.5 stars"></label>' +
        '<input type="radio" id="star3" name="rating" value="3"><label class="full" for="star3" title="Meh - 3 stars"></label>' +
        '<input type="radio" id="star2half" name="rating" value="2 and a half"><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>' +
        '<input type="radio" id="star2" name="rating" value="2"><label class="full" for="star2" title="Kinda bad - 2 stars"></label>' +
        '<input type="radio" id="star1half" name="rating" value="1 and a half"><label class="half" for="star1half" title="Meh - 1.5 stars"></label>' +
        '<input type="radio" id="star1" name="rating" value="1"><label class="full" for="star1" title="Sucks big time - 1 star"></label>' +
        '<input type="radio" id="starhalf" name="rating" value="half"><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>' +
        '</fieldset><br><br>' +

        'Add Your Name: <input id="description_input">' +

        '<textarea id="note_editor" placeholder="Write your review here."></textarea>' +

        '<br>' +
        '<button onclick="saveNote()">Save your review</button>' +
        '<button onclick="getMovies()">Go Back to Search Results</button>' +
        '<button onclick="deleteAllReviews()">Delete All Reviews</button>' +
        '<div id="all_notes_display"></div>';

    document.body.appendChild(div);
}


// Event Delegation
document.onclick = function (event) {

    //TODO: Hide all other movie images
    const target = event.target;


    if (target.tagName.toLowerCase() === 'img') {
        // console.log('Hello World');
        const movieId = target.dataset.movieId;
        console.log('MovieId: ', movieId);
        const section = event.target.parentElement;
        //for loop that goes through all movies and sets display
        //set display to none on each movie element


        document.getElementById("movies").innerHTML = "<img src=\"" + target.currentSrc +
            "\" data-movie-id=\"" + target.dataset.movieId + "\">"
        const content = section.nextElementSibling;
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);

        //fetch movie videos
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);
            });


    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');

    }
}