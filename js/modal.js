/* ====================================================================
Project:  Modal Window
Author:  Lone Mortensen
Description:  TBD

Built with: JavaScript, HTML5, CSS3, and Flexbox.

===== *** =====

==================================================================== */

/**
 * Imports. 
*/
// Imports function that accesses data for the Modals:
import {accessData} from "./data/modalData.js";


/** 
 * Global variables.
*/
// The modalBackdrop and modalWindow variables must be accessible to the closeModalWindow function.
let modalBackdrop; // Variable is uninitialized to control when to create the html element in the DOM.
let modalWindow; // Variable is uninitialized to control when to create the html element in the DOM.

/* ===== MODEL ===== */

/**
 * Collects Modal data. 
 * Stores and returns data for the selected Modal's window as an object.
 * @param type — The type of Modal to get data for: 'new', 'next', or 'previous'.
 * @param selectedModalId — The id attribute value of the Modal selected by the user. 
 * @return — The object contains the data for the selected Modal window.
*/

/* NOTE: The accessData function could not be imported into and accessed from the modal.js 
when the function was placed in the main.js module. It is unclear what caused the error, 
but it may be somehow related to the issue of 'circular dependency' and the import chain 
when importing modules in JS. 
When placing the accessData function directly in the modal.js module and accessing the data 
from inside the modal.js module, the function works. To avoid the import chain problem 
AND keep the modal.js module free of data, the accessData function is instead placed in 
the modalData.js module and subsequently imported into the modal.js module from where it is called.   
*/

const getModalData = (type, selectedModalId) => {
	// Calls function to access Modal data and assigns returned data to new variable:
	let modalData = accessData(); // To hold onto the returned result, assign the function to a variable.
	console.log(modalData); // Works. Logs one 2D array with two inner 1D arrays, each with three objects.
	console.log(type); // Works. Logs type correctly.
	console.log(selectedModalId); // Works. 

	// Stores the object data for the selected Modal's window:
	let modalWindowData = {};
	console.log(modalWindowData);

	// Gets and stores the index of the array that contains the data that matches the selected Modal's id:
	// - Interates over the outer array (two-dimensional) to get the index of the first inner array (one-dimensional) that contains the data for the selected Modal.
	// - The findModalArrayIndex() callback function uses the some() method to check whether there is a modal id value in the inner array that matches that of selectedModalId.
	// @return - True or false.
	const findModalArrayIndex = (innerArray) => {
    	return innerArray.some(modal => modal.id === selectedModalId);
	};
	// The findIndex() method iterates over the outer array and calls the findModalArrayIndex() callback function on each inner array: 
	// Finds the index of the first inner array that meets the callback condition. 
	const foundArrayIndex = modalData.findIndex(findModalArrayIndex);
	console.log(foundArrayIndex); // Works. Logs the index of the inner array that contains the object with an id that matches the value of selectedModalId.
	let modalArrayIndex = modalData[foundArrayIndex];
	console.log(modalArrayIndex); // Works. Logs the inner array, incl. objects, with the index contained in foundArrayIndex.

	// Gets and stores the index of the Modal based on the Modal's id:
	// - Uses the findIndex() method on the modalArrayIndex variable which contains the array that holds the selected Modal's id.
	// - note: Gets the currently open Modal's index when user selects 'previous' or 'next' modal.
	let modalWindowIndex = modalArrayIndex.findIndex(modal => modal.id === selectedModalId);
	console.log(modalWindowIndex); // Works. Logs the index of the 'new' OR currently open Modal. 
	
	// Adds data for the selected Modal ('new', 'previous', or 'next') to the modalWindowData object:
	// @param selectedModal - The data for the selected Modal.
	const addModalWindowData = (selectedModal) => {   // Works. Adds selected Modal data to object.
		for (let key in selectedModal) {
			modalWindowData[key] = selectedModal[key];
		}
	};	

	// Gets data for a 'new' Modal window: 
	if (type == 'new') { 
		// Loops through each object in the Modal data array: 
		for (let modal of modalArrayIndex) {
			//console.log(modal); // Works. Logs key-values of each object in the Modal data array.
			// Loops through the keys of the object to check if the id key matches the id of the Modal:
			for (let key in modal) {
				//console.log(key, modal[key]); // Works. Logs key-value pairs of each object.
				//console.log(key); // Works. Isolates and logs each key of each object on separate line.
				//console.log(modal[key]); // Works. Logs values of each object.
				if (modal[key] == selectedModalId) {
					// console.log(modal[key]); // Works. Logs the value as passed by function call. 
					let newModal = modal;
					console.log(newModal);  // Works. Logs the full object of the selected modal.
					addModalWindowData(newModal);
				}
			}
		} 
	}

	//Gets data for the 'previous' Modal window:
	if (type == 'previous') {
		// Gets the data for the 'previous' Modal window based on the index of the currently open Modal:
		// @param currentModal - The index of the currently open Modal (modalWindowIndex).
		// @param modalArray - The index of the inner modal data array that contains the selected Modal (modalArrayIndex). 
		// @return - The data for the Modal that comes before the current Modal.
		// Note: the function accesses the array in a circular manner, accessing the last modal if the current modal is the first one.
		const getPreviousModal = (currentModal, modalArray) => {
			let i = currentModal - 1;
			let n = modalArray.length;
			return modalArray[(i % n + n) % n];
		};

		let previousModal = getPreviousModal(modalWindowIndex, modalArrayIndex);
		console.log(previousModal); // Works. Logs modal in index 2 ("project-3").

		// Calls function to add data for the 'previous' Modal to modalWindowData object:
		addModalWindowData(previousModal); // Works. Logs modal in index 2 ("project-3").
	}

	// Gets data for the 'next' Modal window: 
	if (type == 'next') {
		// Gets the data for the 'next' Modal based on the index of the currently open Modal:
		// @param currentModal - The index of the currently open Modal (modalWindowIndex).
		// @param modalArray - The index of the inner modal data array that contains the selected Modal (modalArrayIndex). 
		// @return - The data for the Modal that comes after the current Modal.
		// - note: the function accesses the array in a circular manner, accessing the first modal if the current modal is the last one.
		const getNextModal = (currentModal, modalArray) => {
			let i = currentModal + 1;
			let n = modalArray.length;
			return modalArray[(i % n + n) % n];
		};

		let nextModal = getNextModal(modalWindowIndex, modalArrayIndex);
		console.log(nextModal); // Works. Logs modal in index 0 ("project-1").

		// Calls function to add data for the 'next' Modal to modalWindowData object:
		addModalWindowData(nextModal); // Works. Logs modal in index 0 ("project-1").
	}

	// Returns the data for the selected Modal's window:
	return modalWindowData; // Works.
};


