
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
async function initializeBirds() {
    birdDataArray = await fetchData();
    for (let i = 0; i < birdDataArray.length; i++) {
        // Rest of your code to display bird profiles
        let newBird = document.createElement('div');
        newBird.setAttribute('class', 'bird-profile');

        let front = document.createElement('div');
        front.setAttribute('class', 'front-side');

        let back = document.createElement('div');
        back.setAttribute('class', 'back-side');
        
        let primaryName = document.createElement('h3');
        primaryName.setAttribute('class', 'bird-name');
        let englishName = document.createElement('p');
        let scienceName = document.createElement('p');
        let order = document.createElement('p');
        let family = document.createElement('p');
        let conservationStatus = document.createElement('p');
        let weight = document.createElement('p');
        let length = document.createElement('p');
        let birdImage = document.createElement('img');
    
        primaryName.textContent = birdDataArray[i].primary_name;
        englishName.textContent = birdDataArray[i].english_name;
        scienceName.textContent = birdDataArray[i].scientific_name; 
        order.textContent = birdDataArray[i].order;
        family.textContent = birdDataArray[i].family;
        conservationStatus.textContent = birdDataArray[i].status;
        weight.textContent = birdDataArray[i].size.weight.value;
        length.textContent = birdDataArray[i].size.length.value;
        birdImage.src = birdDataArray[i].photo.source;
        birdImage.alt = birdDataArray[i].primary_name;
        front.appendChild(birdImage);
        front.appendChild(primaryName);
        back.appendChild(englishName);
        back.appendChild(scienceName);
        back.appendChild(order);
        back.appendChild(family);
        back.appendChild(conservationStatus);
        back.appendChild(weight);
        back.appendChild(length);

        newBird.appendChild(front);
        newBird.appendChild(back);
        document.getElementById('main').appendChild(newBird);
    }
    getBirdNames();
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

    console.log(searchInput.toLowerCase().normalize("NFC"));
    let birds = document.querySelectorAll('.bird-profile');
    for (let i = 0; i < birds.length ; i++) {
        let birdName = birds[i].querySelector('.bird-name').textContent.toLowerCase().normalize("NFC");
        let arrayOfNames = birdMap.get(birdName);
        console.log(arrayOfNames);
        for(let j = 0; j < arrayOfNames.length; j++){
            if (arrayOfNames[j].includes(searchInput) || birdName.includes(searchInput)){
                birds[i].classList.remove('is-hidden');
                break;
            } else {
                birds[i].classList.add('is-hidden');
            }
    }
    }
}

initializeBirds();




