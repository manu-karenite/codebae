"use strict";
const movetoContestsButton = document.querySelector(".movetoSites");
const sectionPlatforms = document.querySelector(".platforms");
const runningSection = document.querySelector(".running-contests");
const runningHead = `      <tr class="individual-contest">
                       <td class="nameh icsoloh">Name</td>
                       <td class="platformh icsoloh">Platform</td>
                       <td class="start-dateh icsoloh">Starts</td>
                       <td class="end-dateh icsoloh">Ends</td>
                       <td class="registerh icsoloh">Register</td>
                       <td class="durationh icsoloh">Status</td>
                    </tr>`;

const option = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
};
let html = undefined;
function setHeader() {
    runningSection.innerHTML = ``;
    runningSection.insertAdjacentHTML("beforeend", runningHead);
}
function setRows(array, colorClass, text) {
    for (const item of array) {
        let [startDate, endDate] = [new Intl.DateTimeFormat("en-IN", option).format(new Date(item.start_time)), new Intl.DateTimeFormat("en-IN", option).format(new Date(item.end_time))];
        html = `
                <tr class="individual-contest">
                    <td class="name icsolo">${item.name}</td>
                       <td class="platform icsolo">${item.site}</td>
                       <td class="start-date icsolo">${startDate}</td>
                       <td class="end-date icsolo">${endDate}</td>
                       <td class="register icsolo">
                       <a href="${item.url}" target="_blank" class="remove-decoration">Register</a></td>
                        <td class="in24Hours icsolo ${colorClass}">${text}</td>
                  </tr>`;
        runningSection.insertAdjacentHTML("beforeend", html);
    }
}

let siteContests = undefined;
let runningContests = undefined;
let inOneDayContests = undefined;
let afterOneDayContests = undefined;

fetch("https://kontests.net/api/v1/all")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        siteContests = data.filter(function (element, index) {
            return element.site === "LeetCode";
        });

        runningContests = siteContests.filter((element, index) => {
            return element.status === "CODING";
        });
        inOneDayContests = siteContests.filter((element, index) => {
            return element.status === "BEFORE" && element.in_24_hours === "Yes";
        });
        afterOneDayContests = siteContests.filter((element, index) => {
            return element.status === "BEFORE" && element.in_24_hours === "No";
        });
        runningContests.reverse();
        inOneDayContests.reverse();
        setHeader();
        setRows(inOneDayContests, "redc", "1d remaining!");
        setRows(runningContests, "yellowc", "Ongoing");
        setRows(afterOneDayContests, "greenc", ">1d remaining!");
    });
