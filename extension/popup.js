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
// console.log(dividerWrapperOngoing);
// console.log(dividerWrapperUpcoming)
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
    window.setTimeout(()=>
        {
            divider.style.backgroundColor="#fff";
           // dividerWrapperOngoing.innerHTML="";
           document.querySelector("#centerGIF").style.display="none";

            //non threading in nature, so it is fine! It would not block the thread pool
        },
        4000
    )
     fetch("https://kontests.net/api/v1/all")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       // console.log(data);
        const upcomingContests = data.filter(function (element, index) {
            // console.log(element);
            // const end_time = new Date(element.end_time);
            
            // end_time = new Intl.DateTimeFormat('en-GB').format(end_time);
            // const today = new Intl.DateTimeFormat('en-GB').format(new Date());
            // console.log(end_time,today);
            // return (end_time > today);
            //console.log(element);
            //const end_time = new Date(element.end_time);
            //end_time = new Intl.DateTimeFormat('en-GB').format(end_time);
            //console.log(new Intl.DateTimeFormat('en-GB').format(new Date(element.end_time)),new Intl.DateTimeFormat('en-GB').format(new Date()));
            
            //return  (new Intl.DateTimeFormat('en-GB').format(new Date(element.start_time))>new Intl.DateTimeFormat('en-GB').format(new Date())) && element.status==='BEFORE' ;
            return (new Date(element.start_time).getTime() > new Date().getTime());

        });
        //upcomingContests.reverse();
         console.log(upcomingContests);
        console.log("promise fetched and data restored");
        buildProgram1(upcomingContests);
        //buildProgram(upcomingContests);
    });
    function buildProgram1(upcomingContests)
    {
        divider.style.padding="0rem 0rem";
        for(let i=0;i<upcomingContests.length;i++)
        {
        //console.log(new Date(upcomingContests[i].end_time));
       const endDate= (new Intl.DateTimeFormat(navigator.language,option).format(new Date(upcomingContests[i].end_time)));
       const startDate= (new Intl.DateTimeFormat(navigator.language,option).format(new Date(upcomingContests[i].start_time)));
        const templateHTML=`
        <div class="contestUpcoming">
            <div class="name">${upcomingContests[i].name}</div>
            <div class="starts"><b>Starts:</b> ${startDate}</div>
            <div class="platform">${upcomingContests[i].site}</div>
            <div class="ends"><b>Ends:</b> ${endDate}</div>
             <div class="register"><a href="${upcomingContests[i].url}" target="_blank">Join</a></div>  
        </div>
        `;
           dividerWrapperUpcoming.insertAdjacentHTML("beforeend",templateHTML);
        }


    }
})



btnOngoing.addEventListener("click",function(e)
{
    e.preventDefault();
    // dividerWrapperUpcoming.innerHTML="";
    // dividerWrapperOngoing.innerHTML="";
    const htmlToPut=`
    <div id="centerGIF"><center><img src="../img/wait.gif"></center></div>
    `;
    // dividerWrapperUpcoming.insertAdjacentHTML("beforeend",htmlToPut);
    // dividerWrapperOngoing.insertAdjacentHTML("beforeend",htmlToPut);
    console.log("hello");
    //step1: empty the upcoming tag or simply remove it
    dividerWrapperUpcoming.style.display="none";
    //step2: remove anything in there , by innerHTML
    dividerWrapperOngoing.innerHTML="";
    //step3: bring the wait GIF and mix the whole background
    divider.style.backgroundColor="#120917";
    dividerWrapperOngoing.insertAdjacentHTML("afterbegin",htmlToPut);
    //step4: work on the promise
    window.setTimeout(()=>
        {
            divider.style.backgroundColor="#fff";
           // dividerWrapperOngoing.innerHTML="";
           document.querySelector("#centerGIF").style.display="none";

            //non threading in nature, so it is fine! It would not block the thread pool
        },
        4000
    )
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
        for(let i=0;i<runningContests.length;i++)
        {
        //console.log(new Date(runningContests[i].end_time));
       const endDate= (new Intl.DateTimeFormat(navigator.language,option).format(new Date(runningContests[i].end_time)));
        const templateHTML=`
        <div class="contestOngoing">
            <div class="name">${runningContests[i].name}</div>
            <div class="ends-platform">
            <div class="ends"><b>Ends:</b> ${endDate}</div>
            <div class="platform">${runningContests[i].site}</div>
            </div>
            <div class="register"><a href="${runningContests[i].url}" target="_blank">Join</a></div>  
        </div>
        `;
           dividerWrapperOngoing.insertAdjacentHTML("beforeend",templateHTML);
        }


    }
})