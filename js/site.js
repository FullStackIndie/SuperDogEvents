var events = [{
        eventName: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        eventName: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        eventName: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        eventName: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        eventName: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        eventName: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        eventName: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        eventName: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        eventName: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

loadData();

function loadData(){
    let allEvents = [];
    allEvents = getData();
    displayData(allEvents);
}

function getData(){
    let allEvents = JSON.parse(localStorage.getItem("events")) || [];
    if(allEvents.length == 0){
        allEvents = events;
        localStorage.setItem("events", JSON.stringify(allEvents));
    }
    return allEvents;
}

function saveEvents(){
    // grab the events out of local storage
    let allEvents = JSON.parse(localStorage.getItem("events")) || events;

    let event = {
        eventName: document.getElementById("newEventName").value,
        city: document.getElementById("newCity").value,
        state: document.getElementById("newState").value,
        attendance: document.getElementById("newAttendance").value,
        date: formatDate(document.getElementById("newDate").value)
    };

    allEvents.push(event);

    localStorage.setItem("events", JSON.stringify(allEvents));

    displayData(allEvents);
    buildDropDown();
}

function displayData(allEvents){
    const template = document.getElementById("Data-Template");
    const resultsBody = document.getElementById("resultsBody");
    // clear table first
    resultsBody.innerHTML = "";
    for(let i = 0; i < allEvents.length; i++){
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("eventName").textContent = allEvents[i].eventName;
        dataRow.getElementById("city").textContent = allEvents[i].city;
        dataRow.getElementById("state").textContent = allEvents[i].state;
        dataRow.getElementById("attendance").textContent = allEvents[i].attendance;
        dataRow.getElementById("date").textContent = allEvents[i].date;

        resultsBody.appendChild(dataRow);
    }
}


function buildDropDown(){
    let eventDD = document.getElementById("eventDropDown");
    let allEvents = JSON.parse(localStorage.getItem("events")) || events;
    let distinctEvents = [...new Set(allEvents.map(event => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for(let i = 0; i < distinctEvents.length; i++){
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;
    displayStats(events);
}

function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for(let i = 0; i < filteredEvents.length; i++){
        currentAttendance = parseInt(filteredEvents[i].attendance);
        total += currentAttendance;

        if(most < currentAttendance){
            most = currentAttendance;
        }
        if(least > currentAttendance || least < 0){
            least = currentAttendance;
        }
    }

    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            }
        );
}

function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("events")) || events; 
    let filteredEvents = curEvents;

    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if(city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if(event.city == city){
                return event;
            }
        });
    }
    displayStats(filteredEvents);
}

// Reformat new dates
function formatDate(dateString) {

    let [year, month, day] = dateString.replace(/-/g, '/').split('/');
    return [month, day, year].join('/');
    // let [year, month, day] = dateString.split('-');
    // return [month, day, year].join('/');
}
