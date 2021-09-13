'use strict';
const upcomingSection = document.querySelector('.upcoming-contests');



const upcomingHead=`      <tr class="individual-contest">
                       <td class="nameh icsoloh">Name</td>
                       <td class="platformh icsoloh">Platform</td>
                       <td class="start-dateh icsoloh">Starts</td>
                       <td class="end-dateh icsoloh">Ends</td>
                       <td class="registerh icsoloh">Register</td>
                       <td class="durationh icsoloh">in 1 Day</td>
                    </tr>`;




function upcomingDisplay(upcomingContests)
{
    //title is to be set first
    upcomingSection.innerHTML=``;
    upcomingSection.insertAdjacentHTML("beforeend",upcomingHead);

    //now, we need to handle all the other contests;
    let html = undefined;
   for(const item of upcomingContests)
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
        upcomingSection.insertAdjacentHTML("beforeend",html);
        
   }
    
}







let upcomingContests=undefined;
fetch("https://kontests.net/api/v1/all").then(function(response)
{
    return response.json();
}).then(function(data)
{
    
     upcomingContests = data.filter(function(element,index)
    {
        return (element.status==='BEFORE');
    })
    console.log(upcomingContests);
    upcomingDisplay(upcomingContests);
})
