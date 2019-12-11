const $main = $('.main');
const $list = $('.list');
const $button = $('.addButton');
const $firstInput = $('.input-english-word');
const $secondInput = $('.input-meaning');

let list = [];
let checkState = [];
let idCounter = 0;


function SingleElement(idCounter, firstInputValue, secondInputValue, checkState) {
    this.idCounter = idCounter;
    this.firstInputValue = firstInputValue;
    this.secondInputValue = secondInputValue;
    this.checkState = checkState;
}
function clearInput(inputName) {
    inputName.val('');
}
function newListObject(idCounter, firstInputValue, secondInputValue, checkState) {
    const elementObject = new SingleElement(idCounter, firstInputValue, secondInputValue, checkState);
    list.push(elementObject);
}
function addTagsToListElement(idCounter, firstInputValue, secondInputValue, checkState) {
    const $listElement = $('<div>').addClass('list-element').attr('id', idCounter);
    const $checkbox = $('<input>').addClass('checkbox').attr({ type: 'checkbox', id: `checkbox${idCounter}` }).prop('checked', checkState);
    const $checkLlabel = $('<label>').addClass('checkLabel').attr('for', `checkbox${idCounter}`);
   
    const $wordBox = $('<div>').addClass('wordBox');
    const $englishWord = $('<span>').addClass('englishWord').text(firstInputValue);
    const $polishWord = $('<span>').addClass('polishWord').text(secondInputValue);
    const $deleteButton = $('<button>').addClass('button deleteButton').html('&#10008');


    $list.append($listElement);
    $listElement.append($checkbox);
    $listElement.append($checkLlabel);
    $listElement.append($wordBox);

    $wordBox.append($englishWord);
    $wordBox.append($polishWord);
    $listElement.append($deleteButton)
}
function saveCheckState() {
    localStorage.setItem("checkState", JSON.stringify(checkState))
}
function getCheckState() {
    checkState = JSON.parse(localStorage.getItem('checkState'));
    if(!checkState) {
        checkState = [];
    }
}
function saveCounter() {
    localStorage.setItem('idCounter', JSON.stringify(idCounter));
}
function getCounter() {
    idCounter = JSON.parse(localStorage.getItem('idCounter'));
    if (!idCounter) {
        idCounter = 0;
    }
}
function saveList() {
    localStorage.setItem('list', JSON.stringify(list));
}
function getList() {
    list = JSON.parse(localStorage.getItem('list'));
    if (!list) {
        list = [];
    }
}
function createListElement() {
    const $firstInputValue = $firstInput.val();
    const $secondInputValue = $secondInput.val();

    if ($firstInputValue != '' && $secondInputValue != '') {
        checkState[idCounter] = false;
        addTagsToListElement(idCounter, $firstInputValue, $secondInputValue, false);
        newListObject(idCounter, $firstInputValue, $secondInputValue, false);
        saveList();
        saveCheckState();
        idCounter++;
        saveCounter();
    } else {
        console.log('Wprowadź dane')
    }
}
function clickButton() {
    $($button).click(() => {
        createListElement();
        clearInput($firstInput);
        clearInput($secondInput);
    })
}
function clickDeleteButton() {
    $($list).on('click', e => {
        if(e.target.closest('.deleteButton') !== null) {
            e.target.closest('.list-element').remove();
            const id = $(e.target).parent().attr('id');
            deleteElement(id);
            saveList();
            saveCheckState();
        }

        if(e.target.closest('.checkbox') !== null) {
            const id = $(e.target).parent().attr('id');
           
            if($(e.target).is(':checked')) {
                checkState[id] = true;
                list[id].checkState = checkState[id];
            } else {
                checkState[id] = false;
                list[id].checkState = checkState[id];
            }
            saveCheckState();
        }
    });
}
function loadList() {
    for (let i = 0; i < list.length; i++) {
        if (list[i] != '') {
            addTagsToListElement(list[i].idCounter, list[i].firstInputValue, list[i].secondInputValue, checkState[i]);
        }
    }
}
function deleteElement(id) {
    checkState[id] = '';
    list[id] = '';
}

getCheckState();
getCounter();
getList();
loadList();
clickButton();
clickDeleteButton();



