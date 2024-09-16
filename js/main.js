/* ====================================================================
Project:  Modal Window
Author:  Lone Mortensen
Description:  TBD

Built with: JavaScript, HTML5, CSS3, and Flexbox.

===== *** =====

==================================================================== */


/* ===== MODAL COMPONENT ===== */

/**
 * Imports. 
*/

// Imports event handlers:
import {addModalEventListener, closeModalWindow} from "./modal.js"; 


/**
 * NOTE: Do not remove eventlistener on Window as this prevents user from clicking (and opening) 
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
    const modalElements = document.querySelectorAll('.project, .gallery'); // Works. Selects both project and gallery elements.
    //console.log(modalElements);
    addModalEventListener(modalElements); 

})();