/* ===== VIEW ===== */

/**
 * NOTE: Do NOT remove eventlistener on Modal HTML elements as this prevents user from clicking (and opening) 
 * the same modal more than once unless the page reloads (and the event listener is added again)! 
*/

/**
 * Adds event listeners to Modal html elements.
 * Calls event handler to prepare a Modal. 
 * @param modalELements - Contains Modal html elements. 
*/

export const addModalEventListener = (modalElements) => {
	for (const element of modalElements) {
		element.addEventListener("click", prepareModalWindow);
	}
};

// TEST CODE for addModalEventListener():
// const prepareModalWindow = () => {
// console.log("Event listener works"); // works
// };


/**
 * Creates and displays a Modal.
 * Adds backdrop to web page to blur the page behind the Modal.  
 * Adds html mark-up for Modal UI.
 * Adds event listeners to the Modal's arrow buttons and close button. 
 * Adds Modal data for the requested Modal to the html mark-up.
 * Accesses the id attribute of the currently open Modal. 
 * @param selectedModalData — Contains the object with the data for the selected Modal.
 * @arg currentModalId - The id attribute value of the currently open Modal. 
*/

const createModalWindow = (selectedModalData) => {
	console.log(selectedModalData);

	// Closes currently open Modal if applicable:
	closeModalWindow();

	// Selects body and main elements:
	const bodyElement = document.querySelector("body"); 
	const mainElement = document.querySelector("main"); 
	
	/* Modal backdrop: */  
	modalBackdrop = document.createElement("div");
	modalBackdrop.classList.add("backdrop-blur");
	bodyElement.insertBefore(modalBackdrop, mainElement); // Works! 
	modalBackdrop.addEventListener("click", closeModalWindow, {once: true}); 

	/* Modal window:*/
	modalWindow = document.createElement("div");
	modalWindow.setAttribute("id", selectedModalData['id']); 
	modalWindow.classList.add("modal-window");
	bodyElement.insertBefore(modalWindow, mainElement);
	// Gets and stores the id of the currently open modal:
	const currentModalId = document.getElementById(selectedModalData['id']).id;
	//console.log(currentModalId); // Logs the value of the id attribute. 

	/* Modal wrapper:*/
	const modalWrapper = document.createElement("div");
	modalWrapper.classList.add("modal-wrapper");
	modalWindow.appendChild(modalWrapper);

	/* Modal image:*/
	const modalImage = document.createElement("figure");
	modalImage.classList.add("modal-image");
	const image = modalImage.appendChild(document.createElement("img"));
	image.src = selectedModalData['image'];
	modalWrapper.appendChild(modalImage);

	/* Modal content:*/
	const modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");
	modalWrapper.appendChild(modalContent);

	/* Modal title:*/
	const modalTitle = document.createElement("h2");
	modalTitle.innerText = selectedModalData['title']; 
	//console.log(selectedModalData); // Works! Logs the title of the passed object.
	modalTitle.classList.add("modal-title");
	modalContent.appendChild(modalTitle);

	/* Modal description:*/
	const modalDescription = document.createElement("div");
	modalDescription.classList.add("modal-description");
	const descriptionText = modalDescription.appendChild(document.createElement("p"));
	descriptionText.innerText = selectedModalData['description'];
	modalContent.appendChild(modalDescription);

	/* Modal links:*/	
	const modalLinks = document.createElement("div");
	modalLinks.classList.add("modal-links");
	
	/* - link 1:*/
	const link_1 = modalLinks.appendChild(document.createElement("div"));
	link_1.classList.add("modalLink-1");
	const linkUrl_1 = link_1.appendChild(document.createElement("a"));
	linkUrl_1.innerText = "Live Site";
	linkUrl_1.setAttribute("href", selectedModalData["firstLink"]);
	linkUrl_1.setAttribute("target", "_blank");
	linkUrl_1.classList.add("modal-links-styling");
	const externalLinkIcon_1 = linkUrl_1.appendChild(document.createElement("i"));
	externalLinkIcon_1.classList.add("fa-solid", "fa-arrow-up-right-from-square");

	/* - link 2:*/
	const link_2 = modalLinks.appendChild(document.createElement("div"));
	link_2.classList.add("modalLink-2");
	const linkUrl_2 = link_2.appendChild(document.createElement("a"));
	linkUrl_2.innerText = "GitHub Repo";
	linkUrl_2.setAttribute("href", selectedModalData["secondLink"]);
	linkUrl_2.setAttribute("target", "_blank");
	linkUrl_2.classList.add("modal-links-styling");
	const externalLinkIcon_2 = linkUrl_2.appendChild(document.createElement("i"));
	externalLinkIcon_2.classList.add("fa-solid", "fa-arrow-up-right-from-square");
	
	modalContent.appendChild(modalLinks);

	/* Modal navigation buttons:*/
	// - note: Button element needs attribute: .setAttribute('type', 'button');
	const modalNavigation = document.createElement("div");
	modalNavigation.classList.add("modalNavigation");
	
	/* - arrow buttons:*/
	const arrowButtons = modalNavigation.appendChild(document.createElement("ul"));
	arrowButtons.classList.add("arrowButtons");

	/* - previous and next arrow:*/
	const arrowPrevious = arrowButtons.appendChild(document.createElement("li"));
	arrowPrevious.classList.add("arrowPrevious", "circle");
	const arrowNext = arrowButtons.appendChild(document.createElement("li"));
	arrowNext.classList.add("arrowNext", "circle");
	
	const previousModal = arrowPrevious.appendChild(document.createElement("button"));
	previousModal.setAttribute("type", "button");
	previousModal.setAttribute("data-navigation", "previous");
	previousModal.classList.add("previousModal");
	const arrowIconPrevious = previousModal.appendChild(document.createElement("i"));
	arrowIconPrevious.classList.add("fa-solid", "fa-chevron-left");
	// Adds event listener to 'previous' button and passes the id of the currently open Modal:
	// https://plainenglish.io/blog/passing-arguments-to-event-listeners-in-javascript-1a81bc397ecb
	previousModal.addEventListener("click", (event) => {
		prepareModalWindow(event, currentModalId, {once: true});
	}); 
	
	const nextModal = arrowNext.appendChild(document.createElement("button"));
	nextModal.setAttribute("type", "button");
	nextModal.setAttribute("data-navigation", "next");
	nextModal.classList.add("nextModal");
	const arrowIconNext = nextModal.appendChild(document.createElement("i"));
	arrowIconNext.classList.add("fa-solid", "fa-chevron-right");
	// Adds event listener to 'next' button and passes the id of the currently open Modal:
	nextModal.addEventListener("click", (event) => {
		prepareModalWindow(event, currentModalId, {once: true});
	}); 
	
	/* - close button:*/
	const closeButton = modalNavigation.appendChild(document.createElement("div"));
	closeButton.classList.add("closeButton");
	const closeModal = closeButton.appendChild(document.createElement("button"));
	closeModal.setAttribute("type", "button");
	closeModal.innerText = "Close";
	closeModal.classList.add("closeButton-style");
	closeModal.addEventListener("click", closeModalWindow, {once: true}); 

	modalWrapper.appendChild(modalNavigation);

	/* Modal navigation - keyboard:*/
	// Checks what key the user pressed and either closes the Modal Window or passes the id of the currently open Modal:
	const checkNavigationKey = (event) => {
		console.log(event); // Works. Logs KeyBoardEvent object for Arrows and Esc. See "key" property for code. 
		if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
			prepareModalWindow(event, currentModalId);
		} else if (event.key == "Escape") {
			closeModalWindow(); // Works. Closes modal window. 
		}
	};
	// Adds event listener to 'body' element:
	bodyElement.addEventListener("keyup", checkNavigationKey, {once: true}); 
};


