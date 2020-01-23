const url = "http://localhost:8088/food";

const printFood = (food) => {
    food.forEach(item => {
        console.log(item);
    })
}

const foodFactory = (food) => {
    return `<li class=foodItem><h3>${food.name}<h3><h5></h5>${food.category}<h5>${food.ethnicity}</h5><p class="ingredientList">${food.ingredients}</p>
   <p class="ingredientsList">Fat Calories: ${food.fat}</p><p class="ingredientsList">Sugar: ${food.Sugar}</p></li>
    `
};

const addFoodtoDom = (foodHtml) => {
    const container = document.querySelector('#foodList');
    container.innerHTML += foodHtml;
}


// fetch(url)
// //get the response and turn that response into json data
//     .then(resp => resp.json())
// //change resp.json data into a variable called foodData
//     .then(foodData => {
//         foodData.forEach(item => {
//             const foodHtml = foodFactory(item);
//             addFoodtoDom(foodHtml);
//         })
//         // console.log(foodData);
//         // printFood(foodData)
//     });

fetch(url)
    .then(resp => resp.json())
    .then(myParsedFood => {
        myParsedFood.forEach(food => {
            // console.log(food)

            fetch (`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(resp=>resp.json())
                .then(specificFoodData => {
                    console.log(specificFoodData);
                    specificFoodData.product.ingredients_text ? food.ingredients=specificFoodData.product.ingredients_text : food.ingredients='no specific ingredients listed.';
                    specificFoodData.product.nutriments.fat ? food.fat=specificFoodData.product.nutriments.fat : food.fat='no specific ingredients listed.';
                    specificFoodData.product.nutriments.sugars ? food.Sugar=specificFoodData.product.nutriments.sugars : food.Sugar='no specific ingredients listed.';
                    // specificFoodData.product.generic_name_fr_debug_tags.image_front_small_url ? food.img=specificFoodData.product.generic_name_fr_debug_tags.image_front_small_urls : food.img='no specific img listed.';


                    // console.log(food.ingredients);
                    const foodHtml = foodFactory(food);
                    addFoodtoDom(foodHtml);
                })
        })
    })

