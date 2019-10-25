// Crafted with guidance from Section 07-09

function setTrain(newTrain, cb) {
    localforage.setItem("trains", newTrain).then(function () {
        cb();
    });
};

function getTrains(cb) {
    localforage.getItem("trains").then(function (results) {
        cb(results || [])
    });
};

function handleTrain(newName, newDest, newTime, newFreq) {
    getTrains(function (trainArr) {
        trainArr.push({
            name: newName,
            dest: newDest,
            time: newTime,
            freq: newFreq
        });
        setTrain(trainArr, updateTrain);
    });
}

function storeTrain() {
    document.getElementById("submitBtn").addEventListener("click", function () {

        let trainName = document.getElementById("formTrainName").value;
        let trainDest = document.getElementById("formDestination").value;
        let trainTime = document.getElementById("formTime").value;
        let trainFreq = document.getElementById("formFrequency").value;
        handleTrain(trainName, trainDest, trainTime, trainFreq);
    })
}

// Actually call it
storeTrain();

const trainArr = [];

const sample = {
    name: "The Sample Express",
    dest: "Omaha, NE",
    time: 1245,
    freq: 0100
};



// Looks as if will need for loop to iterate through? 'th scope="row"' i++ ?? Otherwise ugly hard code?