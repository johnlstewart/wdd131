/*------------------------Menu Button------------------------*/
/* Toggling the menu button */
const menuButton = document.querySelector("header button"); // Selects the first 'button' element within the 'header' element

function toggleMenu() { // Creates the 'toggleMenu' function
    const menu = document.querySelector(".topmenu"); // Selects the HTML element that has the class of ".topmenu"
    menu.classList.toggle("hide"); // Toggles the "hide" class, which controls the visibility of the menu
}

menuButton.addEventListener("click", toggleMenu); // Adds an event listener to the menu button to call toggleMenu on click

/*------------------------Window Resize------------------------*/
/* Handles the window resizing event */
function handleResize() { // Specifically called 'handleResize'
    const menu = document.querySelector(".topmenu"); // Selects the HTML element that has the class of ".topmenu"
    if (window.innerWidth > 1000) { // If the width of the window is over 1000 pixels...
        menu.classList.remove("hide"); // Remove the "hide" class
    } else { // Otherwise (if the window width is 1000px or less)
        menu.classList.add("hide"); // Add the "hide" class
    }
}

handleResize(); // Immediately check the size when the page loads
window.addEventListener("resize", handleResize); // Listen for resize events and call handleResize

/*------------------------Modal Viewer Template------------------------*/
/* Swap-able source to display images */
function viewerTemplate(pic, alt) { // Takes the path for the image and the alt text as parameters
    return `<div class="viewer">
    <button class="close-viewer">X</button>
    <img src="${pic}" alt="${alt}">
    </div>`;
}

/*------------------------Viewer Handler------------------------*/
/* Pulls up the images themselves to be displayed */
function viewHandler(event) {
    const target = event.target; // Creates a variable "target" from the event target (the clicked element)
    if (target.tagName === 'IMG') { // If the clicked element is an image...
        const src = target.src.split('-')[0]; // Splits the src of the image at the hyphen and takes the first part
        const fullSrc = `${src}-full.jpeg`; // Constructs the full-size image src
        const alt = target.alt; // Gets the alt text from the image
        const viewerHTML = viewerTemplate(fullSrc, alt); // Gets the HTML for the viewer

        document.body.insertAdjacentHTML("afterbegin", viewerHTML); // Inserts the viewer's HTML at the beginning of the body

        const closeButton = document.querySelector(".close-viewer"); // Selects the close button
        closeButton.addEventListener("click", closeViewer); // Adds an event listener to the close button to call closeViewer on click
    }
}

function closeViewer() { // Closes the viewer
    const viewer = document.querySelector(".viewer"); // Selects the viewer element
    if (viewer) { // If the viewer element exists...
        viewer.remove(); // Remove the viewer from the DOM
    }
}

const gallery = document.querySelector(".gallery"); // Selects the gallery element
gallery.addEventListener("click", viewHandler); // Adds an event listener to the gallery to call viewHandler on click
