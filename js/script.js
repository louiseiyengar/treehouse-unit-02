/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
   This function inserts an error message that might appear below the search form.
*/
function createErrorMessage(errorMessage, parentDiv) {
   const errorDiv = document.createElement("div");
   parentDiv.appendChild(errorDiv);
   errorDiv.className = "error";
   errorDiv.innerHTML = errorMessage;
}

/*
   This function removes an error message that might appear below the Search form
*/
function removeErrorMessage() {
   const searchDiv = document.getElementsByClassName("student-search")[0];
   const errorDiv = document.getElementsByClassName("error")[0];
   if (errorDiv) {
      searchDiv.removeChild(errorDiv);
   }
}

/*
   This function removes the view 'All Students' button, if it exists on the page.
*/
function removeAllStudentButton() {
   const allStudents = document.querySelector("div.allStudents");
   if (allStudents) {
      allStudents.parentNode.removeChild(allStudents);   //remove the 'view all students' button
   }
}

/*
   This function ensures that only the navigation link for the page
   currently being displayed is active.
*/
function activeNavLinks(page) {
   const navAnchors = document.querySelectorAll(".pagination li a");

   if (navAnchors.length) {
      Array.from(navAnchors).forEach(function(navAnchor) {
         navAnchor.classList.remove("active");
      });
      navAnchors[page - 1].className = "active";
   }
}

/*
   This function adds a Search Form to the top right corner of the page.
   It returns the search form element so event listeners can be added.
*/
function createSearchArea () {
   const headerDiv = document.querySelector(".page-header");
   const searchDiv = document.createElement("div");
   const searchForm = document.createElement("form");
   const searchInput = document.createElement("input");
   const searchButton = document.createElement("button");

   searchDiv.className = "student-search";
   searchInput.placeholder = "Search for students...";
   searchButton.innerHTML = "Search";

   headerDiv.appendChild(searchDiv).appendChild(searchForm).appendChild(searchInput);
   searchForm.appendChild(searchButton);
   return searchForm;
}

/*
   This function adds a div and ul to the page for the page navigation LI's to go
*/
function createPageNavArea () {
   const pageDiv = document.querySelector(".page");
   const pagingDiv = document.createElement("div");
   const pagingUL = document.createElement("ul");
   pagingDiv.className = "pagination";
   pageDiv.appendChild(pagingDiv).appendChild(pagingUL);
   return pagingUL;
}

/*
   This function will remove the LI page navigation elements
*/
function removePageNav() {
   paginationUL = document.querySelector(".pagination ul");
   //[found this method of cycling through to remove all children on stack overflow]
   while (paginationUL.hasChildNodes()) {   
      paginationUL.removeChild(paginationUL.firstChild);
    }
}

/*
   This function creates a button for the search.  It allows the user to view
   all student pages after the search is complete.
   - It also adds a click event listener to create the 'all students' pages.
*/
function createAllStudentsButton(list) {
   paginationDiv = document.querySelector("div.pagination");
 
   //Creates a div for the 'all students' button (which is actually not a button)
   const allStudentDiv = document.createElement("div");
   allStudentDiv.className = "allStudents";
   const pageA = document.createElement("a");
   pageA.href = "#";
   pageA.innerHTML = "View All Students";
   paginationDiv.appendChild(allStudentDiv).appendChild(pageA);

   //Click event listenter for 'All Students' button.  Will cause full student list to show.
   pageA.addEventListener("click", () => {
      appendPageLinks(list);
      showStudents(list, 1);
      //removes user input from search form input
      document.querySelector(".student-search input").value = "";
      removeAllStudentButton();
      searchArray = [];       //empty array of searched students, since search is over.
   });
}

/*
   This function performs the student search.  It takes user input, 
   and name, email from the student list, and compares them.
   - First it sets all students to display = none.
   - Then it checks input to see if it matches any part of first name, last name or email.
   - Students found in the search are pushed into a searchArray
*/
const createSearchList = (list, userInput) => {
   let nameArray;
   let name;
   let fName;
   let lName;
   let email;
   searchArray = [];

   //Set display = none to all students
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
   }

   //CREATE ARRAY OF FOUND STUDENTS -- push li elements for students that match user input
   //if user enters more than one space between characters, ensure only one space
   userInput = userInput.trim().toLowerCase().replace(/  +/g, ' ');   

   for (let j = 0; j <  list.length; j++) {
      name = list[j].firstElementChild.children[1].innerHTML; //get student name

      //get first and last names to check
      nameArray = name.split(" "); //create array for student name to examine first and last name
      fName = nameArray.shift();
      lName = nameArray.join(" "); //if more than one space in rest of name (ie. lilou le gall)
      
      email = list[j].firstElementChild.children[2].innerHTML

      //compare student name to user input, push ot searchArray if match found
      if ((name.search(userInput) === 0) 
      || (email.search(userInput) === 0) 
      || (fName.search(userInput) === 0)
      || (lName.search(userInput) === 0)) {
            searchArray.push(list[j]);
      }
   }
   return (searchArray)  //Return the array of students found in search
}

