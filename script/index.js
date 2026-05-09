// load category
const loadCategory = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayCategory(data.categories));
}

let cart = []
let total=0
// load food
const loadFoods = (id) => {

  // food container k hide korbo + loading k show korbo
  document.getElementById("food-container").classList.add("hidden")
  document.getElementById("loading-spinner").classList.remove("hidden");

    const url = ` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
    fetch(url)
      .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
  
  // active class remove
  const catBtns = document.querySelectorAll(".btn-category")
  catBtns.forEach(btn=>btn.classList?.remove('active'))

  
  // active class
  const currentBtn = document.getElementById(`cat-btn-${id}`)
  currentBtn?.classList?.add('active')
}

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
             <button id="cat-btn-${cat.id}" onclick="loadFoods('${cat.id}')" class="btn justify-start btn-block shadow btn-category h-10">
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
  // console.log(foods);
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
                 onclick="loadFoodDetails(${food.id})"
                class="w-[160px] rounded-xl h-[160px] object-cover food-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold food-title">
               ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price food-price">${food.price}</span> BDT
                </h2>
              </div>

              <button id="add-btn-${food.id}" onclick="addtoCart(this)" class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
        `;
    foodContainer.append(foodCard);
    document.getElementById(`add-btn-${food.id}`).addEventListener('click', () => {
      e.stopPropagation()
    
    })
  });
  document.getElementById("loading-spinner").classList.add("hidden");
  document.getElementById("food-container").classList.remove("hidden");

};

const displayDetails = (food) => {
    // console.log(food)
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
loadFoods(11)


// document.getElementById("food-container").addEventListener('click', (e) => {
//   console.log(e.target)
// })

const addtoCart = (btn,event) => {
  
  const card = btn.parentNode.parentNode
  const foodTitle = card.querySelector(".food-title").innerText
  const foodImage = card.querySelector(".food-img").src
  const foodPrice = card.querySelector(".food-price").innerText
  const foodPriceNum=Number(foodPrice)
  // console.log(foodTitle, foodImage, foodPriceNum)
  
  const selectedItem = {
    id:cart.length +1,
    foodTitle: foodTitle,
    foodImage:foodImage,
    foodPrice:foodPriceNum
  }
  cart.push(selectedItem)
  total=total+foodPriceNum
  displayCart(cart)
  displayTotal(total)


}

const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML=val
}

const displayCart = (cart) => {
  const cartContainer = document.getElementById("cart-container")
  cartContainer.innerHTML = ''

  for (let item of cart) {
    console.log(item)
    const newItem = document.createElement("div")
    newItem.innerHTML = `
      <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
            <div class="img">
            <span class="hidden cart-id">${item.id}</span>
              <img
                src="${item.foodImage}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-xs font-bold food-title">
                ${item.foodTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="item-price">${item.foodPrice}</span> BDT
                </h2>
              </div>
            </div>
            <div onclick="removeCart(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
    `;
    cartContainer.append(newItem)
  }
  
}

const removeCart = (btn) => {
  const item = btn.parentNode
  const id = Number(item.querySelector(".cart-id").innerText);
  // const foodTitle = item.querySelector(".food-title").innerText
  const itemPrice = Number(item.querySelector(".item-price").innerText)

  cart = cart.filter(item => item.id !== id)
  
  total = 0
  cart.forEach(item => (total += item.foodPrice))
  displayCart(cart)
  displayTotal(total)
  
}