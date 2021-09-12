'use strict';
const wishLabel = document.querySelector(".wish");
const movetoContestsButton = document.querySelector('#movetoSites');
const sectionPlatforms = document.querySelector('.platforms');


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

/////////////////////////////////
movetoContestsButton.addEventListener('click',(e)=>
{
    e.preventDefault(); //does not reload
    sectionPlatforms.scrollIntoView(
        {
            "behavior":"smooth"
        }
    )

})