/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Reviews.js":
/*!************************!*\
  !*** ./src/Reviews.js ***!
  \************************/
/***/ (() => {

eval("// Function to dynamically create and append images\nfunction loadImages() {\n  const reviewsContainer = document.getElementById('reviewsContainer');\n  const totalImages = 9; // Change this to the total number of images you have\n\n  for (let i = 1; i <= totalImages; i++) {\n    const img = document.createElement('img');\n    img.src = `../src/images/reviews/img${i}.png`; // Construct the image source dynamically\n    img.alt = `Review Image ${i}`; // Customize alt text as needed\n    img.className = \"review-image\"; // Add the class for styling\n\n    reviewsContainer.appendChild(img); // Append image to the container\n  }\n}\n\n// Call the function to load images when the page loads\nwindow.onload = loadImages;\n\n//# sourceURL=webpack://vinomio/./src/Reviews.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/Reviews.js"]();
/******/ 	
/******/ })()
;