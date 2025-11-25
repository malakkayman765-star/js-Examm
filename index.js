var mealsContainer = document.getElementById('mealsContainer');
var inputName = document.getElementById('searchByName');
var inputLetter = document.getElementById('searchByLetter');
var search = document.getElementById('search');
var searchSection = document.querySelector('.search-section');
var categoriesBtn = document.getElementById('categoriesBtn');
var mealsTitle = document.getElementById('mealsTitle');
var areaContainer = document.getElementById('areaContainer');
var areaBtn = document.getElementById('area');
var areaTitle = document.getElementById('areaTitle');
var ingredientsSection = document.querySelector('.ingredients-section');
var ingredientContainer = document.getElementById('ingredientContainer');
var ingredients = document.getElementById('ingredients');
var contactBtn = document.getElementById('contactBtn');
var contactSection = document.getElementById('contactSection');





async function getMeals() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let data = await response.json();

    let meals = data.meals.slice(0, 20);
    displayMeals(meals);
}

function displayMeals(meals) {
    var container = ''
    for (let i = 0; i < meals.length; i++) {
        container += ` <div class="col-md-3">
                    <div class="meal mb-3 overflow-hidden position-relative">
                        <img src="${meals[i].strMealThumb}" class="w-100 rounded-3">
                        <div class="meal-layer d-flex align-items-center  justify-content-center">
                            <h3 class="text-black">${meals[i].strMeal} </h3>
                        </div>

                    </div>

                </div>`;

    }
    mealsContainer.innerHTML = container
}
getMeals();


inputName.addEventListener("keyup", function () {
    searchByName(inputName.value);
})

async function searchByName(name) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await response.json();
    displayMeals(data.meals || []);
}

inputLetter.addEventListener("keyup", function () {
    searchByLetter(inputLetter.value);
})
async function searchByLetter(letter) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await response.json();
    displayMeals(data.meals || []);
}
search.addEventListener('click', function () {
    searchSection.classList.remove("d-none");
    mealsContainer.innerHTML = "";
});

async function getCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    displayCategories(data.categories);
}


function displayCategories(categories) {
    let container = '';
    for (let i = 0; i < categories.length; i++) {
        container += `
            <div class="col-md-3">
                <div class="meal" onclick="showMealsByCategory('${categories[i].strCategory}')">
                    <img src="${categories[i].strCategoryThumb}" alt="${categories[i].strCategory}">
                    <div class="meal-layer">
                        <h3>${categories[i].strCategory}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    categoriesContainer.innerHTML = container;
}


async function showMealsByCategory(categoryName) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const data = await response.json();

    mealsTitle.textContent = `Meals in ${categoryName}`;
    let container = '';

    for (let i = 0; i < data.meals.length; i++) {
        container += `
            <div class="col-md-3 mb-4">
                <div class="meal">
                    <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
                    <div class="meal-layer">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }

    mealsContainer.innerHTML = container;
}


getCategories();

search.addEventListener('click', function () {
    searchSection.classList.remove("d-none");
    categoriesContainer.innerHTML = "";
    mealsContainer.innerHTML = "";
    mealsTitle.textContent = "";
});


categoriesBtn.addEventListener('click', function () {
    searchSection.classList.add("d-none");
    mealsContainer.innerHTML = "";
    mealsTitle.textContent = "";
    getCategories();
});
areaBtn.addEventListener('click', function () {
    searchSection.classList.add("d-none");
    categoriesContainer.innerHTML = "";
    mealsContainer.innerHTML = "";
    areaTitle.classList.remove("d-none");
    getAreas();
});


async function getAreas() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    displayAreas(data.meals);
}

function displayAreas(areas) {
    let container = '';
    for (let i = 0; i < areas.length; i++) {
        container += `
        <div class="col-md-3">
            <div class="area-box text-center" onclick="showMealsByArea('${areas[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-3x text-danger"></i>
                <h3 class="mt-2">${areas[i].strArea}</h3>
            </div>
        </div>`;
    }
    areaContainer.innerHTML = container;
}

async function showMealsByArea(areaName) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    const data = await response.json();

    let container = "";

    for (let i = 0; i < data.meals.length; i++) {
        container += `
            <div class="col-md-3 mb-4">
                <div class="meal position-relative overflow-hidden">
                    <img src="${data.meals[i].strMealThumb}" class="w-100 rounded-2">
                    <div class="meal-layer d-flex align-items-center justify-content-center">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }

    mealsContainer.innerHTML = container;
    areaContainer.innerHTML = "";
    areaTitle.textContent = `Meals from ${areaName}`;
};
ingredients.addEventListener('click', function () {
    ingredientsSection.classList.remove("d-none");
    mealsContainer.innerHTML = "";
    searchSection.classList.add("d-none");
    categoriesContainer.innerHTML = "";
    areaSection.classList.add("d-none");
    contactSection.classList.add("d-none");

    getIngredients();

})

async function getIngredients() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let data = await response.json();
    //console.log(data)
    let mealIng = data.meals.slice(0, 20);
    console.log(mealIng)
    displayIngredients(mealIng);
}

function displayIngredients(ingre) {
    var container = ''
    for (let i = 0; i < ingre.length; i++) {
        container += `<div class="col-md-3 ">
                    <div onclick="getIngredientMeals('${ingre[i].strIngredient}')" class="ingredients mb-5 ">
                        <h2 class="text-white" >${ingre[i].strIngredient}</h2>
                        <p class="text-white">$${ingre[i].strDescription ? ingre[i].strDescription.slice(0, 100) + '...' : 'No description'}</p>
                    </div>
                </div>`
    }
    ingredientContainer.innerHTML = container

}
getIngredients();

async function getIngredientMeals(ingredientName) {

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName');
    let data = await response.json();

    ingredientContainer.innerHTML = "";


    displayMeals(data.meals);
};


contactBtn.addEventListener('click', function (e) {
    e.preventDefault();


    mealsContainer.innerHTML = "";
    searchSection.classList.add("d-none");
    categoriesContainer.innerHTML = "";
    areaContainer.innerHTML = "";
    ingredientsSection.classList.add("d-none");
    areaTitle.classList.add("d-none");
    mealsTitle.textContent = "";


    contactSection.classList.remove("d-none");
});

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    contactForm.reset();
    contactAlert.classList.remove("d-none");

    setTimeout(() => {
        contactAlert.classList.add("d-none");
    }, 3000);
});







