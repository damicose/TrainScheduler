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

        const trainName = document.getElementById("formTrainName").value;
        const trainDest = document.getElementById("formDestination").value;
        const trainTime = document.getElementById("formTime").value;
        const trainFreq = document.getElementById("formFrequency").value;
        handleTrain(trainName, trainDest, trainTime, trainFreq);
    })
}

// Actually call it
storeTrain();

function rendertrainArr() {

    const trainTableBody = document.getElementById("tableBody");

    getTrains(function (trainArr) {

        trainTableBody.innerHTML = "";

        for (let i = 0; i < trainArr.length; i++) {

            const newTr = document.createElement("tr");
            const nameTd = document.createElement("td");
            const destTd = document.createElement("td");
            const freqTd = document.createElement("td");
            const nextTd = document.createElement("td");
            const awayTd = document.createElement("td");

            let train = trainArr[i];

            const trainFreq = train.freq;

            const trainInit = train.time;

            const trainInitConvert = moment(trainInit, "HH:mm").subtract(1, "years");

            const diffTime = moment().diff(moment(trainInitConvert), "minutes");

            const timeRemain = diffTime % trainFreq;

            const minUntil = trainFreq - timeRemain;

            const nextTrainObject = moment().add(minUntil, "minutes");

            const nextTrain = moment(nextTrainObject).format("HH:mm");

            nameTd.innerText = train.name;
            destTd.innerText = train.dest;
            freqTd.innerText = train.freq;
            nextTd.innerText = nextTrain;
            awayTd.innerText = minUntil;

            newTr.append(nameTd);
            newTr.append(destTd);
            newTr.append(freqTd);
            newTr.append(nextTd);
            newTr.append(awayTd);

            trainTableBody.append(newTr);
        }
    })
}

rendertrainArr();

const trainArr = [];

const sample = {
    name: "The Sample Express",
    dest: "Omaha, NE",
    time: 1245,
    freq: 0100
};