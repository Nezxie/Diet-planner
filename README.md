# Diet-planner
This is a diet planner app that helps with meal prepping and shopping.
The app is built in React.
The apps is still in early stages of developement so this README is a mess of ideas and requirements but I'll update it along with developement and clean it up once I'll finish the app.

The closest goal is: API product search bar
- ~~Init the project (Vite + I'll worry about routing later?)~~
- ~~create MVP of a search bar that connects to [changed to usda](https://fdc.nal.usda.gov) and gets back all the necesarry info (+ discards the unnecesarry info because ther is A LOT of info there)~~
- display a product card with the info 
- similar to product make an ingredient card with the info + inputs to control the quantity and calculate ourInfo based on user input (make it inline so we can reuse it in a list later)
- so basically the user searches for "cheese" -> gets a list of product cards that api returned after the "cheese" search (we can do 1 for now) -> when selected we render an ingredient card with info + controls that recalculate the info based on quantity
- *I'll later add an option to edit the protein instead of quantity -> so we can recalculate quantity based on nutriens input
- define next goal better and clean up the README

Upcomming goals:
1) Meal
  - make a list of ingredients - each time a user selects searched product add it to the list 
  - add controls to delete ingredients from the list
  - allow to rename the meal
  - add "Save" that saves to storage + retrieve the last saved meal on load
  - *(not necessary for mvp but will help with 2) ) calculate nutriens for the whole meal (ingredients already know their own nutriens so this should be just a simple sum)
    
2)  Meal library
  - (this is a new screen?) create Meal list that displays all the meals saved - each meal card has a name, ingredients + quantities + nutriens
  - each meal can be edited (how: modal or new route ?) or deleted

3) Calendar/main planner
  - time to add the calendar ?
  - make it drag and drop for fun (this would require us to make a smaller version of Meal list, with just titles/title + kcal that are visible near the calendar nad can be droped as blocks - but that's just thinking visually, we need to make logic to actually remember what day gets what meals and save this info too because we'll need it in later stages)
  - calculate nutriens for the day + week + any period really
  - prepare data for the charts and other analytics
    
4) ...
   
#To do list
I want this app to be able to:
- get produce data from a nutrition API (like openfoodfacts, might revisit this later) ✔️
- let the user create a meal: a list of produce + quantity -> get the app to calculate macro and micronutriens of the whole meal based on that + responsive inputs that let user make adjustments on the fly and easily recalculate
- show the user some charts and data about their past plans/curent plan - like vitamins and stuff
- let the user save the created meal (local storage for now, db later)
- create a calendar (watch out for 31/30 days + leap years, or we can do weekly cause who plans for the whole month in advance?)
- let the user assign meals to days in calendar, calculate nutriens for the day/week
- make a "randomise" button that assigns meals independently provided by caloric intake condition (even better make it change portions to match the caloric needs + some resonable constrains because we don't want a "eat 5g of spaghetti" situation)
- make an "optimise" option for a meal that reworks it to meet protein/caloric needs (might be hard if we want both and not just "smaller/bigger portion" so this needs to be rethinked, portions only is resonable, protein only is harder cause we have to specify which ingredients to modify or set some kind of threshold of protein level to consider an ingredient "protein source" + modifying one ingredient quantity in a meal can lead to some bizarre meals - this basically needs some AI implemented)
- filter for only vegan/vegetarian meals/produce (store that info for user)
- allow user to scroll throught the whole "my meals" library - open + edit + delete
- create a shopping list (txt so we can export to notes? research this) based on the meals selected for the week (+day? we already need to have the past mealplans stored so we can select a time period and not do "currently displayed week" only, so implementing day/3 days/any time period should be fine)

- Later make it fullstack: have a db, store users and preferences (login + auth), ability to share meals with others (make them public), maybe host the openfoodfacts myself so I have unlimited queries unless I decide on a smaller api where this is not an issue
