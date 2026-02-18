import {fakeAPIGetList,fakeAPIGetItem} from './fakeAPI.js'
export async function getFoodList(query){
    let foodList = await fakeAPIGetList(query);
    return foodList;
}

export async function getFoodItemInfo(itemId){
    let item = await fakeAPIGetItem(itemId);
    return item;
}