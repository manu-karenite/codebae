'use strict';
const wishLabel = document.querySelector(".wish");

///////////////////////////////////////////
const now = new Date();
console.log(now);
const hour = now.getHours();
console.log(hour);
let mood =undefined;


if(hour>=6 && hour<=11)
    mood="Morning";
else if(hour>=12 && hour<=16)
    mood ="Afternoon";
else if(hour>=17 && hour<=21)
    mood ="Evening";
else
    mood="Night";

wishLabel.textContent=`Good ${mood}!`;