/*
   This function will call another function to create and display a search of students.  It will 
   also put a Nav button on the page so the user can go back to viewing the full student list.
*/
function displaySearchStudents(userInput, searchDiv, list) {
   const numToShow = createSearchList(list, userInput).length;  //Create and display List of students that meet Search criteria
   allStudentsButton = document.querySelector("div.allStudents");
   if (!allStudentsButton) {
      createAllStudentsButton(list);      //put a button on the page so user can view all students after seeing search.
   }
   if (numToShow === 0) {
      createErrorMessage("Your search found no students", searchDiv);
   } else {
         appendPageLinks(searchArray);
         showStudents(searchArray, 1);
      }
}
 
/*
   This function will put a search form and search button on the page.  
   It puts on two event listeners:
   - a 'submit' event for the submit button to perform a search for the student named
     in the input field.
   - a keyup event to search for students based on the user input value in the input field.
*/
const addSearchForm = (list) => {
   searchForm = createSearchArea ();   //put the search input and button on the page

   searchInput = searchForm.firstElementChild;
   searchDiv = searchForm.parentNode;

   //event listener to submit the Search Form
   searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      removeErrorMessage();      //remove error message if one exists from previous search
      removePageNav();
      
      const userInput = searchInput.value; //get user input
      if (!userInput.trim()) {
         createErrorMessage("Please enter a student name or email to search", searchDiv);
         appendPageLinks(list);
      } else {
         displaySearchStudents(userInput, searchDiv, list); //find and display students who match input value
      }
   });

   //event listener for keyup event the Search Form
   searchInput.addEventListener('keyup' , (e) => {
      removePageNav();
      removeErrorMessage();   //remove error message if one exists from previous search
      
      const userInput = searchInput.value;   //get user input
      if (!userInput.trim()) {   //This will occur if user backspaces and deletes value in search input field
         appendPageLinks(list);
         showStudents(list, 1);  //In that case, show all student list again.
         removeAllStudentButton();
      } else {
         displaySearchStudents(userInput, searchDiv, list); //find and display students who match input value
      }
   });
}

/*
   This function will show all students for one page, the number of students is
   set in the global constant numPerPage.
*/
const showStudents = (list, page) => {
   removeErrorMessage();   //remove the an error message from the search are if it exists from the search
   activeNavLinks(page);   //set active class on approprate page link

   //determine first and last students to appear on a page.
   const lastStudent = list.length;
   const firstPageStudent = (numPerPage * (parseInt(page) - 1) + 1);
   let lastPageStudent = numPerPage * page;
   if (lastPageStudent > lastStudent) { 
      lastPageStudent = lastStudent; 
   }
  
   //loop through list collection to display appropriate students on a page.
   for (let i = 1; i <= lastStudent; i++) {
      if ((i < firstPageStudent || i > lastPageStudent)) {
         list[i - 1].style.display = "none";
      } else {
         list[i - 1].style.display = "";
      }
   }
}

/*
   This function will put the appropriate number of navigation page links for all students.
*/
const appendPageLinks = (list) => {

   const numPages = Math.ceil(list.length / numPerPage);
   let pagingUL = document.querySelector(".pagination ul");
   if (!pagingUL) {
      //create a page navigation area
         pagingUL = createPageNavArea ();
   } 
   
   removePageNav();     //remove current navigation page links, if any
   
   //add links and anchors for each page
   if (numPages > 1) {
      for (let i = 1; i <= numPages; i++) {
         let pageLI = document.createElement("li");
         let pageA = document.createElement("a");
         pageA.href = "#";
         pageA.innerHTML = i;
         pagingUL.appendChild(pageLI).appendChild(pageA);
      }

      //event listener for each page navigation button
      pagingUL.addEventListener ('click', (e) => {
         e.preventDefault();
         if (e.target.tagName === "A") {
            //when page nav button clicked, show students for that page.
            if (searchArray.length) {
               showStudents(searchArray, e.target.innerHTML);  //if a search
            } else {
               showStudents(list, e.target.innerHTML);         //if showing all students
            }   
            window.scroll(0,0);     //scroll to top of new page.
         }
      });
   }
}

//BEGIN
const numPerPage = 10;  //Number of students to appear on one page
let searchArray = [];   //This will be the array of students from a search

/*
   For this event listener, when DOM Content is loaded, 
   - get list of students from HTML page
   - append nav page links
   - show all students on approprate pages
   - add a search input field and search button
*/
document.addEventListener('DOMContentLoaded', () => {
   const list = document.querySelector("ul.student-list").children;

   appendPageLinks(list);
   showStudents(list,1);
   addSearchForm(list);
});
