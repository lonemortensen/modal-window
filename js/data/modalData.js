/* ====================================================================
Project:  Modal Window
Author:  Lone Mortensen
Description:  TBD

Built with: JavaScript, HTML5, CSS3, and Flexbox.

===== *** =====

==================================================================== */

// !!! START HERE: when the arrays are combined into one array in the accessData function, the two modal components function as ONE
// so when the portfolio component runs out of projects when clicking next and previous, it continues
// with the gallery items. Figure out how to make the two components need to function separately! 
// Do I create a 2D array? If so, how do I loop through ALL elements, but identify which array the selected element 
// belongs to so the circular array will stick to the array that contains that element?
// https://www.freecodecamp.org/news/javascript-2d-arrays/    
// Or consider simply creating a new data module for each modal...

/**
 * Arrays store objects containing data for each of the Modals. 
 * The data is for use in the Modal windows.
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
 * Combines multiple Modal data arrays into one data array.
 * @return — The data for the Modals.
*/
export const accessData = () => {
	// Combines multiple arrays into one:
    let data = [].concat(portfolioProjects, galleryItems); // 
    //console.log(data); // Works. Logs all objects in one array.
    return data;
};