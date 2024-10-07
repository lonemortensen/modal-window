/* ====================================================================
Project:  Modal Windows
Author:  Lone Mortensen

===== *** =====

The modalData.js module:
- stores data for each modal window component in separate 1D arrays.   
- contains function that combines the 1D arrays into a 2D array, 
now storing the data for all the modal windows. 
- exports function for use in modal.js.
==================================================================== */

/**
 * Arrays (one-dimensional) store objects holding data for each of the modal windows. 
 * If multiple modal window components are used on the web page, each component's 
 * data is stored in a separate array.
*/

// Data for portfolio modal windows:  
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

// Data for gallery modal windows:  
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


/**
 * Exports function that combines modal data arrays. 
 * Combines one-dimensional (1D) modal data arrays into a two-dimensional (2D) array.
 * @return — 2D array with modal data.
*/
export const accessData = () => {
    let data = [];
    data.push(portfolioProjects, galleryItems);
    return data;
};