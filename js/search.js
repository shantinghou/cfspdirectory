// resetting is simple: set all card display values to "block"
function resetCards() {
    const element = document.getElementById("NoResults");
    if (element != null) {
        element.remove();
    }

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

function clearCards() {   
    var cards = document.getElementsByClassName("card border-0 rounded shadow col-sm-2 col-md-3");
    var cardIDs = getIDs(cards);
    for (let k = 0; k < cardIDs.length; k++) {
        document.getElementById(cardIDs[k]).style.display = "none";
    }
}

// Returns an array of IDs corresponding to a collection of objects
function getIDs(objects) {
    var id_array = [];
    for (let i = 0; i < objects.length; i++) {
        id_array.push(objects[i].id);
    }
    return id_array
}

function searchCards(firstBar) {
    resetCards();
    console.log("no more no results found")
    event.preventDefault();
    if (firstBar) {
        var inputVal = document.getElementById("searchBar1").value;
    } else {
        var inputVal = document.getElementById("searchBar2").value;
    }
    inputVal = inputVal.toLowerCase();

    // alert(inputVal);
    var cards = document.getElementsByClassName("card border-0 rounded shadow");

    clearCards();
    var numCards = 0;
    for (let k = 0; k < cards.length; k++) {
        var cardName = cards[k].getAttribute('name');
        cardName = cardName.toLowerCase();
        console.log(cardName)
        if (cardName.includes(inputVal)) {
            cards[k].style.display = "block"
            numCards += 1
        } 
    }

    if (numCards == 0) {
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