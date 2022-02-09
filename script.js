//selectors
const groceryInput = document.querySelector('.grocery-input');
const groceryButton = document.querySelector('.grocery-button');
const groceryList = document.querySelector('.grocery-list');
const filterOption = document.querySelector('.filter-groceries');

//Event Listeners
document.addEventListener('DOMContentLoaded', getGroceries)
groceryButton.addEventListener('click', addGrocery);
groceryList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterGrocery);

//Functions
function addGrocery(event) {
    //prevent form from submitting
    event.preventDefault();
    //Grocery Div
    const groceryDiv = document.createElement('div');
    groceryDiv.classList.add("grocery");
    //Create li
    const newGrocery = document.createElement('li');
    newGrocery.innerText = groceryInput.value;
    newGrocery.classList.add("grocery-item");
    groceryDiv.appendChild(newGrocery);
    //add to do to local storage
    saveLocalGroceries(groceryInput.value)
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    groceryDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    groceryDiv.appendChild(trashButton);
    //append to list
    groceryList.appendChild(groceryDiv);
    //clear input value
    groceryInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if(item.classList[0] === "trash-btn") {
        const grocery = item.parentElement;
        grocery.classList.add("fall");
        removeLocalGroceries(grocery);
        grocery.addEventListener('transitionend', function(){
            grocery.remove();
        })
    }

    if(item.classList[0] === "complete-btn") {
        const grocery = item.parentElement;
        grocery.classList.toggle("completed");
    }
}

function filterGrocery(e) {
    const groceries = groceryList.childNodes;
    groceries.forEach(function(grocery) {
        switch (e.target.value) {
            case "all":
                grocery.style.display = "flex";
                break;
            case "completed":
                if (grocery.classList.contains("completed")) {
                    grocery.style.display = "flex";
                } else {
                    grocery.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!grocery.classList.contains("completed")) {
                    grocery.style.display = "flex";
                } else {
                    grocery.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalGroceries(grocery) {
    let groceries;
    if(localStorage.getItem('groceries') === null){
        groceries = [];
    } else {
        groceries = JSON.parse(localStorage.getItem('groceries'));
    }
    groceries.push(grocery);
    localStorage.setItem('groceries', JSON.stringify(groceries));
}

function getGroceries() {
    let groceries;
    if(localStorage.getItem('groceries') === null){
        groceries = [];
    } else {
        groceries = JSON.parse(localStorage.getItem('groceries'));
    }
    groceries.forEach(function(grocery){
        //Grocery Div
    const groceryDiv = document.createElement('div');
    groceryDiv.classList.add("grocery");
    //Create li
    const newGrocery = document.createElement('li');
    newGrocery.innerText = grocery;
    newGrocery.classList.add("grocery-item");
    groceryDiv.appendChild(newGrocery);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    groceryDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    groceryDiv.appendChild(trashButton);
    //append to list
    groceryList.appendChild(groceryDiv);
    })
}

function removeLocalGroceries(grocery) {
    let groceries;
    if(localStorage.getItem('groceries') === null){
        groceries = [];
    } else {
        groceries = JSON.parse(localStorage.getItem('groceries'));
    }
    const groceryIndex = grocery.children[0].innerText;
    groceries.splice(groceries.indexOf(groceryIndex), 1);
    localStorage.setItem("groceries", JSON.stringify(groceries));
}