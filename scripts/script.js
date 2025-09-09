const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");

// Load 🌴 All categories
const loadAllCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      DisplayAllCategories(data.categories);
    });
};

// Load 🌴 All Plants
const loadAllPlants = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCardContainer(data.plants);
    });
};

// Display All Card Plants
const displayCardContainer = (plants) => {
  plants.forEach(plant => {
    cardContainer.innerHTML += `
      <div class="card bg-base-100 shadow-sm">
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

                <button class="mt-4 w-full bg-[#15803D] text-white py-2 rounded-3xl cursor-pointer">Add to Cart</button>
              </div>
            </div>
          </div>
    `
  })
};

// Display All categoris
const DisplayAllCategories = (categories) => {
  categories.forEach((categorie) => {
    categoriesContainer.innerHTML += `
        <div class="hover:bg-[#15803D] py-2 cursor-pointer text-[#1F2937] hover:text-white px-3 rounded-lg">
            <h2>${categorie.category_name}</h2>
        </div>
    `;
  });
};

loadAllPlants();
loadAllCategories();
