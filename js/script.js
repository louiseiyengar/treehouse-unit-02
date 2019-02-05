/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
   ***/
// const numPerPage = 10;

// const ulStudentList = document.querySelector("ul.student-list");
// const list = ulStudentList.children;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function createErrorMessage(errorMessage, parentDiv) {
   const errorDiv = document.createElement("div");
   parentDiv.appendChild(errorDiv);
   errorDiv.className = "error";
   errorDiv.innerHTML = errorMessage;
}

function removeErrorMessage(searchDiv) {
   const errorDiv = document.getElementsByClassName("error")[0];
   if (errorDiv) {
      searchDiv.removeChild(errorDiv);
   }
}

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

function initialSearchNav() {
   paginationDiv = document.getElementsByClassName("pagination")[0];
   paginationUL = paginationDiv.firstElementChild.style.display = "none";

}

const createSearchList = (list, userInput) => {
   let count = 0;
   let nameArray;
   let email;

   for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
   }

   userInput = userInput.trim().toLowerCase().replace(/  +/g, ' ');
   userInputArray = userInput.  split(" ");

   for (let j = 0; j <  list.length; j++) {
      let name = list[j].firstElementChild.children[1].innerHTML;
      nameArray = name.split(" ");

      email = list[j].firstElementChild.children[2].innerHTML
      if (userInputArray.length > 1) {
         if (name.search(userInput) === 0) {
            list[j].style.display = "";
            count++;
         }
      } else {
         if (email.search(userInput) === 0) {
            list[j].style.display = "";
            count++;
         } else {
            if ((nameArray[0].search(userInputArray[0]) === 0) || (nameArray[1].search(userInputArray[0]) === 0)) {
               list[j].style.display = "";
               count++;
            }
         }
      }
   }
   return count;
}
 
const addSearchForm = (list) => {
   searchForm = createSearchArea ();

   searchInput = searchForm.firstElementChild;
   searchDiv = searchForm.parentNode;

   searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      removeErrorMessage(searchDiv);
      
      const userInput = searchInput.value; 
      if (!userInput.trim()) {
         createErrorMessage("Please enter a student name or email to search", searchDiv);
      } else {
         const numToShow = createSearchList(list, userInput);

         if (numToShow === 0) {
            createErrorMessage("Your search found no students", searchDiv);
         }
      }
   });

   searchInput.addEventListener('keyup' , (e) => {
      removeErrorMessage(searchDiv);
      
      const userInput = searchInput.value;
      if (!userInput.trim()) {
         showAllStudents(list, 1);
      } else {
         const numToShow = createSearchList(list, userInput);

         if (numToShow === 0) {
            createErrorMessage("Your search found no students", searchDiv);
         }  
      }
   });
}

const processSearchLinks = () => {

}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list, numToShow, isSearch) => {
   const numPages = Math.ceil(numToShow / numPerPage);

   const pageDiv = document.querySelector(".page");


   const pagingDiv = document.createElement("div");
   const pagingUL = document.createElement("ul");
   pagingDiv.className = "pagination";
   pageDiv.appendChild(pagingDiv).appendChild(pagingUL);

   for (let i = 1; i <= numPages; i++) {
      let pageLI = document.createElement("li");
      let pageA = document.createElement("a");
      pageA.href = "#";
      pageA.innerHTML = i;
      pagingUL.appendChild(pageLI).appendChild(pageA);
   }
    pagingUL.firstElementChild.firstElementChild.className = "active";

    pagingUL.addEventListener ('click', (e) => {
      e.preventDefault();
      if (e.target.tagName === "A") {
         pagingUL.querySelectorAll("a").forEach ((navLink) => {
            navLink.removeAttribute("class");
         });
         e.target.className = "active";
         showAllStudents(list, e.target.innerHTML);
         window.scroll(0,0);
      }
    });
}

const showAllStudents = (list, page) => {
   const lastStudent = list.length;
   const firstPageStudent = (numPerPage * (parseInt(page) - 1) + 1);
   let lastPageStudent = numPerPage * page;
   if (lastPageStudent > lastStudent) { 
      lastPageStudent = lastStudent; 
   }

   for (let i = 1; i <= lastStudent; i++) {
      if ((i < firstPageStudent || i > lastPageStudent)) {
         list[i - 1].style.display = "none";
      } else {
         list[i - 1].style.display = "";
      }
   }
}

const numPerPage = 10;
document.addEventListener('DOMContentLoaded', () => {
   const ulStudentList = document.querySelector("ul.student-list");
   const list = ulStudentList.children;
   appendPageLinks(list, list.length, false);
   showAllStudents(list,1);
   addSearchForm(list);
});




// Remember to delete the comments that came with this file, and replace them with your own code comments.