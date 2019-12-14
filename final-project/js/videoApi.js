function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}


function createVideoTemplate(data, content) {
    

    content.innerHTML = '<p id="content-close">X</p>';
     console.log('Videos: ', data);
     const videos = data.results;
     const length = videos.length > 3 ? 3 : videos.length;
     const iframeContainer = document.createElement('div');

     for (let i = 0; i < length; i++) {
         const video = videos[i];
        const iframe = createIframe(video);
         iframeContainer.appendChild(iframe);
         content.appendChild(iframeContainer);
     }
}


// Event Delegation
// document.onclick = function (event) {
    function show_TrailerMovies() {

        var url_string = window.location.href; //window.location.href
    // testing what we got so far
    console.log("this is a url string" + url_string);
    var url = new URL(url_string);
    var movieId = url.searchParams.get("id");
    //const target = event.target;

    //if (target.tagName.toLowerCase() === 'img') {
        // console.log('Hello World');
      //  const movieId = target.dataset.movieId;
        console.log('MovieId: ', movieId); 
       // const section = event.target.parentElement;
       const content = document.getElementById("trailers")
       // content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url2 = generateUrl(path);
        console.log("url = "  + url);

        //fetch movie videos
        fetch(url2) 
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);
            });

    

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');

    }
}