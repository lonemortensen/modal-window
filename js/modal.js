/* ====================================================================
Project:  Modal Windows
Author:  Lone Mortensen

===== *** =====

The modal.js module:
- imports function from modalData.js to access modal data.
- processes user's selection of modal, incl.:
	-- detects and identifies modal selection, 
	-- finds the matching modal data, and 
	-- renders selected modal's data and all it's html to web page.
- exports event handler that closes any open modals for use in main.js. 
- exports event handler that adds event listeners to each modal 
html element for use in main.js.
==================================================================== */

/**
 * Imports. 
*/

// Function that gets data for all the modals:
import {accessData} from "./data/modalData.js";


/** 
 * Global variables.
*/

// NOTE!!! Consider if some of global variables can be exported from their respective functions instead???? Seems like better JS practice...
// Won't work for currentModalId

// modalBackdrop and modalWindow: 
// Holds DOM html mark-up for backdrop and modal window. 
// Values assigned in the createModalWindow() function.
// Must be accessible to the closeModalWindow() function. 
let modalBackdrop; 
let modalWindow; 

// bodyElement:
// Selects the html body element for insertion of modal backdrop and window in the DOM. 
// Must be accessible to the checkNavigationKey() function for keyboard navigation.
const bodyElement = document.querySelector("body"); 

// currentModalId:
// Value assigned in the createModalWindow() function.
// Must be accessible to the checkNavigationKey() function for keyboard navigation.
let currentModalId; 


/* ===== MODEL ===== */

/**
 * Gets modal window data. 
 * Finds and returns data for the user-selected modal's window as an object.
 * @param type — Type of modal to get data for: 'new', 'next', or 'previous'.
 * @param selectedModalId — Html id attribute value of the modal selected by the user. 
 * @return — Object containing the data for the selected modal's window.
*/
const getModalData = (type, selectedModalId) => {
	// Gets and stores 2D array with modal data:
	let modalData = accessData(); 
	
	// Stores the object data for the selected modal's window:
	let modalWindowData = {};

	// Callback function: 
	// Checks if at least one 1D array meets callback condition of containing an object id value matching the selectedModalId. 
	// @return - True or false.
	const findModalArrayIndex = (innerArray) => {
    	return innerArray.some(modal => modal.id === selectedModalId);
	};
	// Iterates over 2D array: 
	// Finds index of the first 1D array that meets callback function condition. 
	const foundArrayIndex = modalData.findIndex(findModalArrayIndex);
	// Stores the 1D array that contains an object id value matching the selectedModalId:  
	let modalArray = modalData[foundArrayIndex];

	// Finds and stores the index of the selected modal:
	// Iterates over the 1D array with an object id value matching the selectedModalId. 
	// - note: Gets the currently open modal's index when user selects 'previous' or 'next' modal.
	let modalWindowIndex = modalArray.findIndex(modal => modal.id === selectedModalId);
	
	// Adds data for the selected modal to the modalWindowData object as key-value pairs:
	// @param selectedModal - The data for the selected modal.
	const addModalWindowData = (selectedModal) => {   
		for (let key in selectedModal) {
			modalWindowData[key] = selectedModal[key];
		}
	};	

	// Gets data for a 'new' modal window: 
	if (type == 'new') { 
		// Loops through each object in the modal array: 
		for (let modal of modalArray) {
			// Loops through object keys to check if their value match the selectedModalId:
			for (let key in modal) {
				if (modal[key] === selectedModalId) {
					let newModal = modal;
					addModalWindowData(newModal);
				}
			}
		} 
	}

	//Gets data for the 'previous' modal window:
	if (type == 'previous') {
		// Gets data for 'previous' modal window based on index of currently open modal window:
		// @param currentModal - Index of the currently open modal (modalWindowIndex).
		// @param modalArray - The 1D modal array that contains the selected modal (modalArray). 
		// @return - Data for the modal that comes before the current modal.
		// - note: function accesses array in a circular manner, accessing the last modal if the current modal is the first one.
		const getPreviousModal = (currentModal, modalArray) => {
			let i = currentModal - 1;
			let n = modalArray.length;
			return modalArray[(i % n + n) % n];
		};
		
		let previousModal = getPreviousModal(modalWindowIndex, modalArray);

		// Adds data for the 'previous' modal to modalWindowData object:
		addModalWindowData(previousModal); 
	}

	// Gets data for the 'next' modal window: 
	if (type == 'next') {
		// Gets data for 'next' modal based on index of currently open modal window:
		// @param currentModal - Index of the currently open modal (modalWindowIndex).
		// @param modalArray - The 1D modal array that contains the selected modal (modalArray). 
		// @return - Data for the modal that comes after the current modal.
		// - note: function accesses array in a circular manner, accessing the first modal if the current modal is the last one.
		const getNextModal = (currentModal, modalArray) => {
			let i = currentModal + 1;
			let n = modalArray.length;
			return modalArray[(i % n + n) % n];
		};

		let nextModal = getNextModal(modalWindowIndex, modalArray);

		// Adds data for the 'next' modal to modalWindowData object:
		addModalWindowData(nextModal); 
	}

	// Returns the data for the selected modal's window:
	return modalWindowData; 
};