/* ===== CONTROLLER ===== */

/**
 * Checks if a Modal is currently open.
 * Closes the open Modal and removes the modal backdrop.
*/

export const closeModalWindow = () => {    
	if (modalWindow) {
		modalWindow.remove(); // Element.remove() removes the element from the DOM.
 	}
	if (modalBackdrop) {
		modalBackdrop.remove(); // Element.remove() removes the element from the DOM.
	}
};


/**
 * Prepares data for a Modal window based on user selection.
 * For user selection of 'new' Modal: Gets the Modal id via html attribute from the event object.
 * - note: Use the currentTarget property as it always refers to the element to which the event handler has been attached (vs. event.target which identifies the element on which the event occurred).
 * For user selection of 'previous' or 'next' Modal: Gets the currently open Modal's id passed by the event listener.  
 * Calls Model to get data for the selected Modal, passing Modal type and id. 
 * Calls View to create a Modal, passing the data for selected Modal.  
 * @param event - The event object to get the type and id for the selected Modal AND the value of the arrow keyboard key pressed. 
 * @param modalId - The id attribute value for the currently open Modal.  
 * @arg type — The Modal type to get data for ('new', 'previous', or 'next').
 * @arg selectedModalId — The Modal id attribute value. Used for finding data for 'new', 'previous', or 'next' Modal.
 * @arg selectedModalData — The data for the selected Modal.
 */

