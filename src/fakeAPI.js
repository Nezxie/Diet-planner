//AI generated but i'll just make it myself one day i guess because that api was making me waste time

const foodList=[
{'id':0,'name':'apple','category':'fruit','nutriens':{'energy':'52','protein':'0.3','carbs':'14','fat':'0.2'}},
{'id':1,'name':'banana','category':'fruit','nutriens':{'energy':'89','protein':'1.1','carbs':'23','fat':'0.3'}},
{'id':2,'name':'pear','category':'fruit','nutriens':{'energy':'57','protein':'0.4','carbs':'15','fat':'0.1'}},
{'id':3,'name':'orange','category':'fruit','nutriens':{'energy':'47','protein':'0.9','carbs':'12','fat':'0.1'}},
{'id':4,'name':'strawberry','category':'fruit','nutriens':{'energy':'32','protein':'0.7','carbs':'8','fat':'0.3'}},
{'id':5,'name':'blueberry','category':'fruit','nutriens':{'energy':'57','protein':'0.7','carbs':'14','fat':'0.3'}},
{'id':6,'name':'grape','category':'fruit','nutriens':{'energy':'69','protein':'0.7','carbs':'18','fat':'0.2'}},
{'id':7,'name':'pineapple','category':'fruit','nutriens':{'energy':'50','protein':'0.5','carbs':'13','fat':'0.1'}},
{'id':8,'name':'mango','category':'fruit','nutriens':{'energy':'60','protein':'0.8','carbs':'15','fat':'0.4'}},
{'id':9,'name':'watermelon','category':'fruit','nutriens':{'energy':'30','protein':'0.6','carbs':'8','fat':'0.2'}},
{'id':10,'name':'kiwi','category':'fruit','nutriens':{'energy':'61','protein':'1.1','carbs':'15','fat':'0.5'}},
{'id':11,'name':'peach','category':'fruit','nutriens':{'energy':'39','protein':'0.9','carbs':'10','fat':'0.3'}},
{'id':12,'name':'plum','category':'fruit','nutriens':{'energy':'46','protein':'0.7','carbs':'11','fat':'0.3'}},
{'id':13,'name':'apricot','category':'fruit','nutriens':{'energy':'48','protein':'1.4','carbs':'11','fat':'0.4'}},
{'id':14,'name':'cherry','category':'fruit','nutriens':{'energy':'63','protein':'1.1','carbs':'16','fat':'0.2'}},

{'id':15,'name':'carrot','category':'vegetable','nutriens':{'energy':'41','protein':'0.9','carbs':'10','fat':'0.2'}},
{'id':16,'name':'broccoli','category':'vegetable','nutriens':{'energy':'34','protein':'2.8','carbs':'7','fat':'0.4'}},
{'id':17,'name':'spinach','category':'vegetable','nutriens':{'energy':'23','protein':'2.9','carbs':'3.6','fat':'0.4'}},
{'id':18,'name':'lettuce','category':'vegetable','nutriens':{'energy':'15','protein':'1.4','carbs':'2.9','fat':'0.2'}},
{'id':19,'name':'cucumber','category':'vegetable','nutriens':{'energy':'16','protein':'0.7','carbs':'4','fat':'0.1'}},
{'id':20,'name':'tomato','category':'vegetable','nutriens':{'energy':'18','protein':'0.9','carbs':'3.9','fat':'0.2'}},
{'id':21,'name':'potato','category':'vegetable','nutriens':{'energy':'77','protein':'2','carbs':'17','fat':'0.1'}},
{'id':22,'name':'sweet potato','category':'vegetable','nutriens':{'energy':'86','protein':'1.6','carbs':'20','fat':'0.1'}},
{'id':23,'name':'onion','category':'vegetable','nutriens':{'energy':'40','protein':'1.1','carbs':'9','fat':'0.1'}},
{'id':24,'name':'garlic','category':'vegetable','nutriens':{'energy':'149','protein':'6.4','carbs':'33','fat':'0.5'}},
{'id':25,'name':'zucchini','category':'vegetable','nutriens':{'energy':'17','protein':'1.2','carbs':'3.1','fat':'0.3'}},
{'id':26,'name':'eggplant','category':'vegetable','nutriens':{'energy':'25','protein':'1','carbs':'6','fat':'0.2'}},
{'id':27,'name':'bell pepper','category':'vegetable','nutriens':{'energy':'20','protein':'0.9','carbs':'4.6','fat':'0.2'}},
{'id':28,'name':'cabbage','category':'vegetable','nutriens':{'energy':'25','protein':'1.3','carbs':'6','fat':'0.1'}},
{'id':29,'name':'cauliflower','category':'vegetable','nutriens':{'energy':'25','protein':'1.9','carbs':'5','fat':'0.3'}},
{'id':30,'name':'pumpkin','category':'vegetable','nutriens':{'energy':'26','protein':'1','carbs':'7','fat':'0.1'}},
{'id':31,'name':'asparagus','category':'vegetable','nutriens':{'energy':'20','protein':'2.2','carbs':'3.9','fat':'0.1'}},
{'id':32,'name':'beetroot','category':'vegetable','nutriens':{'energy':'43','protein':'1.6','carbs':'10','fat':'0.2'}},
{'id':33,'name':'radish','category':'vegetable','nutriens':{'energy':'16','protein':'0.7','carbs':'3.4','fat':'0.1'}},
{'id':34,'name':'green beans','category':'vegetable','nutriens':{'energy':'31','protein':'1.8','carbs':'7','fat':'0.1'}},

{'id':35,'name':'white rice','category':'grain','nutriens':{'energy':'130','protein':'2.7','carbs':'28','fat':'0.3'}},
{'id':36,'name':'brown rice','category':'grain','nutriens':{'energy':'123','protein':'2.6','carbs':'26','fat':'1'}},
{'id':37,'name':'oats','category':'grain','nutriens':{'energy':'389','protein':'17','carbs':'66','fat':'7'}},
{'id':38,'name':'quinoa','category':'grain','nutriens':{'energy':'120','protein':'4.4','carbs':'21','fat':'1.9'}},
{'id':39,'name':'barley','category':'grain','nutriens':{'energy':'123','protein':'2.3','carbs':'28','fat':'0.4'}},
{'id':40,'name':'millet','category':'grain','nutriens':{'energy':'119','protein':'3.5','carbs':'23','fat':'1'}},
{'id':41,'name':'corn','category':'grain','nutriens':{'energy':'86','protein':'3.2','carbs':'19','fat':'1.2'}},
{'id':42,'name':'buckwheat','category':'grain','nutriens':{'energy':'92','protein':'3.4','carbs':'20','fat':'0.6'}},
{'id':43,'name':'rye','category':'grain','nutriens':{'energy':'335','protein':'10','carbs':'76','fat':'1.6'}},
{'id':44,'name':'whole wheat','category':'grain','nutriens':{'energy':'340','protein':'13','carbs':'72','fat':'2.5'}},

{'id':45,'name':'lentils','category':'legume','nutriens':{'energy':'116','protein':'9','carbs':'20','fat':'0.4'}},
{'id':46,'name':'chickpeas','category':'legume','nutriens':{'energy':'164','protein':'9','carbs':'27','fat':'2.6'}},
{'id':47,'name':'black beans','category':'legume','nutriens':{'energy':'132','protein':'8.9','carbs':'24','fat':'0.5'}},
{'id':48,'name':'kidney beans','category':'legume','nutriens':{'energy':'127','protein':'8.7','carbs':'23','fat':'0.5'}},
{'id':49,'name':'peas','category':'legume','nutriens':{'energy':'81','protein':'5.4','carbs':'14','fat':'0.4'}},
{'id':50,'name':'soybeans','category':'legume','nutriens':{'energy':'173','protein':'16.6','carbs':'10','fat':'9'}},
{'id':51,'name':'tofu','category':'legume','nutriens':{'energy':'76','protein':'8','carbs':'1.9','fat':'4.8'}},
{'id':52,'name':'tempeh','category':'legume','nutriens':{'energy':'193','protein':'20','carbs':'9','fat':'11'}},
{'id':53,'name':'white beans','category':'legume','nutriens':{'energy':'140','protein':'9.7','carbs':'26','fat':'0.5'}},
{'id':54,'name':'fava beans','category':'legume','nutriens':{'energy':'110','protein':'7.6','carbs':'19','fat':'0.4'}},

{'id':55,'name':'milk','category':'dairy','nutriens':{'energy':'42','protein':'3.4','carbs':'5','fat':'1'}},
{'id':56,'name':'yogurt','category':'dairy','nutriens':{'energy':'59','protein':'10','carbs':'3.6','fat':'0.4'}},
{'id':57,'name':'cheese','category':'dairy','nutriens':{'energy':'402','protein':'25','carbs':'1.3','fat':'33'}},
{'id':58,'name':'cottage cheese','category':'dairy','nutriens':{'energy':'98','protein':'11','carbs':'3.4','fat':'4.3'}},
{'id':59,'name':'cream','category':'dairy','nutriens':{'energy':'340','protein':'2','carbs':'3','fat':'36'}},
{'id':60,'name':'butter','category':'dairy','nutriens':{'energy':'717','protein':'0.9','carbs':'0.1','fat':'81'}},
{'id':61,'name':'egg','category':'egg','nutriens':{'energy':'155','protein':'13','carbs':'1.1','fat':'11'}},

{'id':62,'name':'almonds','category':'nut','nutriens':{'energy':'579','protein':'21','carbs':'22','fat':'50'}},
{'id':63,'name':'walnuts','category':'nut','nutriens':{'energy':'654','protein':'15','carbs':'14','fat':'65'}},
{'id':64,'name':'peanuts','category':'legume','nutriens':{'energy':'567','protein':'26','carbs':'16','fat':'49'}},
{'id':65,'name':'cashews','category':'nut','nutriens':{'energy':'553','protein':'18','carbs':'30','fat':'44'}},
{'id':66,'name':'hazelnuts','category':'nut','nutriens':{'energy':'628','protein':'15','carbs':'17','fat':'61'}},
{'id':67,'name':'pistachios','category':'nut','nutriens':{'energy':'562','protein':'20','carbs':'28','fat':'45'}},

{'id':68,'name':'sunflower seeds','category':'seed','nutriens':{'energy':'584','protein':'21','carbs':'20','fat':'51'}},
{'id':69,'name':'chia seeds','category':'seed','nutriens':{'energy':'486','protein':'17','carbs':'42','fat':'31'}},
{'id':70,'name':'flax seeds','category':'seed','nutriens':{'energy':'534','protein':'18','carbs':'29','fat':'42'}},
{'id':71,'name':'pumpkin seeds','category':'seed','nutriens':{'energy':'559','protein':'30','carbs':'11','fat':'49'}},
{'id':72,'name':'sesame seeds','category':'seed','nutriens':{'energy':'573','protein':'18','carbs':'23','fat':'50'}},

{'id':73,'name':'olive oil','category':'oil','nutriens':{'energy':'884','protein':'0','carbs':'0','fat':'100'}},
{'id':74,'name':'coconut oil','category':'oil','nutriens':{'energy':'892','protein':'0','carbs':'0','fat':'100'}},
{'id':75,'name':'sunflower oil','category':'oil','nutriens':{'energy':'884','protein':'0','carbs':'0','fat':'100'}},
{'id':76,'name':'canola oil','category':'oil','nutriens':{'energy':'884','protein':'0','carbs':'0','fat':'100'}},

{'id':77,'name':'basil','category':'herb_spice','nutriens':{'energy':'23','protein':'3.2','carbs':'2.7','fat':'0.6'}},
{'id':78,'name':'parsley','category':'herb_spice','nutriens':{'energy':'36','protein':'3','carbs':'6','fat':'0.8'}},
{'id':79,'name':'cilantro','category':'herb_spice','nutriens':{'energy':'23','protein':'2.1','carbs':'3.7','fat':'0.5'}},
{'id':80,'name':'thyme','category':'herb_spice','nutriens':{'energy':'101','protein':'5.6','carbs':'24','fat':'1.7'}},
{'id':81,'name':'oregano','category':'herb_spice','nutriens':{'energy':'265','protein':'9','carbs':'69','fat':'4'}},
]

export function fakeAPIGetList(query){
    let filteredFoodList = foodList.filter(item=>item.name.includes(query.toLowerCase()));
    return filteredFoodList;
}

export function fakeAPIGetItem(id){
    let item = foodList.filter(item=>item.id==id)
    return item;
}