/* ===== VIEW ===== */

/**
 * Adds event listeners to modal html elements.
 * Calls event handler to prepare a modal window. 
 * Exports function for use in main.js.
 * NOTE: Do not remove eventlistener on modal html elements as this prevents 
 * user from clicking (opening) the same modal more than once unless the 
 * page reloads and an event listener is added again. 
 * @param modalELements - Modal html elements. 
*/
export const addModalEventListener = (modalElements) => {
	for (const element of modalElements) {
		element.addEventListener("click", prepareModalWindow);
	}
};


/**
 * Creates and displays a modal window:
 * Adds blurred backdrop to web page.  
 * Adds html mark-up and css styling for modal window UI.
 * Adds event listeners to the modal window arrow and close buttons. 
 * Adds data for the selected modal to the html mark-up.
 * Accesses the html id attribute of the currently open modal. 
 * @param selectedModalData — Object with data for the selected modal.
 * @arg currentModalId - Id attribute value of the currently open modal window. 
*/
const createModalWindow = (selectedModalData) => {
	closeModalWindow();

	// Selects main element for insertion of modal backdrop and window:
	const mainElement = document.querySelector("main"); 
	
	/* Modal backdrop: */  
	modalBackdrop = document.createElement("div");
	modalBackdrop.classList.add("backdrop-blur");
	bodyElement.insertBefore(modalBackdrop, mainElement); 
	modalBackdrop.addEventListener("click", closeModalWindow, {once: true}); 

	/* Modal window:*/
	modalWindow = document.createElement("div");
	modalWindow.setAttribute("id", selectedModalData['id']); 
	modalWindow.classList.add("modal-window");
	bodyElement.insertBefore(modalWindow, mainElement);
	// Gets and stores the html id attribute value of the currently open modal window:
	currentModalId = document.getElementById(selectedModalData['id']).id;

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
	
	/* -- link 1:*/
	const link_1 = modalLinks.appendChild(document.createElement("div"));
	link_1.classList.add("modalLink-1");
	const linkUrl_1 = link_1.appendChild(document.createElement("a"));
	linkUrl_1.innerText = "Live Site";
	linkUrl_1.setAttribute("href", selectedModalData["firstLink"]);
	linkUrl_1.setAttribute("target", "_blank");
	linkUrl_1.classList.add("modal-links-styling");
	const externalLinkIcon_1 = linkUrl_1.appendChild(document.createElement("i"));
	externalLinkIcon_1.classList.add("fa-solid", "fa-arrow-up-right-from-square");

	/* -- link 2:*/
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
	const modalNavigation = document.createElement("div");
	modalNavigation.classList.add("modalNavigation");
	
	/* -- arrow buttons:*/
	const arrowButtons = modalNavigation.appendChild(document.createElement("ul"));
	arrowButtons.classList.add("arrowButtons");

	/* -- previous and next arrow:*/
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
	// Adds event listener to 'previous' button and passes id attribute value of currently open modal:
	previousModal.addEventListener("click", (event) => {
		prepareModalWindow(event, currentModalId, {once: true});
	}); 
	
	const nextModal = arrowNext.appendChild(document.createElement("button"));
	nextModal.setAttribute("type", "button");
	nextModal.setAttribute("data-navigation", "next");
	nextModal.classList.add("nextModal");
	const arrowIconNext = nextModal.appendChild(document.createElement("i"));
	arrowIconNext.classList.add("fa-solid", "fa-chevron-right");
	// Adds event listener to 'next' button and passes id attribute value of currently open modal:
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
};


