export function calculateIngredientMacro(ingredient){
    let energy=ingredient.nutriens.energy*ingredient.quantity/100;
    let protein=ingredient.nutriens.protein*ingredient.quantity/100;
    let carbs=ingredient.nutriens.carbs*ingredient.quantity/100;
    let fat=ingredient.nutriens.fat*ingredient.quantity/100;
    return {
        'nutriens':{
            'energy':Math.round(energy,2),
            'protein':Math.round(protein,2),
            'carbs':Math.round(carbs,2),
            'fat':Math.round(fat,2)
        }
    }
}


export function calculateMealMacro(ingredientList){
    let energy=0;
    let protein=0;
    let carbs=0;
    let fat=0;
    let quantity=0;
    ingredientList.forEach((ingredient) => {
        let macros = calculateIngredientMacro(ingredient)
        energy+=macros.nutriens.energy;
        protein+=macros.nutriens.protein;
        carbs+=macros.nutriens.carbs;
        fat+=macros.nutriens.fat;
        quantity+=ingredient.quantity;
    });
    return ({
        'nutriens':{
            'energy':Math.round(energy),
            'protein':Math.round(protein),
            'carbs':Math.round(carbs),
            'fat':Math.round(fat)
        },
        'quantity':Math.round(quantity)
    })
}

export function getEmptyMeal(){
    return{
        nutriens:{
            'energy':0,
            'protein':0,
            'carbs':0,
            'fat':0
        },
        'quantity':0
    };
}