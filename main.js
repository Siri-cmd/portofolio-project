var $slideshowdiv = document.getElementById("slide-show-container");
var $dotsdiv = document.getElementsByClassName("dots")[0];

var $btn1 = document.getElementById("btn1");
var $btn2 = document.getElementById("btn2");
var $btn3 = document.getElementById("btn3");

var slideIndex = -1;
var showSlidesTimeout;
var LOREM_TEXT =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aut, incidunt ipsum, ipsa quis, excepturi id assumenda deserunt laboriosam voluptate soluta? ";

class Slide {
  constructor(imgfilename, imgaltname, imgtitle, imgHTMLdescription) {
    this.imgfilename = imgfilename;
    this.imgaltname = imgaltname;
    this.imgtitle = imgtitle;
    this.imgHTMLdescription = imgHTMLdescription;
  }

  toString() {
    var str = "";
    str += "Img file name = " + this.imgfilename + ", ";
    str += "Img alt name = " + this.imgaltname + ", ";
    str += "Img title = " + this.imgtitle + ", ";
    str += "Img HTML description = " + this.imgHTMLdescription;
    return str;
  }
}

let slideDataMap = new Map();
slideDataMap.set("exploring-the-world", [
  new Slide(
    "images/Rhodes.png",
    "Rhodes",
    "The beautiful Old Town of Rhodes.",
    LOREM_TEXT +
      '<a href="https://en.wikipedia.org/wiki/Rhodes">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/Machu-Picchu.png",
    "Machu_Picchu",
    "The lost Aztec City of Machu Pichu.",
    LOREM_TEXT +
      '<a href="https://ro.wikipedia.org/wiki/Machu_Picchu">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/Teide-tenerife.png",
    "Teide-tenerife",
    "Amazing view of Teide Volcano in Tenerife.",
    LOREM_TEXT +
      '<a href="https://en.wikipedia.org/wiki/Teide">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/WalkofFame.png",
    "WalkofFame",
    "A famous walk.",
    LOREM_TEXT +
      '<a href="https://en.wikipedia.org/wiki/Hollywood_Walk_of_Fame">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
]);
slideDataMap.set("gardening", [
  new Slide(
    "images/Flori-Liliac.png",
    "Liliac",
    "Equilibrium",
    LOREM_TEXT +
      '<a href="https://www.gardenia.net/plant-variety/syringa-vulgaris-common-lilac">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/caprifoi-gradina.png",
    "Caprifoi",
    "A breath taking parfume.",
    LOREM_TEXT +
      '<a href="https://ro.wikipedia.org/wiki/Caprifoi">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/RedRose.png",
    "RedRose",
    "Spikes and flowers.",
    LOREM_TEXT +
      '<a href="https://en.wikipedia.org/wiki/Rose">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/MagnoliaTree.png",
    "Magnolia",
    "Magnolia before bees.",
    LOREM_TEXT +
      '<a href="https://en.wikipedia.org/wiki/Magnolia">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
]);
slideDataMap.set("gaming", [
  new Slide(
    "images/counter-strike.png",
    "Counter-Strike",
    "Long nights wasted.",
    LOREM_TEXT +
      '<a href="https://counterstrike.fandom.com/wiki/Counter-Strike">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/LeagueofLegends.png",
    "League_Of_Legends",
    "5 more minutes Mom!",
    LOREM_TEXT +
      '<a href="https://www.nfhs.org/media/1020428/what-is-league-of-legends_.pdf">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/playstation.png",
    "Playstation",
    "The power of Playstation.",
    LOREM_TEXT +
      '<a href="https://en.wikipedia.org/wiki/PlayStation">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/catan-mania.png",
    "Catan",
    "Where there's beer, there's a way.",
    LOREM_TEXT +
      '<a href="https://www.catan.com/game/catan-universe#">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
]);

let htmlSlidesMap = new Map();
htmlSlidesMap.set("exploring-the-world", []);
htmlSlidesMap.set("gardening", []);
htmlSlidesMap.set("gaming", []);

/**
 * Creates a HTML element from a Silde instance
 * 
 * <div class="slides fade">
      <div class="content-pics">
        <img src=".." alt=".." />
      </div>
      <div class="content-text">
        <h3>..</h3>
        <p>...</p>
      </div>
    </div>
 */
function createHTMLSlideElement(slide) {
  console.log("Creating html slide from " + slide.toString());

  var $slideElement = document.createElement("div");
  $slideElement.classList.add("slides");
  $slideElement.classList.add("fade");

  var $contentpics = document.createElement("div");
  $contentpics.classList.add("content-pics");
  $slideElement.appendChild($contentpics);

  var $img = document.createElement("img");
  $img.setAttribute("src", slide.imgfilename);
  $img.setAttribute("alt", slide.imgaltname);
  $contentpics.appendChild($img);

  var $contenttext = document.createElement("div");
  $contenttext.classList.add("content-text");
  $slideElement.appendChild($contenttext);

  var $imgtitle = document.createElement("h3");
  $imgtitle.innerText = slide.imgtitle;
  $contenttext.appendChild($imgtitle);

  var $p = document.createElement("p");
  $p.innerHTML = slide.imgHTMLdescription;

  $contenttext.appendChild($p);

  return $slideElement;
}

/**
 * For each Slide in the list of slides identified by slideSetName, the method
 * creates a corresponsing HTML element and saves it in a separate map
 *
 * @param {*} slideSetName the name of the slide set (key of slideDataMap)
 */
function populateHtmlSlidesMap(slideSetName) {
  var slidesDataList = slideDataMap.get(slideSetName);
  if (slidesDataList == null || slidesDataList.length == 0) {
    return;
  }

  for (i = 0; i < slidesDataList.length; i++) {
    var $slideElement = createHTMLSlideElement(slidesDataList[i]);

    htmlSlidesMap.get(slideSetName).push($slideElement);
  }
}

/**
 * Appends all HTML slide elements identified by slideSetName to the slideshowdiv
 * For each slide, a dot element is created
 *
 * @param {*} slideSetName slide list identifier
 */
function setSlides(slideSetName) {
  console.log("Setting slides defined for  " + slideSetName);

  for (i = 0; i < htmlSlidesMap.get(slideSetName).length; i++) {
    $slideshowdiv.appendChild(htmlSlidesMap.get(slideSetName)[i]);

    var $dotElement = document.createElement("span");
    $dotElement.classList.add("dot");
    $dotsdiv.appendChild($dotElement);
  }
}

/**
 * (Utility function)
 * Removes all child nodes of a specified class name from the parent element
 *
 * @param {*} parent parent element
 * @param {*} childclassname class name of the child elements to be removed
 */
function removeAllChildrenOfClass(parent, childclassname) {
  var firstchild =
    parent.getElementsByClassName(childclassname).length > 0
      ? parent.getElementsByClassName(childclassname)[0]
      : null;
  while (firstchild) {
    parent.removeChild(firstchild);
    firstchild =
      parent.getElementsByClassName(childclassname).length > 0
        ? parent.getElementsByClassName(childclassname)[0]
        : null;
  }
}

/**
 * Stops the execution of the function that displays slides.
 * Removes all slides and dots.
 */
function cleanSlideShow() {
  //Prevent the function set with the setTimeout() to execute:
  clearTimeout(showSlidesTimeout);
  //Reset slide counter
  slideIndex = -1;

  //Log the number of slides currently displayed in the slideshowdiv
  var currentSlideList = $slideshowdiv.getElementsByClassName("slides");
  console.log("Cleaning slide show (" + currentSlideList.length + " slides)");

  //Remove all slides (child elements of slideshowdiv) and all dots (child elements of dotsdiv)
  removeAllChildrenOfClass($slideshowdiv, "slides");
  removeAllChildrenOfClass($dotsdiv, "dot");

  currentSlideList = document.getElementsByClassName("slides");
  console.log("Remaining slides: " + currentSlideList.length);
}

/**
 * Changes the active slide (and dot) at a predefined interval (5 sec)
 *
 * @param {*} slideSetName
 */
function showSlides(slideSetName) {
  //Slides
  var slides = document.getElementsByClassName("slides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  slideIndex = slideIndex % slides.length;
  slides[slideIndex].style.display = "block";

  //Dots
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[slideIndex].classList.add("active");

  //The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.
  showSlidesTimeout = setTimeout(showSlides, 5000);
}

/**
 * Replaces the currently displayed set of slides with new slides identified by slideSetName
 *
 * @param {*} slideSetName the identifier of the new set of slides to be displayed
 */
function changeSlideShowContent(slideSetName) {
  cleanSlideShow();
  setSlides(slideSetName);
  showSlides();
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is loaded");

  populateHtmlSlidesMap("exploring-the-world");
  populateHtmlSlidesMap("gardening");
  populateHtmlSlidesMap("gaming");

  //default slides
  setSlides("exploring-the-world");
  showSlides();

  $btn1.addEventListener("click", () =>
    changeSlideShowContent("exploring-the-world")
  );

  $btn2.addEventListener("click", () => changeSlideShowContent("gardening"));

  $btn3.addEventListener("click", () => changeSlideShowContent("gaming"));
});
