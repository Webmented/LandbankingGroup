
// GSAP animations for circles
gsap.from("#circle1", { duration: 4, scale: 1.5, ease: "power1.out" });
gsap.from("#circle2", {
  duration: 2,
  x: "50%",
  y: "50%",
  scale: 0.5,
  ease: "power1.out",
  onComplete: rotateInfinite,
  onCompleteParams: ["#circle2"]
});

// Function to apply infinite rotation to an element
function rotateInfinite(element) {
  gsap.to(element, {
    duration: 10,
    rotation: 360,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
  });
}

// ScrollTrigger settings
const hero = document.getElementById('hero');
const navbar = document.querySelector('.navbar_component');

ScrollTrigger.create({
  trigger: 'body',
  start: () => hero.offsetHeight + ' ' + (0 + navbar.offsetHeight),
  toggleClass: { targets: navbar, className: 'is-scrolled' },
  markers: true,
});

// Variables to hold scroll position and skip link usage status
let lastScrollTop = 0;
let skipLinkUsed = false;

// Function to focus on the main content when skip link is used
function skipToMainContent() {
  const mainContent = document.getElementById("main");
  if (mainContent) {
    mainContent.focus();
    skipLinkUsed = true;
  }
}

// Function to update navbar styles based on scroll position and viewport
function updateNavbar() {
  if (skipLinkUsed) {
    return;
  }

  // Find and store DOM elements to be manipulated
  const navbar = document.querySelector(".navbar_component");
  const hero = document.getElementById("hero");
  const buttons = navbar.querySelectorAll(".button");
  const logoLinks = document.querySelectorAll(".navbar_logo-link");
  const menuTopLine = document.querySelector(".menu-icon1_line-top");
  const menuMiddleLine = document.querySelector(".menu-icon1_line-middle");
  const menuBottomLine = document.querySelector(".menu-icon1_line-bottom");
  const navbarLogo = document.querySelector(".navbar_logo"); // Find the navbar_logo element

  const heroRect = hero.getBoundingClientRect();
  const st = window.pageYOffset || document.documentElement.scrollTop;

  // Update navbar styles based on hero section visibility
  if (heroRect.top <= 0 && heroRect.bottom >= 0) {
    // Set navbar styles for when hero section is partially visible
    navbar.style.backgroundColor = "transparent";
    navbar.style.color = "white";
    logoLinks.forEach(logo => logo.style.color = "white");
    buttons.forEach(button => button.classList.add("is-alternate"));

    // Set menu icon line colors to white
    menuTopLine.style.backgroundColor = "white";
    menuMiddleLine.style.backgroundColor = "white";
    menuBottomLine.style.backgroundColor = "white";

    // Add filter-invert class to navbar logo
    if (navbarLogo) {
      navbarLogo.classList.add("filter-invert");
    }
  } else {
    // Set navbar styles for when hero section is not visible
    navbar.style.backgroundColor = "white";
    navbar.style.color = "black";
    logoLinks.forEach(logo => logo.style.color = "#1e4b3e");
    buttons.forEach(button => button.classList.remove("is-alternate"));

    // Set menu icon line colors to black
    menuTopLine.style.backgroundColor = "black";
    menuMiddleLine.style.backgroundColor = "black";
    menuBottomLine.style.backgroundColor = "black";

    // Remove filter-invert class from navbar logo
    if (navbarLogo) {
      navbarLogo.classList.remove("filter-invert");
    }
  }

  // Hide navbar on scroll down, show on scroll up
  if (st > lastScrollTop) {
    navbar.style.top = "-8rem";
  } else {
    navbar.style.top = "0";
  }

  // Update last known scroll position
  lastScrollTop = st <= 0 ? 0 : st;
}

// Event listener for scroll event to update navbar styles
window.addEventListener("scroll", updateNavbar);

// GSAP and ScrollTrigger initialization and common animations
gsap.registerPlugin(ScrollTrigger);

// Function to toggle navbar open/close animation on menu button click
const navbarTrigger = document.querySelector(".w-nav-button");

function toggleNavbarTriggerAnimation() {
  const navOverlay = document.querySelector('.w-nav-overlay');
  const isNavOverlayHidden = window.getComputedStyle(navOverlay).display === 'none';

  if (isNavOverlayHidden) {
    // Start the animation if it has not started yet
    navbar.classList.add("is-open");
  } else {
    // Otherwise, play the animation backwards
    navbar.classList.remove("is-open");
  }
}

// Event listener for navbar trigger button click to toggle animation
navbarTrigger.addEventListener('click', toggleNavbarTriggerAnimation);

// Initial call to update navbar styles based on initial page load state
updateNavbar();

// Event listener for skip link click to focus on main content
const skipLink = document.querySelector(".skip-link");
if (skipLink) {
  skipLink.addEventListener("click", skipToMainContent);
}

gsap.registerPlugin(ScrollTrigger);

// On page load animations
document.addEventListener("DOMContentLoaded", () => {
  gsap.to('[data-load-animation="fade-in-up"]', {
    opacity: 1,
    translateY: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
  });
});

// Scroll into view animations
gsap.utils.toArray('[data-scroll-animation="fade-in-up"]').forEach((element) => {
  gsap.fromTo(element,
    { opacity: 0, translateY: 20 },
    {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
      },
      opacity: 1,
      translateY: 0,
      duration: 1,
      ease: 'power2.out',
    }
  );
});

// Function to start the marquee animation
function startMarquee() {
  const logoElement = document.querySelector('[logo="marquee"]');

  // Define the animation
  const tl = gsap.timeline({
    // On complete, reset the position and restart the animation
    onComplete: () => {
      tl.restart();
    }
  });

  // Add animation to the timeline
  tl.to(logoElement, {
    x: '0rem', // Target position
    duration: 40, // Adjust the duration as needed
    ease: 'linear' // Linear easing for a constant speed
  });
}

// Start the marquee animation
startMarquee();