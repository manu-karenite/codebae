'use strict';

const btnUpcoming=document.querySelector("#btnUpcoming");
const btnOngoing=document.querySelector("#btnOngoing");

const dividerWrapperOngoing=document.querySelector(".divider__wrapper--ongoing");
const dividerWrapperUpcoming=document.querySelector(".divider__wrapper--upcoming");
const divider=document.querySelector(".divider");
const header=document.querySelector(".symbol-time");

const logo1=document.querySelector(".icon1");
const logo2=document.querySelector(".icon2");

let upcoming = false;
let ongoing=false;
const option = 
    {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        weekday: 'short',
        hour :"numeric",
        minute:"numeric",
    }  

function upcomingSet()
{
    const htmlToPut=`
    <div id="centerGIFF"><center><img src="../img/wait.gif"></center></div>
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
      document.querySelector("#centerGIFF").style.display="none";
      console.log( document.querySelector("#centerGIF"));
      console.log("heyyyyyy");
        logo1.innerHTML="";
        
        const img1=`<img src="../img/svg/clock1.svg" alt="Home" style="height: 3rem;
                    width: 3rem;" title="View Ongoing Contests" id="renderOngoing">`;
        logo1.insertAdjacentHTML("beforeend",img1);
        divider.style.backgroundColor="#fff";
        dividerWrapperUpcoming.style.display="block";
        document.getElementById("renderOngoing").addEventListener("click",(e)=>
        {
            e.preventDefault();
            ongoingSet();
            console.log("mamma");
        })
    }
}
function ongoingSet()
{
    ongoing=true;
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
        divider.style.padding="0rem 0rem";
        const head=`<div class="head">ONGOING CONTESTS</div>`;
        for(let i=0;i<runningContests.length;i++)
        {

        let bg = "#352f44";
        let color = "#f5f5f5";
        if (i % 2 == 1) {
            bg = "#dbd8e3";
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
        console.log("hijj");
        logo1.innerHTML="";
        const img1=`<img src="../img/svg/cal.svg" alt="Home" style="height: 3rem;
                    width: 3rem;" title="View Upcoming Contests" id="renderUpcoming">`;
        console.log(img1);
        logo1.insertAdjacentHTML("beforeend",img1);
        console.log("hey!");
        divider.style.backgroundColor="#fff";
        dividerWrapperOngoing.style.display="block";
        document.getElementById("renderUpcoming").addEventListener("click",(e)=>
        {
            e.preventDefault();
            upcomingSet();
            console.log("mamma");
        })
    }
}

btnOngoing.addEventListener("click",function(e)
{
    e.preventDefault();
    ongoingSet();
   
})


btnUpcoming.addEventListener("click",function(e)
{
     e.preventDefault();
     upcomingSet();
})

