/* ====================================================================
Project:  Modal Windows
Author:  Lone Mortensen
Description:  This project uses modal windows to display information 
about individual content items on a web page. When a user clicks on an
item, a modal window opens on a blurred backdrop in front of the page 
contents. In addition to offering additional details about the selected 
item, the modal window allows users to navigate to the previous or next 
window without first returning to the web page. Users can navigate using
the window buttons or with their keyboard. 
Design: The project consists of two different modal window components 
on the same web page. The use of JavaScript modules allows for the script 
to be reused and applied to multiple separate modal window components.    
Built with: JavaScript, ES6 modules, HTML5, CSS3, and Flexbox.

===== *** =====

The main.js module:
- connects to index.html.
- imports from modal.js.
- calls event handler in modal.js to close any open modal 
windows when the page loads.
- contains an IIFE that 1) selects the modal html elements on the web page 
and 2) calls a function in modal.js to add event listeners to each modal 
html element. 
==================================================================== */

/**
 * Imports. 
*/
import {addModalEventListener, closeModalWindow} from "./modal.js"; 


/** 
 * Detects when page loads.
 * Calls event handler to close any open modal windows. 
*/
window.addEventListener("load", closeModalWindow); 


/** 
 * The 'modal' IIFE runs every time the script loads.
 * Selects and stores html elements for all modal window components.
 * Calls function to add event listener to each modal html element.
 * ! NOTE: If modal window components are added to or removed from the 
 * web page, the IIFE needs updating.
 * @arg modalElements - Modal html elements. 
*/
const modal = (function() {
    const modalElements = document.querySelectorAll('.view-project, .view-gallery'); 
    addModalEventListener(modalElements); 
})();
