

// let birdDataArray =[];
// console.log('hello im here');

// function data_callback(data) {
//     birdDataArray = JSON.parse(data);
//     console.log(birdDataArray);
// }

// function response_callback(response) {
//     if (!response.ok) {
//         console.error(response.status); // error handling
//         return Promise.reject("Error fetching data");
//     }
//     return response.json(); // parse to JSON and return as a Promise
// }

// fetch("./data/nzbird.json").then( data_callback ).then( response_callback );

// function loadAllBirds() {
//     console.log('hello im here');
//     console.log(birdDataArray.length);
//     for (let i = 0; i < birdDataArray.length; i++){
//         let newBird = document.createElement('div');
//         let birdName = document.createElement('h3');
//         let birdImage = document.createElement('img');
//         newBird.setAttribute('class', 'bird-profile');
//         birdName.textContent = birdDataArray[i].primary_name; // Use textContent to set text
//         birdImage.src = birdDataArray[i].photo.source; // Use src to set image source
//         birdImage.alt = birdDataArray[i].primary_name; // Optionally, set the alt attribute for accessibility
//         console.log(birdName.textContent);
//         newBird.appendChild(birdName);
//         newBird.appendChild(birdImage);
//         document.getElementById('main').appendChild(newBird);
//         console.log(i);

//     }
// }
let birdDataArray = [];
console.log('hello im here');

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

async function initializeBirds() {
    birdDataArray = await fetchData();
    for (let i = 0; i < birdDataArray.length; i++) {
        // Rest of your code to display bird profiles
        let newBird = document.createElement('div');
        newBird.setAttribute('class', 'bird-profile');
        
        let primaryName = document.createElement('h3');
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
        newBird.appendChild(birdImage);
        newBird.appendChild(primaryName);
        newBird.appendChild(englishName);
        newBird.appendChild(scienceName);
        newBird.appendChild(order);
        newBird.appendChild(family);
        newBird.appendChild(conservationStatus);
        newBird.appendChild(weight);
        newBird.appendChild(length);
        document.getElementById('main').appendChild(newBird);
    }
}

initializeBirds();///




