"use strict";

const textarea   = document.querySelector('.textarea');
const buttonSave = document.querySelector('.btn');
const menu       = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-button');
const offer      = document.querySelector('.menu-offer');


let notes = JSON.parse(localStorage.getItem('notes')) || [];
let count = 0;
let state = { edit: false, key: undefined }

// Створю записи
for (let note of notes) {
    createNote(note.now)
}

// Нажимаю на кнопку зберегти
buttonSave.addEventListener('click', function () {

    // Режим редагування
    if (state.edit) {
        notes[state.key].text = textarea.value;
        notes[state.key].now = time();

        // Зберігаю в локальне сховище
        localStorage.setItem('notes', JSON.stringify(notes));

        // Чищу текстареа
        clearTextarea();

        // Переходжу в режим додавання
        state = { edit: false, key: undefined }

        // Режим додавання
    } else {
        if (textarea.value.length > 0) {
            // Час
            let date = time();

            //Створюю та додаю новий запис в масив і в локал сторедж
            let newElem = {
                now: date,
                text: textarea.value,
            };

            notes.push(newElem);
            localStorage.setItem('notes', JSON.stringify(notes));

            // Сворюю та додаю нивий пункт меню
            createNote(date);

            // Чищу текстареа
            clearTextarea();
        }
    }
});

// Функції
function time() {
    let data = new Date();
    let now =
        addZero(data.getHours()) + ':' +
        addZero(data.getMinutes()) + ':' +
        addZero(data.getSeconds()) + ' ' +
        addZero(data.getDate()) + ' ' +
        addZero(data.getMonth() + 1) + ' ' +
        addZero(data.getFullYear());

    return now;
}

function addZero(num) {
    if (num > 0 && num <= 9) {
        return '0' + num;
    } else {
        return num
    }
}

menu.addEventListener('click', function (event) {
    // Номер батьківського елементу
    let number = event.target.closest('li').dataset.num;

    // Клік по спанови перехід в режим редагування
    if (event.target.tagName === 'SPAN') {
        textarea.value = notes[number].text;

        state = { edit: true, key: number};

        // По клікови на спан закриваю меню
        offer.classList.remove('active');
    }

    // Клік по посиланню 
    if (event.target.tagName === 'A') {

        event.preventDefault();
        textarea.value = notes[number].text;

        // Видаляю елемент з меню
        document.querySelector(`[data-num="${number}"]`).remove();
        // Видаляю елемент з масива
        notes.splice(number, 1);
        // Видаляю елемент з сховища
        localStorage.setItem('notes', JSON.stringify(notes));
        // Чищу текстареа
        textarea.value = '';
    }

});

// Показую меню
menuButton.addEventListener('click', function () {
    if (offer.classList.contains('active')) {
        offer.classList.remove('active')
    } else {
        offer.classList.add('active')
    }
})

function clearTextarea() {
    textarea.value = '';
}

function createNote(date) {
    let li = document.createElement('li');
        li.dataset.num = count++;
        li.innerHTML =
            `<span>${date}</span>
                    <a href='#' class="remove-item">Delate</a>`

    menu.appendChild(li);
    return li;
}