/* ====================================================================
Project:  Modal Window
Author:  Lone Mortensen
Description:  TBD

Built with: JavaScript, HTML5, CSS3, and Flexbox.

===== *** =====

==================================================================== */

/**
 * Arrays (one-dimensional) store objects containing data for each of the Modals. 
 * The data is for use in the Modal windows.
 * If multiple Modal window components are used on the webpage, each component's data is 
 * stored in a separate array.
*/
const portfolioProjects = [ 
    { 
        id: "project-1-modal", 
	    image: "./img/modal-portfolio-image-1200.png",
        title: "Portfolio Project | ONE",
	    description: "Project 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        firstLink: "https://lonemortensen.com/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    },
	{ 
        id: "project-2-modal", 
	    image: "./img/modal-portfolio-image-1200.png",
	    title: "Portfolio Project | TWO",
        description: "Project 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://github.com/lonemortensen/modal-window" 
    },
	{ 
        id: "project-3-modal", 
        image: "./img/modal-portfolio-image-1200.png",
        title: "Portfolio Project | THREE",
        description: "Project 3 - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://github.com/lonemortensen/modal-window" 
    }, 
    { 
        id: "project-4-modal", 
	    image: "./img/modal-portfolio-image-1200.png",
	    title: "Portfolio Project | FOUR",
	    description: "Project 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        firstLink: "https://lonemortensen.com/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    },
	{ 
        id: "project-5-modal", 
	    image: "./img/modal-portfolio-image-1200.png",
	    title: "Portfolio Project | FIVE",
        description: "Project 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://github.com/lonemortensen/modal-window" 
    },
	{ 
        id: "project-6-modal", 
        image: "./img/modal-portfolio-image-1200.png",
        title: "Portfolio Project | SIX",
        description: "Project 6 - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Nostrud exercitation ullamco.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://github.com/lonemortensen/modal-window" 
    } 
];

const galleryItems = [ 
    { 
        id: "gallery-1-modal", 
	    image: "./img/modal-gallery-image-1200.png",
	    title: "Gallery Item | ONE",
	    description: "Gallery 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    },
    { 
        id: "gallery-2-modal", 
	    image: "./img/modal-gallery-image-1200.png",
	    title: "Gallery Item | TWO",
	    description: "Gallery 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    },
    { 
        id: "gallery-3-modal", 
	    image: "./img/modal-gallery-image-1200.png",
	    title: "Gallery Item | THREE",
	    description: "Gallery 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    },
    { 
        id: "gallery-4-modal", 
	    image: "./img/modal-gallery-image-1200.png",
	    title: "Gallery Item | FOUR",
	    description: "Gallery 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    },
    { 
        id: "gallery-5-modal", 
	    image: "./img/modal-gallery-image-1200.png",
	    title: "Gallery Item | FIVE",
	    description: "Gallery 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    },
    { 
        id: "gallery-6-modal", 
	    image: "./img/modal-gallery-image-1200.png",
	    title: "Gallery Item | SIX",
	    description: "Gallery 6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://github.com/lonemortensen/modal-window" 
    }
];


/* NOTE: The accessData function could not be imported into and accessed from the modal.js 
when the function was placed in the main.js module. It is unclear what caused the error, 
but it may be somehow related to the issue of 'circular dependency' and the import chain 
when importing modules in JS. 
When placing the accessData function directly in the modal.js module and accessing the data 
from inside the modal.js module, the function works. To avoid the import chain problem 
(and to keep the modal.js module free of data), the accessData function is instead placed in 
the modalData.js module and imported into the modal.js module from where it is called.   
*/

/**
 * Accesses and exports the data for the Modals. 
 * Combines multiple one-dimensional (1D) Modal data arrays into a two-dimensional (2D) data array.
 * @return — A 2D array containing data for the Modals.
*/
export const accessData = () => {
	// Combines multiple 1D arrays into one 2D array:
    let data = [];
    data.push(portfolioProjects, galleryItems);
    console.log(data); // Works. Logs one 2D array with two inner 1D arrays, each with three objects.
    return data;
};