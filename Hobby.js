var $slideshowdiv = document.getElementById("slide-show-container");
var $dotsdiv = document.getElementsByClassName("dots")[0];

var $btn1 = document.getElementById("btn1");
var $btn2 = document.getElementById("btn2");
var $btn3 = document.getElementById("btn3");

var slideIndex = -1;
var showSlidesTimeout;

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
    "What a fantastic city! An amazing blend between the old and new world, friendly people, lots of activities and places to see. The well preserved Old Town full of historical places. It's one of those places that you always want to go back." +
      '<a href="https://en.wikipedia.org/wiki/Rhodes">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/Machu-Picchu.png",
    "Machu_Picchu",
    "The lost Aztec City of Machu Pichu.",
    "A place on my bucket list is Machu Pichu. Really far away in Peru, south America, on top of the mountains, there was the Aztec people who were really advanced for their time. " +
      '<a href="https://ro.wikipedia.org/wiki/Machu_Picchu">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/Teide-tenerife.png",
    "Teide-tenerife",
    "Amazing view of Teide Volcano in Tenerife.",
    "You wanna go on a volcano in flip-flops and summer clothes? Teide Volcano in Tenerife gives you that chance.You need to go by car up to 2000m and from there a Cable Car will take almost to the top. you should see the view." +
      '<a href="https://en.wikipedia.org/wiki/Teide">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/WalkofFame.png",
    "WalkofFame",
    "A famous walk.",
    "I never thought that ill get to see Walk of Fame. So many stars, famous actors, singers, some i didn't knew about, some shouldn't be there i belive. Yet its a crowded place with lots of joy and happy people. If you miss it is not really a big loss." +
      '<a href="https://en.wikipedia.org/wiki/Hollywood_Walk_of_Fame">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
]);
slideDataMap.set("gardening", [
  new Slide(
    "images/Flori-Liliac.png",
    "Liliac",
    "Equilibrium.",
    "So I enjoy gardening and flowers, and the Lilac is one you need to have in your garden. It has a great balance between flowers and perfume, too bad it doesn't last long." +
      '<a href="https://www.gardenia.net/plant-variety/syringa-vulgaris-common-lilac">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/caprifoi-gradina.png",
    "Caprifoi",
    "A breath taking parfume.",
    "Now this is a great plant. Has a bunch of small flowers and a very strong perfume. You can feel it from a distance. It can survive on its own, and it climbs and stretches all over. It a must have." +
      '<a href="https://ro.wikipedia.org/wiki/Caprifoi">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/RedRose.png",
    "RedRose",
    "Spikes and Roses.",
    "Roses, adored by everyone, with light and tender perfume, and various colors, you can will any girls heart. Some have more spikes so bee carefull. These days, the possibility of colours are infinite." +
      '<a href="https://en.wikipedia.org/wiki/Rose">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/MagnoliaTree.png",
    "Magnolia",
    "Magnolia before bees.",
    "An ancient on this Earth. A research studi shows that this species of trees are older then bees. Can you imagine that? That old and still showing off with those amazing flowers." +
      '<a href="https://en.wikipedia.org/wiki/Magnolia">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
]);
slideDataMap.set("gaming", [
  new Slide(
    "images/counter-strike.png",
    "Counter-Strike",
    "Long nights wasted.",
    "Best team player shooter game of its time, where youngsters used to stay all night in the internet cafe (so was I!). Once you started playing you couldn't stop, was like a demon was taking control. Good times :)" +
      '<a href="https://counterstrike.fandom.com/wiki/Counter-Strike">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/LeagueofLegends.png",
    "League_Of_Legends",
    "5 more minutes Mom!",
    "Here we have another example of a more modern game that used to keep you awake at night. Not even your mother could separate you from the Pc. Not even food could bring you out of that room. Some are still in their rooms even today." +
      '<a href="https://www.nfhs.org/media/1020428/what-is-league-of-legends_.pdf">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/playstation.png",
    "Playstation",
    "The power of Playstation.",
    "I can easily say that Console stastions are the most fun when comes to multiplayer. First before Pc's and still kickin. Its a really nice way to spend with friend, or alone (if you have no friend)." +
      '<a href="https://en.wikipedia.org/wiki/PlayStation">Read more...<i class="fas fa-angle-double-right"></i></a>'
  ),
  new Slide(
    "images/catan-mania.png",
    "Catan",
    "Where there's beer, there's a way.",
    "People show more and more interest in Society games, so they can connect to each other and have fun. Catan its a great strategy game and has many extensions, and its fun, and goes well with some beers." +
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

  showSlidesTimeout = setTimeout(showSlides, 3000);
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
