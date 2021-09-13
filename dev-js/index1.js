'use strict';
const wishLabel = document.querySelector(".wish");
const movetoContestsButton = document.querySelector('.movetoSites');
const sectionPlatforms = document.querySelector('.platforms');
const runningSection = document.querySelector('.running-contests');

const runningHead=`      <tr class="individual-contest">
                       <td class="nameh icsoloh">Name</td>
                       <td class="platformh icsoloh">Platform</td>
                       <td class="start-dateh icsoloh">Starts</td>
                       <td class="end-dateh icsoloh">Ends</td>
                       <td class="registerh icsoloh">Register</td>
                       <td class="durationh icsoloh">in 1 Day</td>
                    </tr>`;
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

function runningDisplay(runningContests)
{
    //title is to be set first
    runningSection.innerHTML=``;
    runningSection.insertAdjacentHTML("beforeend",runningHead);

    //now, we need to handle all the other contests;
    let html = undefined;
   for(const item of runningContests)
   {
     const option = 
    {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        weekday: 'short',
        hour :"numeric",
        minute:"numeric",
    }  
    let [startDate,endDate] = [new Intl.DateTimeFormat("en-IN",option).format(new Date(item.start_time)),new Intl.DateTimeFormat('en-IN',option).format(new Date(item.end_time))];

    const classToPut="greenc";
    if(item.in_24_hours==="NO")
        classToPut="redc";
        html = `
                <tr class="individual-contest">
                    <td class="name icsolo">${item.name}</td>
                       <td class="platform icsolo">${item.site}</td>
                       <td class="start-date icsolo">${startDate}</td>
                       <td class="end-date icsolo">${endDate}</td>
                       <td class="register icsolo">
                       <a href="${item.url}" target="_blank" class="remove-decoration">Register</a></td>
                        <td class=in24Hours icsolo ${classToPut}">yes</td>
                       
                  </tr>`;
        runningSection.insertAdjacentHTML("beforeend",html);
        
   }
    
}

let runningContests=undefined;

fetch("https://kontests.net/api/v1/all").then(function(response)
{
    return response.json();
}).then(function(data)
{
    //filter kar lo
    runningContests = data.filter(function(element,index)
    {
        return (element.status==='CODING');
    })
    runningContests.reverse();
    ////////////
     console.log(runningContests);
    runningDisplay(runningContests);
    
   
})


