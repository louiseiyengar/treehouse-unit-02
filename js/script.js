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
   This function is invoked when we view all students after having
   made a search.  It re-displays all page navigation links and removes the view
   'All Students' button.
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
   return (pagingUL);
}

function removePageNav() {
   paginationUL = document.querySelector(".pagination ul");
   while (paginationUL.hasChildNodes()) {   
      paginationUL.removeChild(paginationUL.firstChild);
    }
}

/*
   This function creates a navigation button for the search.  It allows the user to view
   all student pages after the search is complete.
   - It also adds a click event listener to create the 'all students' pages.
*/
function createAllStudentsButton(list) {
   paginationDiv = document.querySelector("div.pagination");
  // removePageNav();

   //sets the existing page navigation links to display = none

   
   // Array.from(paginationLIs).forEach(function(navLink) {
   //    navLink.style.display = "none";
   // });
   //Creates a div for the 'all students' button (which is actually not a button)
   const allStudentDiv = document.createElement("div");
   allStudentDiv.className = "allStudents";
   const pageA = document.createElement("a");
   pageA.href = "#";
   pageA.innerHTML = "Click for All Students List";
   paginationDiv.appendChild(allStudentDiv).appendChild(pageA);

   //Click event listenter for 'All Students' button.  Will cause full student list to show.
   pageA.addEventListener("click", () => {
      appendPageLinks(list);
      showAllStudents(list, 1);
      document.querySelector(".student-search input").value = "";    //removes user input from search form input
      removeAllStudentButton();
      searchArray = [];
   });
}

/*
   This function performs the student search.  It takes user input
   and the student list, and compares them.
   - First it sets all students to display = none.
   - Then it checks input to see if it matches any part of first name, last name or email.
      If so, then it removes display = none
*/
const createSearchList = (list, userInput) => {
   let count = 0;
   let nameArray;
   let email;
   searchArray = [];

   //Set display = none to all students
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
   }

   //if user enters more than one space between characters, ensure only one space
   userInput = userInput.trim().toLowerCase().replace(/  +/g, ' ');   
   //Split user input into an array so first name and last name can be viewed.
   userInputArray = userInput.split(" ");

   for (let j = 0; j <  list.length; j++) {
      let name = list[j].firstElementChild.children[1].innerHTML; //get student name
      nameArray = name.split(" "); //create array for student name to examine first and last name

      email = list[j].firstElementChild.children[2].innerHTML
      if (userInputArray.length > 1) {    //If user input matches name
         if (name.search(userInput) === 0) {
            //list[j].style.display = "";
            searchArray.push(list[j]);
            //count++;
         }
      } else {
         if (email.search(userInput) === 0) {   //If user input matches email
            //list[j].style.display = "";
            searchArray.push(list[j]);
         //   count++;
         } else {
            //check first and last name against user input
            if ((nameArray[0].search(userInputArray[0]) === 0) || (nameArray[1].search(userInputArray[0]) === 0)) {
              // list[j].style.display = "";
              searchArray.push(list[j]);
              // count++;
            }
         }
      }
   }

   // if (searchArray.length <= numPerPage) {
   //    appendPageLinks(searchArray, true);
   //    searchArray.forEach(function(student) {
   //       student.style.display = "";
   //     });

   // }
   return (searchArray)  //return number of students found in search for error processing/
}

/*
   This function will call another function to create and display a search of students.  It will also put a 
   Nav button on the page so the user can go back to viewing the full student list.
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
         //TO DO: navigation for more> 10 search students
         //appendPageLinks(searchArray);
         appendPageLinks(searchArray);
         showAllStudents(searchArray, 1);
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
         showAllStudents(list, 1);  //In that case, show all student list again.
         removeAllStudentButton();
      } else {
         displaySearchStudents(userInput, searchDiv, list); //find and display students who match input value
      }
   });
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
   //sets the existing page navigation links to display = none
   removePageNav();
   
   //add links and anchors for each page
   if (numPages > 1) {
      for (let i = 1; i <= numPages; i++) {
         let pageLI = document.createElement("li");
         let pageA = document.createElement("a");
         pageA.href = "#";
         pageA.innerHTML = i;
         pagingUL.appendChild(pageLI).appendChild(pageA);
      }

      let clickList;
      //event listener for each page navigation button
      pagingUL.addEventListener ('click', (e) => {
         if (searchArray.length) {
            clickList = searchArray;
         } else {
            clickList = list;
         }
         e.preventDefault();
         if (e.target.tagName === "A") {
            showAllStudents(clickList, e.target.innerHTML);   //when page nav button clicked, show students for that page.
            
            window.scroll(0,0);     //scroll to top of new page.
         }
      });
   }
}



/*
   This function will show all students for one page, the number of students is
   set in the global constant numPerPage.
*/
const showAllStudents = (list, page) => {
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

//BEGIN
const numPerPage = 10;  //Number of students to appear on one page
let searchArray = [];

/*
   For this event listener, when DOM Content is loaded, 
   - get list of students from HTML page
   - show all students on approprate pages
   - append nav page links
   - add a search input field and search button
*/
document.addEventListener('DOMContentLoaded', () => {
   const list = document.querySelector("ul.student-list").children;

   appendPageLinks(list);
   showAllStudents(list,1);
   addSearchForm(list);
});
