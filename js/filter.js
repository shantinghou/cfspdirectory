// Global filter arrays
var allCategories = ["food", "retail", "real-estate", "transportation", "arts-entertainment", "finance", "healthcare", "other"];
var allNeighborhoods = ["braddock", "monroeville", "mt-washington", "shadyside", "homewood", "north-oakland", "cultural-district", "point-breeze", "east-liberty", "lawrenceville", "downtown", "other"]
var allPrices = ["$", "$$", "$$$"];

// Returns an array of strings 
// Each string represents a category checked in checkbox
function getCategories() {
    var checkboxes = document.getElementsByName("category");
    var checkboxesChecked = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }

    return checkboxesChecked.length > 0 ? checkboxesChecked : allCategories;
}

// Returns an array of strings 
// Each string represents a neighborhood checked in checkbox
function getNeighborhoods() {
    var checkboxes = document.getElementsByName("neighborhood");
    var checkboxesChecked = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }

    return checkboxesChecked.length > 0 ? checkboxesChecked : allNeighborhoods;
}

// Returns an array of strings 
// Each string represents a price checked in checkbox
function getPrices() {
    var checkboxes = document.getElementsByName("price");
    var checkboxesChecked = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }

    return checkboxesChecked.length > 0 ? checkboxesChecked : allPrices;
}

// Returns the union of two arrays
// E.g. union([1,2], [2,3,4]) = [1,2,3,4]
function union(arr1, arr2) {
    const arr3 = [ ...new Set([...arr1, ...arr2])]
    return arr3
}

// Returns an array of IDs corresponding to a collection of objects
function getIDs(objects) {
    var id_array = [];
    for (let i = 0; i < objects.length; i++) {
        id_array.push(objects[i].id);
    }
    return id_array
}

// This function uses checkboxes to decide which cards to render
function filterCards() {
    resetCards();
    // first we get our neighborhoods, categories and prices
    var categories = getCategories();
    var neighborhoods = getNeighborhoods();
    var prices = getPrices();

    // console.log("Categories: " + categories);
    // console.log("Neighborhoods: " + neighborhoods);
    // console.log("Prices: " + prices);

    // then we get our card object collectionn and convert to an ID list
    cards = document.getElementsByClassName("card border-0 rounded shadow");
    var cardIDs = getIDs(cards)

    // console.log("All cards: "+cardIDs)

    // we create duplicate arrays to filter by color and name respectively
    var cardIDs_category = cardIDs.map((x) => x);
    var cardIDs_neighborhood = cardIDs.map((x) => x);
    var cardIDs_price = cardIDs.map((x) => x);

    // filter cardIDs_category by category
    // i.e. if a category has been checked, remove from list 
    // Currently O(nm) fix later
    for (let j = 0; j < categories.length; j++) {
        // console.log(categories[j]);
        cardIDs_category = cardIDs_category.filter(function(cardID) {
            return !(cardID.includes(categories[j]))
        })
    }
    console.log("After category filter: "+cardIDs_category)

    // filter cardIDs_neighborhood by neighborhood 
    // i.e. if a neighborhood has been checked, remove from list 
    // Currently O(nm) fix later
    for (let j = 0; j < neighborhoods.length; j++) {
        cardIDs_neighborhood = cardIDs_neighborhood.filter(function(cardID) {
            return !(cardID.includes(neighborhoods[j]))
        })
    }
    console.log("After neighborhood filter: "+cardIDs_neighborhood)

    // filter cardIDs_price by price 
    // i.e. if a price has been checked, remove from list 
    // Currently O(nm) fix later
    for (let j = 0; j < prices.length; j++) {
        cardIDs_price = cardIDs_price.filter(function(cardID) {
            return !(cardID.includes(prices[j]))
        })
    }
    console.log("After price filter: "+cardIDs_price)

    // a bit of boolean logic here:
    // if A, B are representing the colors checked
    // and C, D are representing the names checked
    // then we will render cards such that (A | B) ^ (C | D) where ^ - intersection
    // so the cards we will not render = ~((A | B) ^ (C | D))
    // this simplifies to (~A & ~B) U (~C & ~D) where U - union

    var tempUnion = union(cardIDs_category, cardIDs_neighborhood)
    cardIDs = union(tempUnion, cardIDs_price)

    // now we have the cards we shouldn't render so we loop through and set display to none
    for (let k = 0; k < cardIDs.length; k++) {
        document.getElementById(cardIDs[k]).style.display = "none";
    }

    if (cardIDs.length == 9) {
        console.log("No res");
        var tag = document.createElement("p");
        var text = document.createTextNode("No results found");
        tag.appendChild(text);
        tag.style.fontSize = "large";
        tag.style.textAlign = "center";
        tag.id = "NoResults"
        var element = document.getElementById("directoryDiv");
        element.appendChild(tag);
    }
}

// resetting is simple: set all card display values to "block"
function resetCards() {
    const element = document.getElementById("NoResults");
    if (element != null) {
        element.remove();
    }

    // For removing checks
    // var checkboxes = document.getElementsByName(input);
    // for (let i = 0; i < checkboxes.length; i++) {
    //     if (checkboxes[i].getAttribute('type') == "checkbox") {
    //         checkboxes[i].checked = false;
    //     }
    // }

    var cards = document.getElementsByClassName("card border-0 rounded shadow");
    var cardIDs = getIDs(cards);
    for (let k = 0; k < cardIDs.length; k++) {
        document.getElementById(cardIDs[k]).style.display = "block";
    }
}

// and that's pretty much it