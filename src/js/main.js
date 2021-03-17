var paywall = require("./lib/paywall");
setTimeout(() => paywall(12169135), 5000);

var catList = document.querySelectorAll(".filter-buttons");
var searchBox = document.querySelector(".filters .search");
var header = document.querySelector(".filters");
var sticky = header.offsetTop;
var clearSearch = document.querySelector(".clear-search");
var allEventsButton = document.querySelector(".all-events");

var eventGrid = document.querySelector(".event-grid");
var events = document.querySelectorAll(".event");
var resultBox = document.querySelector(".no-results");

var show = ['festivals', 'lights', 'markets', 'parties', 'runs', 'special-events'];
var result; 

function filterByCategory(cat){
  if(show.length == 6){
    show = [];
  }
  if (show.indexOf(cat) > -1){
    var indexCat = show.indexOf(cat);
    show.splice(indexCat, 1);
  }
  else {
    show.push(cat);
  }
  if(show.length > 0){
    allEventsButton.classList.remove("checked");
  }
  combineFilters();
}


function combineFilters(){
  result = 0;
  var searchText = searchBox.value.toLowerCase();

  if(show.length > 0){
    if(searchText.length == 0){
      for(var z = 0; z<events.length; z++){
        if(show.indexOf(events[z].dataset.category) > -1){
          events[z].style.display="inline";
          result += 1;
        }
        else{
          events[z].style.display="none";
        }
      }
      noResults();
    }
    else if(searchText.length > 0){
      for( var a = 0; a<events.length; a++){
        var eventText = events[a].innerText.toLowerCase();
        if ((eventText.search(searchText) > -1) && (show.indexOf(events[a].dataset.category) > -1)){
          events[a].style.display="inline";
          result =+ 1;
        }
        else{
          events[a].style.display="none";
        }
      }
      noResults();
    }
  } 
  else{
    for(var i = 0; i<events.length; i++){
      events[i].style.display="none";
    } 
    noResults();
  }   
}

function noResults(){
  if (result==0){
    resultBox.style.display="block";  
  }
  else{
    resultBox.style.display="none"; 
  }
}

function fixNav(){
  if(window.pageYOffset > sticky) {
    header.classList.add("sticky");
    } 
  else{
    header.classList.remove("sticky");
  }
}

function clearSearchBox(){
  searchBox.value = "";
  clearSearch.style.display="none";
  combineFilters();
}

function allEvents(){
  clearSearchBox();
  show = ['festivals', 'lights', 'markets', 'parties', 'runs', 'special-events'];
  if (this.classList.length == 1){
    this.classList.add("checked");
  }
  else{
    this.classList.remove("checked");
  }  

  for(var x = 0; x < catList.length; x++){
    catList[x].classList.remove("checked");
  }
  for(var i = 0; i<events.length; i++){
    events[i].style.display="inline";
  }  
}

function detectIE() {
  if(navigator.userAgent.match(/Trident.*rv:11\./)) {
    eventGrid.classList.add("ie11");
  }
}

function catButton() {
  if (this.classList.length == 1){
    this.classList.add("checked");
  }
  else{
    this.classList.remove("checked");
  }
  filterByCategory(this.dataset.category);
}

function catlistener(){
  for(var x = 0; x < catList.length; x++){
    catList[x].addEventListener("click", catButton);
  }
}
catlistener();

function searchListener(){
  clearSearch.style.display="inline";
  combineFilters();
}


clearSearch.addEventListener("click", clearSearchBox);
allEventsButton.addEventListener("click", allEvents);
searchBox.addEventListener("keyup", searchListener);
window.onscroll = function() {fixNav()};
detectIE();

