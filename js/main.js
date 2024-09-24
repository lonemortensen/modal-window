/* ====================================================================
Project:  Modal Windows
Author:  Lone Mortensen
Description:  This project uses modal windows to display information 
about individual content items on a web page. When a user clicks on an
item, a modal window appears on a blurred backdrop in front of the page 
contents. In addition to offering additional details about the selected 
item, the modal window allows users to navigate to the previous or next 
window without first returning to the web page. 
Design: The project consists of two modal window components on the same 
web page. The use of ES6 modules allows for the script to reuse code 
and handle multiple separate modal window components.    
Built with: JavaScript, ES6 modules, HTML5, CSS3, and Flexbox.

===== *** =====

The main.js module:
- connects to index.html.
- imports event handlers from the modal.js module. 
- ensures any open modal windows close when the page loads.
- contains an IIFE that 1) selects the Modal html elements on the web page 
and 2) calls an event handler that adds event listeners to each Modal html 
element. 
==================================================================== */


/* ===== MODAL COMPONENT ===== */

/**
 * Imports. 
*/

// Imports event handlers:
import {addModalEventListener, closeModalWindow} from "./modal.js"; 


/**
 * NOTE: Do NOT remove eventlistener on Window as this prevents user from clicking (and opening) 
 * the same modal more than once unless the page reloads (and the event listener is added again)! 
*/

/** 
 * Detects when page loads.
 * Adds event listener to the Window.
 * Calls event handler to check if a Modal window is currently open. If so, the Modal Window will be closed. 
*/
window.addEventListener("load", closeModalWindow); // Works. Modal + background disappears on page re-load.


/* NOTE: The 'modal' IIFE runs every time the script loads. If there are mutiple Modal components on the web page, 
event listeners are added to all of the components. When Modal components are added (or removed) from the 
web page, the modal IIFE needs updating.
*/ 
const modal = (function() {

    /** 
     * Gets and stores Modal html elements.
     * Selects elements for all Modal components on the web page.
     * Calls event handler to add an event listener to each Modal html element.
     * @arg modalElements - Contains Modal html elements. 
    */
    const modalElements = document.querySelectorAll('.view-project, .view-gallery'); // Works. Selects both project and gallery button elements.
    //console.log(modalElements);
    addModalEventListener(modalElements); 

})();








