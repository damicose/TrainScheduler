// Crafted with guidance from Section 07-09

function setTrain(trainTrain, cb) {
    localforage.setItem("trains-data", trainTrain).then(cb);
};

function getTrains(cb) {
    localforage.getItem("trains-data").then(function (result) {
        cb(result || [])
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
// TS thru here, breaking=========================
// Actually call it
storeTrain();

function updateTrain() {

    const trainTableBody = document.getElementById("tableBody");
    const trainTr = document.createElement("tr");

    getTrains(function (trainArr) {
        const nameTd = document.createElement("td");
        const destTd = document.createElement("td");
        const freqTd = document.createElement("td");
        const nextTd = document.createElement("td");
        const awayTd = document.createElement("td");

        let train = trainArr[trainArr.length - 1];

        const uTrainFreq = train.freq;

        const uTrainInit = train.time;

        const uTrainInitConvert = moment(uTrainInit, "HH:mm").subtract(1, "years");

        const uDiffTime = moment().diff(moment(uTrainInitConvert), "minutes");

        const uTimeRemain = uDiffTime % uTrainFreq;

        const uMinUntil = uTrainFreq - uTimeRemain;

        const uNextTrainObject = moment().add(uMinUntil, "minutes");

        const uNextTrain = moment(uNextTrainObject).format("HH:mm");

        nameTd.innerText = train.name;
        destTd.innerText = train.dest;
        freqTd.innerText = train.freq;
        nextTd.innerText = uNextTrain;
        awayTd.innerText = uMinUntil;

        trainTr.append(nameTd);
        trainTr.append(destTd);
        trainTr.append(freqTd);
        trainTr.append(nextTd);
        trainTr.append(awayTd);

        trainTableBody.append(trainTr);
    })
}

function renderTrainArr() {

    const trainTableBody = document.getElementById("tableBody");

    getTrains(function (trainArr) {

        trainTableBody.innerHTML = "";

        for (let i = 0; i < trainArr.length; i++) {

            const trainTr = document.createElement("tr");
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

            trainTr.append(nameTd);
            trainTr.append(destTd);
            trainTr.append(freqTd);
            trainTr.append(nextTd);
            trainTr.append(awayTd);

            trainTableBody.append(trainTr);
        }
    })
}

renderTrainArr();