const prepareModalWindow = (event, modalId) => {
	// Gets and stores the type of Modal selected ('new', 'previous', or 'next'):
	let modalType = event.currentTarget.dataset.navigation;
	//console.log(modalType);
	//console.log(event);

	// Gets the id of the selected Modal:
	let selectedModalId = event.currentTarget.id;
	console.log(selectedModalId);// Works. Logs id value for 'new' modal, but NOTHING for prev/nxt modal. 
	
	// Gets and stores the value of the arrow keyboard key pressed by user ('ArrowLeft' or 'ArrowRight'):
	let arrowKey = event.key;
	console.log(arrowKey); // Works. Logs key value for both arrow keys.

	// Assigns the id of the currently open Modal to a variable when user clicks 'previous' or 'next' buttons or uses arrow keys:
	let openModalId = modalId; 
	console.log(openModalId); // Works! 


	// Checks and reassigns the value of the 'type' variable based on user selection: 
	let type = 'new';
	if (modalType || arrowKey) {
		if (modalType === 'previous' || arrowKey === 'ArrowLeft') {
			type = 'previous';
		}
		else if (modalType === 'next' || arrowKey === 'ArrowRight') {
			type = 'next';
		}
	}
	console.log(type); // Works! Logs 'new' as well as 'next'/'previous' when click on arrow buttons AND arrow keys.

	// Checks and reassigns the value of the 'selectedModalId' variable when user clicks 'previous' or 'next' buttons:
	if (openModalId) {
		selectedModalId = openModalId;
	}
	console.log(selectedModalId); //Works! Logs the id of the OPEN modal (and View displays the previous modal in correct order)

	// Calls Model to get Modal data and stores the returned data:
	let selectedModalData = getModalData(type, selectedModalId);

	// Calls View and passes the data for the selected Modal: 
	createModalWindow(selectedModalData);
};




