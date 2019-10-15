// Store train info as object? Array? LF is flexible. Not sure about frequency formatting--!
// Array of objects maybe

const trainArr = [];

const sample = {
    name: "The Sample Express",
    dest: "Omaha, NE",
    time: 1245,
    freq: 0100
};

document.getElementById("submitBtn").addEventListener("click", function(){

// Currently set up as if operating purely locally, will need to rejigger for localForage!!

let trainName = document.getElementById("formTrainName").value.trim();
let trainDest = document.getElementById("formDestination").value.trim();
let trainTime = document.getElementById("formTime").value.trim();
let trainFreq = document.getElementById("formFrequency").value.trim();

// Create the th and td elements for each object in the train array && (stored and called ~foragely~)
// Need to refresh on LF, but may not even need to loop? 
})

// Looks as if will need for loop to iterate through? 'th scope="row"' i++ ?? Otherwise ugly hard code?

