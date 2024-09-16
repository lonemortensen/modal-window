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
        id: "project-1", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Project #1",
	    description: "Project #1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.com/",
	    secondLink: "https://github.com/lonemortensen/portfolio-filter" 
    },
	{ 
        id: "project-2", 
	    image: "img/modal-window-project-2-1200.png",
	    title: "Project #2",
        description: "Project #2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    },
	{ 
        id: "project-3", 
        image: "img/modal-window-project-3-1200.png",
        title: "Project #3",
        description: "Project #3 - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    }, 
    { 
        id: "project-4", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Project #4",
	    description: "Project #4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.com/",
	    secondLink: "https://github.com/lonemortensen/portfolio-filter" 
    },
	{ 
        id: "project-5", 
	    image: "img/modal-window-project-2-1200.png",
	    title: "Project #5",
        description: "Project #5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    },
	{ 
        id: "project-6", 
        image: "img/modal-window-project-3-1200.png",
        title: "Project #6",
        description: "Project #6 - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
        secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    } 
];

const galleryItems = [ 
    { 
        id: "gallery-1", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Gallery #1",
	    description: "Gallery #1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    },
    { 
        id: "gallery-2", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Gallery #2",
	    description: "Gallery #2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    },
    { 
        id: "gallery-3", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Gallery #3",
	    description: "Gallery #3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    },
    { 
        id: "gallery-4", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Gallery #4",
	    description: "Gallery #4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    },
    { 
        id: "gallery-5", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Gallery #5",
	    description: "Gallery #5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
    },
    { 
        id: "gallery-6", 
	    image: "img/modal-window-project-1-1200.png",
	    title: "Gallery #6",
	    description: "Gallery #6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        firstLink: "https://lonemortensen.github.io/portfolio-filter/",
	    secondLink: "https://lonemortensen.github.io/portfolio-filter/" 
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