// getting the image from the API source!
// amd disp;aying in a different HTML page!
function show_image(img, width, height, alt) {
  var url_string = window.location.href; //window.location.href
  // testing what we got so far
  console.log("this is a url string" + url_string);
  var url = new URL(url_string);
  var imgpath = url.searchParams.get("img");

  //testing one more time
  console.log("this is an image path here " + imgpath);

  var img = document.createElement("img");
  img.src = imgpath;

  //verifying one more time the parameter!
  console.log("hello " + img.src);

  img.width = 300;
  img.alt = alt;
  document.getElementById("imageDiv").appendChild(img);
}
