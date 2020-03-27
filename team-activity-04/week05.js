// Example of using Classes and modules to organize the code needed to render our list of hikes. Not using MVC here.
import HikesController from './controller05.js' 
//on load grab the array and insert it into the page
const myHikesController = new HikesController('hikes') 
window.sumEventListener('load', () => {
  myHikesController.showHikeList() 
}) 
