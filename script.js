"use strict";

const textarea = document.querySelector('.textarea');
const button   = document.querySelector('.button');
const menuList = document.querySelector('.menu');

let notes   = JSON.parse(localStorage.getItem('notes')) || [];
let counter = 0;

for(let i of notes){

        let li = document.createElement('li');
            li.dataset.num = counter++;
            li.textContent = i.time;
            menuList.appendChild(li);

            li.addEventListener('click', function () {
                let num = this.dataset.num;
                textarea.value = notes[num].text;
                state = {edit: true, key: num}
            });
}

let state = {edit: false, key: undefined}

button.addEventListener('click', function () {

    if (state.edit) {

        notes[state.key].text = textarea.value;
        textarea.value = '';

        state = {edit: false, key: undefined}

        localStorage.setItem('notes', JSON.stringify(notes));
    } else {

        let data = new Date();
        let now =
            addZero(data.getHours()) + ':' +
            addZero(data.getMinutes()) + ':' +
            addZero(data.getSeconds()) + ' ' +
            addZero(data.getDate()) + ' ' +
            addZero(data.getMonth() + 1) + ' ' +
            addZero(data.getFullYear());

        notes.push({text: textarea.value, time: now});
        localStorage.setItem('notes', JSON.stringify(notes));
        textarea.value = '';

        let li = document.createElement('li');
            li.dataset.num = notes.length -1;
            li.textContent = now;
            menuList.appendChild(li);

            li.addEventListener('click', function () {
                let num = this.dataset.num;
                textarea.value = notes[num].text;
                state = {edit: true, key: num};
            });
    }
});

function addZero(num) {
    if (num > 0 && num <= 9) {
        return '0' + num;
    } else {
        return num
    }
}