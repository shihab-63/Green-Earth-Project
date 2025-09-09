const categoriesContainer = document.getElementById("categories-container");
console.log(categoriesContainer);

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
        <div class="hover:bg-[#15803D] py-2 cursor-pointer text-[#1F2937] hover:text-white px-3 rounded-lg">
            <h2>${categorie.category_name}</h2>
        </div>
    `;
  });
};

loadAllCategories();
