// load category
const loadCategory = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayCategory(data.categories));
}

// load food
const loadFoods = (id) => {
    const url = ` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayFoods(data.foods));
}

// random data site e asle deakabe
const loadRandomData = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    fetch(url)
        .then(res => res.json())
        .then(data=>displayFoods(data.foods))
}


// category
const displayCategory = (categories) => {
    const catContainer = document.getElementById("category-container");
    catContainer.innerHTML = ''
    
    for (let cat of categories) {
        const categoryCard = document.createElement('div')
        categoryCard.innerHTML = `
             <button onclick="loadFoods('${cat.id}')" class="btn justify-start btn-block shadow btn-category h-10">
            <img
              src="${cat.categoryImg}"
              alt=""
              class="w-10"
            />${cat.categoryName}
          </button>
        `;
        catContainer.append(categoryCard)
    }
};


// display foods
const displayFoods = (foods) => {
  console.log(foods);
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";

  foods.forEach((food) => {
    const foodCard = document.createElement("div");

    foodCard.innerHTML = `
            <div class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
               ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${food.price}</span> BDT
                </h2>
              </div>

              <button class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
        `;
    foodContainer.append(foodCard);
  });
};
loadCategory()
loadRandomData();