//Program to adjust footer according the number of items in the list
let body = document.body;
let listItems = document.querySelectorAll(".list-item");

if (listItems.length <= 7) {
    // Do nothing
} else {
    let height = parseFloat(window.getComputedStyle(body).height);
    let additionalHeight = (listItems.length - 7) * 60; 
    body.style.height = (height + additionalHeight) + 'px';
}
