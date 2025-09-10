// All HTML Container
const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");

// Load All Categories
const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
};

// Display Categories
const displayCategories = (categories) => {
  categories.forEach((categorie) => {
    categoriesContainer.innerHTML += `
      <div id = ${categorie.id} class="hover:bg-[#15803D] py-2 category-item cursor-pointer text-[#1F2937] hover:text-white px-3 rounded-lg">
          <h2>${categorie.category_name}</h2>
      </div>
    `;
  });

  categoriesContainer.addEventListener("click", (e) => {
    const divClicked = e.target.closest(".category-item");

    const alldiv = categoriesContainer.querySelectorAll("div");
    alldiv.forEach((div) => {
      div.classList.remove("bg-[#15803D]");
      div.classList.remove("text-white");
    });

    divClicked.classList.add("bg-[#15803D]");
    divClicked.classList.add("text-white");
    loadPlantsByCategoriesApi(e.target.closest("div").id);
  });
};

// Load plants by categories Api
const loadPlantsByCategoriesApi = (categoriesId) => {
  const url = `https://openapi.programming-hero.com/api/category/${categoriesId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayPlantsByCategories(data.plants);
    });
};

// Display Plants by Categories
const displayPlantsByCategories = (plants) => {
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
      <div class="card bg-base-100 hover:shadow-xl h-[465px] transition-all duration-300 shadow-sm rounded-xl">
            <div class="p-5">
              <figure class="h-[186px]">
                <img
                  src="${plant.image}"
                  alt="Shoes"
                  class="rounded-xl h-full w-full object-cover"
                />
              </figure>
              <div class="">
                <h2 class="card-title py-3">${plant.name}</h2>
                <p class="text-[#1F2937] line-clamp-3 mb-4">
                  ${plant.description}
                </p>
                <div class="flex items-center justify-between">
                  <span class="bg-[#DCFCE7] p-2 rounded-3xl text-[#15803D]">${plant.category}</span>
                  <h2 class="text-lg font-bold">৳<span>${plant.price}</span></h2>
                </div>

                <button class="mt-4 add-to-cart-btn w-full bg-[#15803D] text-white py-2 rounded-3xl cursor-pointer">Add to Cart</button>
              </div>
            </div>
          </div>
    `;
  });
};

loadCategories();
