const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("book");
const mealDetailsContent = document.querySelector(".book-details-content");
const recipeCloseBtn = document.getElementById("details-close-btn");

searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});


function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInputTxt}&key=AIzaSyCcbQ7R2TWANqvF9-Yt-VPfe3WyaUv8Xm8`
  ).then((result) => {
    result.json().then((res) => {
      let htmlData = "";
      if (res.items) {
        res.items.forEach((book) => {
          htmlData += `
          <div class="book-container" data-id= "${book.id}">
            <div class="post">

              <div class="header_post">
                <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
              </div>

              <div class="body_post">
                <div class="post_content">

                  <span>title</span>
                  <p>${book.volumeInfo.title}</p>

                  <div class="container_infos">
                    <div class="postedBy">
                      <span>author</span>
                        ${book.volumeInfo.authors[0]}
                    </div>

                    <div class="container_tags" >
                      <div class="tags">
                        <a href = "#" class = "detailsA">Details</a>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>`;
          
        });
        mealList.classList.remove("notFound");
      } else {
        // htmlData = "Sorry, we didn't find any book!";
        // alert(`Sorry, we didn't find any book!`)
        if (searchInputTxt=='') {
          alert(`search something`)

        } else{
          alert(`Sorry, we didn't find any book!`)

        }
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = htmlData;
    });
  });
}

function getMealRecipe(e) {
  e.preventDefault();
  console.log(e)
  if (e.target.classList.contains("detailsA")) {
    let mealItem = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    console.log(mealItem.dataset.id);

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${mealItem.dataset.id}&key=AIzaSyCcbQ7R2TWANqvF9-Yt-VPfe3WyaUv8Xm8`
    ).then((result) =>
      result.json().then((meal) => mealRecipeModal(meal.items))
    );
  }
}

function mealRecipeModal(meal) {
  console.log(meal)
  meal = meal[0];
  console.log(meal)
  let html = `
  <div class="details-display">
            <div class="book_image">
               <img src="${meal.volumeInfo.imageLinks.thumbnail}" alt="">
               
               <div>
                  <span class="rating">rating</span>
                  <span class="rating">${meal.volumeInfo.averageRating}</span>
               </div>
            </div>
            <div class="about-book">
               <div class="about-book-heading">
                  <h1>${meal.volumeInfo.title}</h1>
                  <h2>${meal.volumeInfo.authors}</h2>
               </div>
               <div class="about-book-description">
                  <p><b>publisher : </b>${meal.volumeInfo.publisher}</p>
                  <p><b>published Date : </b>${meal.volumeInfo.publishedDate}</p>
                  <p ><b>description : </b>${meal.volumeInfo.description}</p>
               </div>
            </div>
         </div>`;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}



{/* <h2 class = "recipe-title">${meal.strMeal}</h2>
<p class = "recipe-category">${meal.strCategory}</p>
<div class = "recipe-instruct">
    <h3>${meal.volumeInfo.title}</h3>
    <p>${meal.strInstructions}</p>
    <p>${meal.volumeInfo.authors}</P>
</div>
<div class = "recipe-meal-img">
    <img src = ${meal.volumeInfo.imageLinks.smallThumbnail}" alt = "">
</div>
<div class = "recipe-link">
    <p>${meal.volumeInfo.averageRating}</p>
</div> */}


const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);
