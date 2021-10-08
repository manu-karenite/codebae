'use strict';

const btnUpcoming=document.querySelector("#btnUpcoming");
const btnOngoing=document.querySelector("#btnOngoing");

const dividerWrapperOngoing=document.querySelector(".divider__wrapper--ongoing");
const dividerWrapperUpcoming=document.querySelector(".divider__wrapper--upcoming");
const divider=document.querySelector(".divider");

const option = 
    {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        weekday: 'short',
        hour :"numeric",
        minute:"numeric",
    }  
btnUpcoming.addEventListener("click",function(e)
{
    e.preventDefault();
    const htmlToPut=`
    <div id="centerGIF"><center><img src="../img/wait.gif"></center></div>
    `;
     console.log("hello from upcoming");
     dividerWrapperOngoing.style.display="none";
     dividerWrapperUpcoming.innerHTML="";
     divider.style.backgroundColor="#120917";
    dividerWrapperUpcoming.insertAdjacentHTML("afterbegin",htmlToPut);
     fetch("https://kontests.net/api/v1/all")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const upcomingContests = data.filter(function (element, index) {
            
            return (new Date(element.start_time).getTime() > new Date().getTime());

        });
         console.log(upcomingContests);
        console.log("promise fetched and data restored");
        buildProgram1(upcomingContests);
    });
    function buildProgram1(upcomingContests)
    {
        divider.style.padding="0rem 0rem";
        for(let i=0;i<upcomingContests.length;i++)
        {
        let bg = "#062743";
        let color = "#f5f5f5";
        if (i % 2 == 1) {
            bg = "#c4ffdd";
            color = "#000";
        }
       const endDate= (new Intl.DateTimeFormat(navigator.language,option).format(new Date(upcomingContests[i].end_time)));
       const startDate= (new Intl.DateTimeFormat(navigator.language,option).format(new Date(upcomingContests[i].start_time)));
        const templateHTML=`
        <div class="contestUpcoming" style="background-color:${bg}">
            <div class="name" style="color:${color}">${upcomingContests[i].name}</div>
            <div class="starts" style="color:${color}"><b>Starts:</b> ${startDate}</div>
            <div class="platform" style="color:${color}">${upcomingContests[i].site}</div>
            <div class="ends" style="color:${color}"><b>Ends:</b> ${endDate}</div>
             <div class="register" ><a href="${upcomingContests[i].url}" target="_blank" style="color:${color}">Register</a></div>  
        </div>
        `;
           dividerWrapperUpcoming.insertAdjacentHTML("beforeend",templateHTML);
        }
        document.querySelector("#centerGIF").style.display="none";
        divider.style.backgroundColor="#fff";

    }
})



btnOngoing.addEventListener("click",function(e)
{
    e.preventDefault();

    const htmlToPut=`
    <div id="centerGIF"><center><img src="../img/wait2.gif"></center></div>
    `;
    console.log("hello");
    //step1: empty the upcoming tag or simply remove it
    dividerWrapperUpcoming.style.display="none";
    //step2: remove anything in there , by innerHTML
    dividerWrapperOngoing.innerHTML="";
    //step3: bring the wait GIF and mix the whole background
    divider.style.backgroundColor="#120917";
    dividerWrapperOngoing.insertAdjacentHTML("afterbegin",htmlToPut);
    fetch("https://kontests.net/api/v1/all")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const runningContests = data.filter(function (element, index) {
            return element.status === "CODING";
        });
        runningContests.reverse();
         console.log(runningContests);
        console.log("promise fetched and data restored");
        buildProgram(runningContests);
    });
    
    function buildProgram(runningContests)
    {
        //dividerWrapperOngoing.style.display="none";
        divider.style.padding="0rem 0rem";
        for(let i=0;i<runningContests.length;i++)
        {

        let bg = "#302a77";
        let color = "#f5f5f5";
        if (i % 2 == 1) {
            bg = "#fdea2e";
            color = "#000";
        }
       const endDate= (new Intl.DateTimeFormat(navigator.language,option).format(new Date(runningContests[i].end_time)));
        const templateHTML=`
        <div class="contestOngoing"  style="background-color:${bg}">
            <div class="name" style="color:${color}">${runningContests[i].name}</div>
            <div class="ends-platform">
            <div class="ends" style="color:${color}"><b>Ends:</b> ${endDate}</div>
            <div class="platform" style="color:${color}">${runningContests[i].site}</div>
            </div>
            <div class="register"><a href="${runningContests[i].url}" target="_blank" style="color:${color}">Join</a></div>  
        </div>
        `;
           dividerWrapperOngoing.insertAdjacentHTML("beforeend",templateHTML);
        }
        document.querySelector("#centerGIF").style.display="none";
        divider.style.backgroundColor="#fff";
    }
})