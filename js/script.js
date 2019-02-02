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
const numPerPage = 10;

const ulStudentList = document.querySelector("ul.student-list");
const list = ulStudentList.children;



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




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   const pageDiv = document.querySelector(".page");

   const numPages = Math.ceil(list.length / numPerPage);
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

    pagingUL.addEventListener ('click', (e) => {
      e.preventDefault();
      let navLinks = pagingUL.querySelectorAll("a");
      for (let i = 0; i < navLinks.length; i++) {
         navLinks[i].className = "";
         // if (navLinks[i].classList.contains("active")) {
         //    navLinks[i].classList.remove("active");
         // }
      }
      e.target.className = "active";
    });
    
}

appendPageLinks(list);




// Remember to delete the comments that came with this file, and replace them with your own code comments.