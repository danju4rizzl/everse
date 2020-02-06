'use strict';

let page = document.getElementById('buttonDiv');

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

const textColor = ['#000', #FFF];

function constructOptions(kButtonColors, textColor) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');

        button.style.backgroundColor = item;

        button.addEventListener('click', function () {
            chrome.storage.sync.set({
                color: item
            }, function () {
                console.log('color is ' + item);
                alert(`Selected ${item}`)
            })
        });
        page.appendChild(button);
    }
}
constructOptions(kButtonColors, textColor);