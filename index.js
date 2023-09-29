
gsap.to('.dash', {
    strokeDashoffset: "-=20",
    repeat: -1,
    duration: 4,
    ease: "none",
    scrollTrigger: {
        trigger: ".svg-container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
    },
});

gsap.to('.circle', {
    scale: 1,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "sine.inOut",
    scrollTrigger: {
        trigger: ".svg-container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
    },
});

// Start of the Graphic Animation Script
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Function to get marginBottom values based on the current breakpoint
function getMarginBottomValues() {
    let initialMarginBottom, finalMarginBottom;

    if (window.innerWidth <= 576) {
        // XS breakpoint
        initialMarginBottom = '-13.4rem';
        finalMarginBottom = '-4rem';
    } else if (window.innerWidth <= 768) {
        // SM breakpoint
        initialMarginBottom = '-12.4rem';
        finalMarginBottom = '-3rem';
    } else if (window.innerWidth <= 992) {
        // MD breakpoint
        initialMarginBottom = '-11.4rem';
        finalMarginBottom = '-2rem';
    } else {
        // LG and XL breakpoints
        initialMarginBottom = '-10.4rem';
        finalMarginBottom = '-1rem';
    }

    return { initialMarginBottom, finalMarginBottom };
}

// Create a new GSAP timeline
let mainTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '[vision-element]',
        start: 'top bottom-=20%',
        end: 'bottom top',
        scrub: true,
        markers: false,
    },
});

// Get marginBottom values based on the current breakpoint
const { initialMarginBottom, finalMarginBottom } = getMarginBottomValues();

// Animation for vision-element
gsap.utils.toArray('[vision-element]').forEach((element, index) => {
    mainTimeline.fromTo(
        element,
        { marginBottom: initialMarginBottom },  // starting state with initial margin bottom value
        { marginBottom: finalMarginBottom, duration: 1.5, ease: "power2.out" }  // ending state with final margin bottom value
    );
});
