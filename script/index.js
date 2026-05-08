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

// area: "Moroccan";
// catId: 4;
// category: "Lamb";
// foodImg: "https://www.themealdb.com/images/media/meals/yuwtuu1511295751.jpg";
// id: 52843;
// price: 360;
// title: "Lamb Tagine";
// video: "https://www.youtube.com/watch?v=bR5Cqu84S_k";
const loadFoodDetails = (id) => {
    const url = ` https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayDetails(data.details));
        
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
            <div onclick="loadFoodDetails(${food.id})" class="p-5 bg-white flex gap-3 shadow rounded-xl">
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

const displayDetails = (food) => {
    console.log(food)
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML=''
    detailsContainer.innerHTML = `
        <div class="">
            <h2 class="text-3xl font-bold">${food.title}</h2>
        </div>
        <div class="mt-5">
            <img class="rounded-md" src="${food.foodImg}" alt="">
        </div>
        <div class="badge badge-primary mt-5">
            ${food.area}
        </div>
        <div class="badge badge-primary mt-5">
            ${food.price} TK
        </div>
        <a href="${food.video}" target="blank" class="btn btn-warning mt-5"> watch Video</a>
    
    `;
    document.getElementById("my_modal_3").showModal()
   
    
}
loadCategory()
loadRandomData();