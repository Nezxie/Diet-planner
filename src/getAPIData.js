const API_KEY = import.meta.env.VITE_USDA_API_KEY;
const BASE_URL = "https://api.nal.usda.gov/fdc/v1";

export const foodCategoriesEmojiDictionary = {
  "Baked Products": "🍞",
  "Beef Products": "🥩",
  "Beverages": "🥤",
  "Cereal Grains and Pasta": "🍚",
  "Dairy and Egg Products": "🥛",
  "Fats and Oils": "🧈",
  "Finfish and Shellfish Products": "🐟",
  "Fruits and Fruit Juices": "🍎",
  "Lamb, Veal, and Game Products": "🍖",
  "Legumes and Legume Products": "🥫",
  "Nut and Seed Products": "🥜",
  "Pork Products": "🐖",
  "Poultry Products": "🍗",
  "Restaurant Foods": "🍽️",
  "Sausages and Luncheon Meats": "🌭",
  "Soups, Sauces, and Gravies": "🥣",
  "Spices and Herbs": "🌿",
  "Sweets": "🍭",
  "Vegetables and Vegetable Products": "🥦"
};

/* options template:
options= {
    "query":"xxx"
    "itemId":###
    "dataType":["Branded","Experimental","Foundation","SR%20Legacy","Survey%20(FNDDS)"]
    "pageSize": #,
    "pageNumber": #,
    "sortBy": "dataType.keyword",
    "sortOrder": "asc"
}
*/

/*
nutrien numbers eye-roll-emoji
protein:"203"
carbs: "205"
fats: "204"
energy: "208"

labelNutrients?
*/

export async function getFoodList(options){
        let configuration = "&format=abridged";
        if(options.dataTypeFilter){
            configuration+="&dataType="+options.dataTypeFilter;
        }
        if(options.pageNumber){
            configuration+="&pageNumber="+options.pageNumber;
        }
        if(options.pageSize){
            configuration+="&pageSize="+options.pageSize;
        }
        if(options.sortBy){
            configuration+="&sortBy="+options.sortBy;
        }
        if(options.sortOrder){
            configuration+="&sortOrder="+options.sortOrder;
        }
        if(options.requireAllWords){
            configuration+="&requireAllWords="+options.requireAllWords;
        }
        

        const url = `${BASE_URL}/foods/search?query=${options.query}${configuration}&api_key=${API_KEY}`;
        try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
    /*
    Want to show:
    foodlist: foods -> Arr[
    {fdcId, description ???}
    ]

    Used for controls:
    currentPage
    totalPages
    totalHits

    Used for expanding search ? (we can exclude branded for now)
    aggregations -> dataType -> Branded: number of hits, Experimental: number of hits etc
    */
}

export async function getFoodItemInfo(itemId){
    let configuration = "&format=abridged";
    const url = `${BASE_URL}/food/${itemId}?api_key=${API_KEY}${configuration}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }

    /*
    We display (+ use for calculations):
    macros:foodNutrients -> Arr[name, amount, unitName]
    name: description

    We store?
    id:fdcId
    */
}