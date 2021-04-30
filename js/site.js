var events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

// loadAddressBook();

function loadAddressBook(){
    let addressBook = [];
    addressBook = getData();
    displayData(addressBook);
}

function getData(){
    let addressBook = JSON.parse(localStorage.getItem("events")) || [];
    if(addressBook.length == 0){
        addressBook = events;
        localStorage.setItem("events", JSON.stringify(addressBook));
    }
    return addressBook;
}

function saveAddress(){
    // grab the events out of local storage
    let addressBook = JSON.parse(localStorage.getItem("events")) || events;

    let obj = {};
    obj["name"] = document.getElementById("newName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["email"] = document.getElementById("newEmail").value;
    obj["phone"] = document.getElementById("newPhone").value;

    addressBook.push(obj);

    localStorage.setItem("eventsArray", JSON.stringify(addressBook));

    displayData(addressBook);

}

function displayData(addressBook){
    const template = document.getElementById("Data-Template");
    const resultsBody = document.getElementById("resultsBody");
    // clear table first
    resultsBody.innerHTML = "";
    for(let i = 0; i < addressBook.length; i++){
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("name").textContent = addressBook[i].name;
        dataRow.getElementById("city").textContent = addressBook[i].city;
        dataRow.getElementById("state").textContent = addressBook[i].state;
        dataRow.getElementById("email").textContent = addressBook[i].email;
        dataRow.getElementById("phone").textContent = formatPhoneNumber(addressBook[i].phone);

        resultsBody.appendChild(dataRow);
    }
}

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    (/^\d{10}$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

var filteredEvents = events;

function buildDropDown(){
    let eventDD = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(events.map(event => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for(let i = 0; i < distinctEvents.length; i++){
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;
    displayStats();
}

function displayStats(){
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for(let i = 0; i < filteredEvents.length; i++){
        currentAttendance = filteredEvents[i].attendance;
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
    filteredEvents = curEvents;

    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if(city != "All") {
        filteredEvents = curEvents.filter(function (event){
            if(event.city == city){
                return event;
            }
         });
    }
    displayStats();
}

// Reformat new dates
function formatDate(dateString) {
    let [year, month, day] = dateString.split('-');
    return [month, day, year].join('/');
}
