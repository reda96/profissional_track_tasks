/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = ["section1", "section2", "section3", "section4"];
const sectionsNames = ["Apply for a job", "employers", "about", "SignUp"];
let active = "section1";
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const isInViewport = (elem) => {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
//Determine which section is on viewport
const checkActiveSection = () => {
  for (sec of sections) {
    if (isInViewport(document.getElementById(sec))) {
      return sec;
    }
  }
  return active;
};

/**
 * End Helper Functions
 *
 */

// build the nav
//  * Begin Main Functions
const buildMenu = () => {
  let unorderedList = document.createElement("ul");

  for (let i = 0; i < sections.length; i++) {
    const listElement = document.createElement("li");
    const linkElement = document.createElement("a");
    linkElement.classList.add("menu__link");
    linkElement.classList.add(sections[i]);
    const linkText = document.createTextNode(sectionsNames[i]);
    linkElement.appendChild(linkText);
    listElement.appendChild(linkElement);
    unorderedList.appendChild(listElement);
  }
  let navBar = document.createElement("nav");
  navBar.classList.add("navbar__menu");
  navBar.appendChild(unorderedList);
  document.querySelector(".page__header").appendChild(navBar);
  document.querySelector(".section1").classList.add("active");
};
// Add class 'active' to section when near top of viewport
const handleScroll = () => {
  const activeSection = checkActiveSection();
  if (activeSection !== active) {
    document.getElementById(active).classList.remove("your-active-class");
    document.querySelector(`.${active}`).classList.remove("active");
    active = activeSection;
    document.getElementById(active).classList.add("your-active-class");
    document.querySelector(`.${active}`).classList.add("active");
  }
};
// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
  let sec_no;

  switch (e.target.innerText) {
    case "Apply for a job":
      sec_no = "section1";

      break;
    case "employers":
      sec_no = "section2";

      break;
    case "about":
      sec_no = "section3";

      break;
    case "SignUp":
      sec_no = "section4";

      break;

    default:
      break;
  }
  if (!e.target.classList.contains("active")) {
    document.querySelector(`.active`).classList.remove("active");
    e.target.classList.add("active");
    document.getElementById(active).classList.remove("your-active-class");
    document.getElementById(sec_no).classList.add("your-active-class");
    active = sec_no;
  }
  document.getElementById(active).scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
window.addEventListener("load", buildMenu);
// Scroll to section on link click
document.addEventListener("click", scrollToSection);
// Set sections as active
document.addEventListener("scroll", handleScroll);