/**
 * Checks key values for keyboard navigation in modal windows:
 * -- If user presses arrow keys: Calls prepareModalWindow() and passes id 
 * attribute value of the currently open modal (currentModalId).
 * -- If user presses escape key: Closes the modal window.
 * @param event - To get the key value for the arrow and escape keys. 
*/
const checkNavigationKey = (event) => {
	if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
		// Prevents 'keyup' event listener from firing multiple times:
		let isKeyUpHandled = false;
		if (!isKeyUpHandled) {
			prepareModalWindow(event, currentModalId);
			isKeyUpHandled = true;		
			console.log(isKeyUpHandled);
		}
	} else if (event.key == "Escape") {
		closeModalWindow(); 
	}
};

bodyElement.addEventListener("keyup", checkNavigationKey); 


/* ===== CONTROLLER ===== */

/**
 * Closes any open modal window and removes modal backdrop:
 * Exports function for use in main.js.
*/
export const closeModalWindow = () => {    
	if (modalWindow) {
		modalWindow.remove(); 
 	}
	if (modalBackdrop) {
		modalBackdrop.remove(); 
	}
};


/**
 * Requests and passes data for a modal window based on user selection:
 * -- If user selects 'new' modal: The modal id is obtained from the html id attribute via the event object.
 * -- If user selects 'previous' or 'next' modal: The currently open modal's html id attribute value is passed 
 * in as a parameter and the open modal's index is later used to find the next or previous modal. 
 * @param event - To get the type and id values for the selected modal (click and keyboard events). 
 * @param modalId - The id attribute value for the currently open modal.  
 * @arg type — The modal type to get data for: 'new', 'previous', or 'next'.
 * @arg selectedModalId — The modal id attribute value. Used to find data for 'new', 'previous', or 'next' modal.
 * @arg selectedModalData — The data for the selected modal.
 */
const prepareModalWindow = (event, modalId) => {
	console.log(modalId); 

	// The id attribute value of the selected modal: 
	// Checks and (re)assigns the value of the 'selectedModalId' variable based on user selection.
	let selectedModalId = event.currentTarget.id; 
	let openModalId = modalId;   
	console.log(openModalId);
	
	if (openModalId) {
			selectedModalId = openModalId;
	} 
	console.log(selectedModalId);

	// The type of modal selected:  
	// Checks and re-assigns the value of the 'type' variable based on user selection.
	// Uses click and keyboard events to assign type for 'previous' and 'next' modal.  
	let modalType = event.currentTarget.dataset.navigation; 
	let arrowKey = event.key; 
	console.log(arrowKey);
		
	let type = 'new';
	if (modalType || arrowKey) {
		if (modalType === 'previous' || arrowKey === 'ArrowLeft') {
			type = 'previous';
		}
		else if (modalType === 'next' || arrowKey === 'ArrowRight') {
			type = 'next';
		}
	}
	console.log(type);

	// Requests data for selected modal:
	let selectedModalData = getModalData(type, selectedModalId);

	// Passes data for selected modal for rendering: 
	createModalWindow(selectedModalData);
};




