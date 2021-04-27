'use strict';
let chosenColor = "";

let btnAdd = document.querySelector(".btn-add");
let ulList = document.querySelector("ul.list");
let textInput = document.querySelector(".text-input");
let pyro = document.querySelector('.pyro');
let info = document.querySelector('.description');
let btnClear = document.querySelector(".btn-clear");
let colorInput = document.querySelector(".color-input");
let iconInfo = document.querySelector('header .fa-info');
let iconRefresh = document.querySelector('header .fa-refresh');
let modalBg = document.querySelector('.modal-wrapper');
let body = document.querySelector('body');

//add new task
btnAdd
    .addEventListener("click", function () {
        //empty input or spaces only
        if (!textInput.value.trim()) {
            textInput.value = "";
            return;
        }
        let item = document.createElement("li");
        item.innerHTML = `<i class="fa fa-check"></i><span>${textInput.value.trim()}</span><i class="fa fa-times"></i>`;
        ulList.appendChild(item);
        item.querySelector("span").style.color = chosenColor;
        setListeners(item);
        pyro.style.display = "none"; //end effects
        info.style.display = "none"; //hide info
        textInput.value = "";
        textInput.dispatchEvent(new Event('input')); //show all tasks
    });

//remove all tasks
btnClear
    .addEventListener("click", function () {
        ulList.innerHTML = "";
        pyro.style.display = "none";
        info.style.display = "block";
    });

//search task on the list
textInput
    .addEventListener("input", function () {
        let searchItem = this.value.trim();
        let allItems = getAllListItems();
        for (let i in allItems) {
            if (allItems.hasOwnProperty(i)) {
                if (allItems[i].querySelector("span").innerText.indexOf(searchItem) === -1
                    || allItems[i].classList.contains("checked")) {
                    allItems[i].classList.add("not-found");
                }
                else {
                    allItems[i].classList.remove("not-found");
                }
            }
        }
    });

//set listeners on enter or escape buttons
textInput
    .addEventListener("keyup", function (e) {
        let key = e.key; //which button was pressed
        if (key == "Enter") {
            btnAdd.dispatchEvent(new Event('click'));
        }
        else if (key == "Escape") {
            this.value = "";
            this.dispatchEvent(new Event('input')); //show all tasks
        }
    });

//set color to all tasks
colorInput
    .addEventListener('change', function () {
        let spans = ulList.querySelectorAll('span');
        chosenColor = this.value;
        for (let i in spans) {
            if (spans.hasOwnProperty(i)) {
                spans[i].style.color = this.value;
            }
        }
    });

function setListeners(item) {
    //check/ uncheck task
    item.querySelector(".fa-check").addEventListener("click", function () {
        if (this.classList.contains("fa-check")) {
            this.parentElement.classList.add("checked");
            this.classList.remove('fa-check');
            this.classList.add('fa-undo');
        }
        else {
            this.parentElement.classList.remove("checked");
            this.classList.remove('fa-undo');
            this.classList.add('fa-check');
        }
        checkIfComplete();
    });

    //remove task from list
    item.querySelector(".fa-times").addEventListener("click", function () {
        this.parentNode.parentNode.removeChild(this.parentNode);
        ifEmptyList();
        checkIfComplete();
    });
    item.addEventListener("mouseout", function () {
        this.style.backgroundColor = "";
    });
    item.addEventListener("mouseover", function () {
        this.style.backgroundColor = "#dbd2b052";
    });
}

//change layout (page style)
iconRefresh
    .addEventListener('click', function () {
        body.className = "layout" + Math.floor(Math.random() * 5);
    });

//show info
iconInfo
    .addEventListener('mouseover', function () {
        modalBg.style.display = 'block';
        info.style.display = 'block';
    });

//hide info
iconInfo
    .addEventListener('mouseout', function () {
        modalBg.style.display = 'none';
        ifEmptyList();
    });

function checkIfComplete() {
    let tasks = getAllListItems();
    if (tasks.length) {
        for (let i in tasks) {
            if (allItems.hasOwnProperty(i)) {
                if (!allItems[i].classList.contains('checked')) {
                    pyro.style.display = "none";
                    return;
                }
            }
        }
        pyro.style.display = "block"; //show effect
        return;
    }
    pyro.style.display = "none"; //hide effect
}

function getAllListItems() {
    return ulList.children;
}

function ifEmptyList() {
    info.style.display = getAllListItems().length ? "none" : "";
}

ifEmptyList();
let allItems = getAllListItems();
for (let i in allItems) {
    if (allItems.hasOwnProperty(i))
        setListeners(allItems[i]);
}