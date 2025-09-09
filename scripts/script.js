const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const categoryItem = cardContainer.querySelectorAll("category-item");
const priceCardsContainer = document.getElementById("price-cards-container");

// Load 🌴 All categories
const loadAllCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      DisplayAllCategories(data.categories);
    });
};

// Display All categoris
const DisplayAllCategories = (categories) => {
  categories.forEach((categorie) => {
    categoriesContainer.innerHTML += `
        <div class="hover:bg-[#15803D] py-2 category-item cursor-pointer text-[#1F2937] hover:text-white px-3 rounded-lg">
            <h2>${categorie.category_name}</h2>
        </div>
    `;
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
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
      <div class="card bg-base-100 hover:shadow-xl transition-all duration-300 shadow-sm">
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

// Show Active Color
categoriesContainer.addEventListener("click", (e) => {
  const allCategories = document.querySelectorAll(".category-item");
  const categoriesClicked = e.target.closest(".category-item");
  if (!categoriesClicked) {
    return;
  }

  allCategories.forEach((item) => {
    item.classList.remove("bg-[#15803D]", "text-white");
    item.classList.add("text-[#1F2937]");
  });

  categoriesClicked.classList.add("bg-[#15803D]", "text-white");
  categoriesClicked.classList.remove("text-[#1F2937]");
});

// add-to-cart-btn
let totalPrcies = 0;
cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const priceCardContainer = document.getElementById("price-cards-container");
    const totalPrcieContainer = document.getElementById(
      "total-price-container"
    );
    const totalPriceElement = document.getElementById("total-price");

    const card = e.target.closest(".card");
    const plantName = card.querySelector(".card-title").innerText;
    const plantPriceStr = card.querySelector(".font-bold span").innerText;
    const plantPrice = parseFloat(plantPriceStr);

    const cartItem = `
     <div class="cart-item-div flex justify-between items-center p-3 my-2 bg-[#F0FDF4] rounded-xl" data-price="${plantPrice}">
          <div>
            <h3 class="font-semibold">${plantName}</h3>
            <p class="text-sm text-gray-500">৳ ${plantPrice} x 1</p>
          </div>
          <button class="remove-from-cart-btn cursor-pointer text-lg text-gray-500 font-bold">×</button>
      </div>
    `;

    priceCardContainer.innerHTML += cartItem;
    totalPrcies += plantPrice;
    totalPriceElement.innerText = totalPrcies.toFixed(2);

    totalPrcieContainer.classList.remove("hidden");
  }
});
// Delete Btn
priceCardsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart-btn")) {
    const itemToRemove = e.target.closest(".cart-item-div");
    const priceToRemove = parseFloat(itemToRemove.dataset.price);

    totalPrcies -= priceToRemove;
    document.getElementById("total-price").innerText = totalPrcies.toFixed(2);
    itemToRemove.remove();

    if (totalPrcies <= 0) {
      document.getElementById("total-price-container").classList.add("hidden");
    }
  }
});

loadAllPlants();
loadAllCategories();
