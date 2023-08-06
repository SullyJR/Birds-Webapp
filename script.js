
let birdDataArray = [];
let birdMap = new Map();

// A function to fetch the data from the JSON file
async function fetchData() {
    try {
        const response = await fetch("./data/nzbird.json");
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// A function to initialize all the bird profiles
//creating the elements and appending them to the DOM
async function initializeBirds() {
    birdDataArray = await fetchData();
    displayBirds("az");
    getBirdNames();
}

//a function to displau the bird profiles
function displayBirds(sort) {
    
    document.getElementById('main').innerHTML = "";

    switch(sort) {
        case "az":
            birdDataArray.sort((a, b) => (a.primary_name > b.primary_name) ? 1 : -1);
            break;
        case "za":
            birdDataArray.sort((a, b) => (a.primary_name < b.primary_name) ? 1 : -1);
            break;
        case "lightest":
            birdDataArray.sort((a, b) => (a.size.weight.value > b.size.weight.value) ? 1 : -1);
            break;
        case "heaviest":
            birdDataArray.sort((a, b) => (a.size.weight.value < b.size.weight.value) ? 1 : -1);
            break;
        case "shortest":
            birdDataArray.sort((a, b) => (a.size.length.value > b.size.length.value) ? 1 : -1);
            break;
        case "longest":
            birdDataArray.sort((a, b) => (a.size.length.value < b.size.length.value) ? 1 : -1);
    }

    for (let i = 0; i < birdDataArray.length; i++) {
        // Rest of your code to display bird profiles
        let newBird = document.createElement('div');
        newBird.setAttribute('class', 'bird-profile');

        let front = document.createElement('div');
        front.setAttribute('class', 'front-side');

        let back = document.createElement('div');
        back.setAttribute('class', 'back-side');

        let frontDetails = document.createElement('div');
        frontDetails.setAttribute('class', 'front-details');

        let backHeading = document.createElement('div');
        backHeading.setAttribute('class', 'back-heading');

        let table = document.createElement('div');
        table.setAttribute('class', 'table');

        let titles = document.createElement('div');
        titles.setAttribute('class', 'titles');

        let values = document.createElement('div');
        values.setAttribute('class', 'values');

        let titleScienceName = document.createElement('p');
        let titleOrder = document.createElement('p');
        let titleFamily = document.createElement('p');
        let titleConservationStatus = document.createElement('p');
        let titleWeight = document.createElement('p');
        let titleLength = document.createElement('p');

        
        let primaryName = document.createElement('h3');
        primaryName.setAttribute('class', 'bird-name');
        
        let englishName = document.createElement('h3');
        let scienceName = document.createElement('p');
        let order = document.createElement('p');
        let family = document.createElement('p');
        
        let conservationStatus = document.createElement('p');
        conservationStatus.setAttribute('class', 'status-word');

        let weight = document.createElement('p');
        let length = document.createElement('p');
        let birdImage = document.createElement('img');
        let birdImageCredit = document.createElement('p');
        birdImageCredit.setAttribute('class', 'bird-image-credit');

        let photographer = birdDataArray[i].photo.credit;
        let msg = `Photo by ${photographer}`;


        titleScienceName.textContent = 'Scientific Name';
        titleOrder.textContent = 'Order';
        titleFamily.textContent = 'Family';
        titleConservationStatus.textContent = 'Status';
        titleWeight.textContent = 'Weight';
        titleLength.textContent = 'Length';

    
        primaryName.textContent = birdDataArray[i].primary_name;
        englishName.textContent = birdDataArray[i].english_name;
        scienceName.textContent = birdDataArray[i].scientific_name; 
        order.textContent = birdDataArray[i].order;
        family.textContent = birdDataArray[i].family;
        conservationStatus.textContent = birdDataArray[i].status;
        weight.textContent = birdDataArray[i].size.weight.value + ' ' + birdDataArray[i].size.weight.units;
        length.textContent = birdDataArray[i].size.length.value + ' ' + birdDataArray[i].size.length.units;
        birdImage.src = birdDataArray[i].photo.source;
        birdImage.alt = birdDataArray[i].primary_name;
        birdImageCredit.textContent = msg;
        
        front.appendChild(birdImage);
        frontDetails.appendChild(primaryName);
        frontDetails.appendChild(birdImageCredit);
        front.appendChild(frontDetails);
        
        backHeading.appendChild(englishName);
        values.appendChild(scienceName);
        values.appendChild(order);
        values.appendChild(family);
        values.appendChild(conservationStatus);
        values.appendChild(weight);
        values.appendChild(length);
        
        titles.appendChild(titleScienceName);
        titles.appendChild(titleOrder);
        titles.appendChild(titleFamily);
        titles.appendChild(titleConservationStatus);
        titles.appendChild(titleWeight);
        titles.appendChild(titleLength);

        table.appendChild(titles);
        table.appendChild(values);
        
        back.appendChild(backHeading);
        back.appendChild(table);

        newBird.appendChild(front);
        newBird.appendChild(back);
        document.getElementById('main').appendChild(newBird);
    }

    setConserveStatus();
}


//A function to get all the birds
//various names into one array
function getBirdNames() {
    for (let i = 0; i < birdDataArray.length; i++) {
        
        let primaryBirdName = birdDataArray[i].primary_name.toLowerCase().normalize("NFC");

        let birdNames = [];

        birdNames.push(birdDataArray[i].english_name.toLowerCase().normalize("NFC"));
        birdNames.push(birdDataArray[i].scientific_name.toLowerCase().normalize("NFC"));
        
        let other_names = birdDataArray[i].other_names;

        for(let j = 0; j < other_names.length ; j++){
            birdNames.push(other_names[j].toLowerCase().normalize("NFC"));
        }

        birdMap.set(primaryBirdName, birdNames);
    }

    
}

//Add constant for the search button
const searchButton = document.querySelector('#filter-results');

//Add event listener to the search button
searchButton.addEventListener('click', searchButtonPressed);

//A function to search for the bird
function searchButtonPressed( eventData ) {
    eventData.preventDefault();
    let searchInput = document.getElementById('search-bar').value.toLowerCase().normalize("NFC");
    let conservationDropdown = document.getElementById('conservation-status').value;
    let sortDropdown = document.getElementById('sort-by').value;
    displayBirds(sortDropdown);
    let birds = document.querySelectorAll('.bird-profile');
    for (let i = 0; i < birds.length ; i++) {
        let birdName = birds[i].querySelector('.bird-name').textContent.toLowerCase().normalize("NFC");
        let status = transformString(birds[i].querySelector('.status-word').textContent.toLowerCase().normalize("NFC"));
        let arrayOfNames = birdMap.get(birdName);
        for(let j = 0; j < arrayOfNames.length; j++){
            if ((arrayOfNames[j].includes(searchInput) || birdName.includes(searchInput) || searchInput === null || searchInput === "") && (status === conservationDropdown || conservationDropdown === "all")){
                birds[i].classList.remove('is-hidden');
                break;
            } else {
                birds[i].classList.add('is-hidden');
            }
    }
    }
}

//sets a span element to the conservation status of each bird
//the span element is a circle in line with the status on the back-side of each bird profile
function setConserveStatus() {
    for(let i = 0; i < birdDataArray.length; i++){
        let birdStatus = birdDataArray[i].status;
        let birdProfile = document.querySelectorAll('.bird-profile');
        birdProfile[i].querySelector('.status-word').classList.add(`${transformString(birdStatus)}-border`);
    }
}


//formats string to set class names for conservation status from json file
function transformString(inputString) {
    const words = inputString.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].toLowerCase();
    } else if (words.length === 2) {
        return `${words[0].toLowerCase()}-${words[1].toLowerCase()}`;
    } else {
        return inputString.toLowerCase();
    }
}

initializeBirds();

