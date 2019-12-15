
var scores, roundScore, activePlayer, gamePlaying, responsiveVoice, commentNumber, response, voiceList, voice;
var winScore = 100;

voice = ('US English Female');
responsiveVoice.setDefaultVoice(voice);
console.log("voice = " + voice);

voicelist = responsiveVoice.getVoices();
console.log(voicelist);

var select = document.getElementById("voiceSelect"),
        voiceList = responsiveVoice.getVoices();

for (var i = 0; i < voiceList.length; i++)
{
    var option = document.createElement("OPTION"),
            txt = document.createTextNode(voiceList[i].name);
    option.appendChild(txt);
    option.setAttribute("value", voiceList[i]);
    select.insertBefore(option, select.lastChild);
}

console.log("option = " + option.value);
console.log("select = " + select);

init();

document.querySelector('.btn-hold').addEventListener('click', function () {
    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // update the ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check for win
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('#roll-0').style.display = 'none';
        document.querySelector('#roll-1').style.display = 'none';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('#player-' + activePlayer + '-box').style.outline = 0;
    } else {
        document.querySelector('#player-' + activePlayer + '-box').style.outline = 0;
        nextPlayer();
    }
});

document.querySelector('#voiceOnOff').addEventListener('click', voiceOnOff);

function voiceOnOff() {
    console.log("inside voiceOnOff function");
    if (document.getElementById("voiceOnOff").innerHTML === "Voice Off") {
        document.getElementById("voiceOnOff").innerHTML = "Voice On";
        localStorage.setItem("voicePrefs", "voiceIsOff");
    } else if (document.getElementById("voiceOnOff").innerHTML === "Voice On") {
        document.getElementById("voiceOnOff").innerHTML = "Voice Off";
        localStorage.setItem("voicePrefs", "voiceIsOn");
    } else {
        return;
    }
}

function checkLocalStorage() {
    if (typeof (localStorage) !== "undefined") { //checking for browser compatibility with local storage
        console.log("pre localstorage.player0Name = " + localStorage.player0Name);
        console.log("pre localstorage.player1Name = " + localStorage.player1Name);
        if (localStorage.player0Name !== undefined) {
            console.log("post localstorage.player0Name = " + localStorage.player0Name);
            var p0Name = localStorage.getItem('player0Name');
            document.getElementById("p0NameInput").value = p0Name;
            document.getElementById("name-0").innerHTML = p0Name;

            if (localStorage.player1Name !== undefined) {
                console.log("post localstorage.player1Name = " + localStorage.player1Name);
                var p1Name = localStorage.getItem('player1Name');
                document.getElementById("p1NameInput").value = p1Name;
                document.getElementById("name-1").innerHTML = p1Name;
            }
        }
        if (localStorage.p0Red !== undefined) {
            var p0Red = localStorage.getItem('p0Red');
            var p0Green = localStorage.getItem('p0Green');
            var p0Blue = localStorage.getItem('p0Blue');
            document.querySelector('#p0Red').value = p0Red;
            document.querySelector('#p0Red_out').value = p0Red;
            document.querySelector('#p0Green').value = p0Green;
            document.querySelector('#p0Green_out').value = p0Green;
            document.querySelector('#p0Blue').value = p0Blue;
            document.querySelector('#p0Blue_out').value = p0Blue;
            playerColorChange();
        }
        if (localStorage.p1Red !== undefined) {
            var p1Red = localStorage.getItem('p1Red');
            var p1Green = localStorage.getItem('p1Green');
            var p1Blue = localStorage.getItem('p1Blue');
            document.querySelector('#p1Red').value = p1Red;
            document.querySelector('#p1Red_out').value = p1Red;
            document.querySelector('#p1Green').value = p1Green;
            document.querySelector('#p1Green_out').value = p1Green;
            document.querySelector('#p1Blue').value = p1Blue;
            document.querySelector('#p1Blue_out').value = p1Blue;
            playerColorChange();
        }
        if (localStorage.voicePrefs !== undefined) {
            if (localStorage.voicePrefs === "voiceIsOff") {
                document.getElementById("voiceOnOff").innerHTML = "Voice On";
            } 
        }
    } else {
        alert("Some features on this site are incompatible with your browser. For the best experience please update this browser or use a different one.");
    }
}

function setPlayer0Name() {
    var p0Name = document.getElementById("p0NameInput").value;
    console.log(p0Name);
    localStorage.setItem("player0Name", p0Name);
    document.getElementById("name-0").innerHTML = p0Name;
}

function setPlayer1Name() {
    var p1Name = document.getElementById("p1NameInput").value;
    console.log(p1Name);
    localStorage.setItem("player1Name", p1Name);
    document.getElementById("name-1").innerHTML = p1Name;
}

function clearPlayer0Name() {
    localStorage.removeItem("player0Name");
    document.getElementById("p0NameInput").value = "Player 1";
    document.getElementById("name-0").innerHTML = "Player 1";
}

function clearPlayer1Name() {
    localStorage.removeItem("player1Name");
    document.getElementById("p1NameInput").value = "Player 2";
    document.getElementById("name-1").innerHTML = "Player 2";
}

function setP0Color() {
    var p0Red = document.querySelector('#p0Red').value;
    var p0Green = document.querySelector('#p0Green').value;
    var p0Blue = document.querySelector('#p0Blue').value;
    localStorage.setItem("p0Red", p0Red);
    localStorage.setItem("p0Green", p0Green);
    localStorage.setItem("p0Blue", p0Blue);
}

function setP1Color() {
    var p1Red = document.querySelector('#p1Red').value;
    var p1Green = document.querySelector('#p1Green').value;
    var p1Blue = document.querySelector('#p1Blue').value;
    localStorage.setItem("p1Red", p1Red);
    localStorage.setItem("p1Green", p1Green);
    localStorage.setItem("p1Blue", p1Blue);
}

function resetP0Color() {
    localStorage.removeItem("p0Red");
    localStorage.removeItem("p0Green");
    localStorage.removeItem("p0Blue");
    document.getElementById("p0Red").value = 235;
    document.getElementById("p0Green").value = 77;
    document.getElementById("p0Blue").value = 77;
    playerColorChange();
}

function resetP1Color() {
    localStorage.removeItem("p1Red");
    localStorage.removeItem("p1Green");
    localStorage.removeItem("p1Blue");
    document.getElementById("p1Red").value = 44;
    document.getElementById("p1Green").value = 114;
    document.getElementById("p1Blue").value = 158;
    playerColorChange();
}

function diceRoll(diceBounceTimes) {
    console.log('diceRoll Initial diceBounceTimes = ' + diceBounceTimes);

    //create loop
    for (var i = 0; i < diceBounceTimes; i++) {
        setTimeout(function () {
            console.log('Current diceBounceTimes =' + i);

            //random dice number
            diceBounceNumber = Math.floor(Math.random() * 6) + 1;
            console.log('dice = ' + diceBounceNumber);

            //random angle
            var diceAngle = Math.floor(Math.random() * 180) + 1;
            console.log('diceAngle = ' + diceAngle);

            //setTimeout(function() {
            //display dice number

            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'player-' + activePlayer + '-dice-' + diceBounceNumber + '.png';
            document.getElementById('diceID').style.left = (0 + (Math.random() * 60)) + "%";
            document.getElementById('diceID').style.top = (0 + (Math.random() * 160)) + "px";

            //transform dice angle
            document.querySelector('#diceID').style.transform = 'rotate(' + diceAngle + 'deg)';

            //send back through loop
            console.log('diceRoll i = ' + i);
            //time delay between each iteration
        }, 200 * i);
    }
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    if (activePlayer === 1) {
        document.querySelector('#roll-0').style.display = 'none';
        document.querySelector('#roll-1').style.display = 'block';
    } else {
        document.querySelector('#roll-0').style.display = 'block';
        document.querySelector('#roll-1').style.display = 'none';
    }
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('#roll-0').style.display = 'block';
    document.querySelector('#roll-1').style.display = 'none';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#player-0-progressBar').style.height = "0%";
    document.querySelector('#player-1-progressBar').style.height = "0%";
}

document.querySelector('.btn-settings').addEventListener('click', flip);

function flip()
{
    console.log("Settings clicked");
    document.querySelector('.flipWrapper').style.webkitTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.msTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.MozTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.OTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.transform = "rotatey(180deg)";
}

document.querySelector('.btn-play').addEventListener('click', flipBack);

function flipBack()
{
    console.log("Play clicked");
    voiceChoice = document.getElementById('voiceSelect');
    let newVoice = voiceChoice.selectedOptions;
    let output = "";
    for (let i = 0; i < newVoice.length; i++) {
        output = newVoice[i].label;
    }
    voice = (output);
    console.log("voice = " + voice);
    responsiveVoice.setDefaultVoice(voice);
    document.querySelector('.flipWrapper').style.webkitTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.msTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.MozTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.OTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.transform = "rotatey(0deg)";
}

function jsonParse(url, dice, commentNumber, isJSON) {
    dice = dice - 1;
    console.log(url, dice, commentNumber, isJSON);
    var xmlhttp = new XMLHttpRequest();//connection to server
    xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) //is the file done loading and error free?
                    parseDataFunc(xmlhttp.responseText, dice, commentNumber, isJSON);//pass info to the parse function
            };
    xmlhttp.open("GET", url, dice, commentNumber, true);// Send a Request To a Server
    xmlhttp.send();
}

function parseDataFunc(response, dice, commentNumber, isJSON) {
    var responseText = (isJSON) ? JSON.parse(response) : response;// if xmlhttp.responseText/response is JSON then parse it
    //responseText[dice].comment[commentNumber];
    console.log("JSON = " + response, dice, commentNumber, isJSON);
    console.log("Chosen text = " + responseText[dice].comment[commentNumber]);
    responsiveVoice.speak("" + responseText[dice].comment[commentNumber] + "");
    //document.getElementById("voiceString").innerHTML = responseText[dice].comment[commentNumber];
}

//var playerBtnRoll = document.querySelectorAll('.btn-roll');
var playerBtnRoll = document.querySelectorAll('.btn-roll');
for (var i = 0; i, playerBtnRoll.length; i++) {
    playerBtnRoll[i].addEventListener('click', function () {
        var diceBounceTimes = Math.floor(Math.random() * 3) + 3;
        diceRoll(diceBounceTimes);
        setTimeout(function () {
            //random number
            dice = (Math.floor(Math.random() * 6) + 1);
            console.log("final dice roll = " + dice);
            //display result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'player-' + activePlayer + '-dice-' + dice + '.png';
            //random dice location
            document.getElementById('diceID').style.left = (0 + (Math.random() * 60)) + "%";
            document.getElementById('diceID').style.top = (45 + (Math.random() * 160)) + "px";
            // VoiceOnOff check
            if (document.getElementById("voiceOnOff").innerHTML === "Voice Off") {
                // voice comment on dice roll
                var commentNumber = (Math.floor(Math.random() * 6));
                jsonParse("diceComments.json", dice, commentNumber, "true");
            }
            //update the round score IF rolled number was not 1
            if (dice !== 1) {
                //add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;



//                var diceCounter = dice;
//                console.log("diceCounter = " + diceCounter);
//                for (d = 0; d,diceCounter; d++) {
//                    console.log("d = " + d);
//                    setTimeout(function () {
//                        roundScore -= 1;
//                        console.log("roundScore - 1 = " + roundScore);
//                        document.querySelector('#current-' + activePlayer).textContent = roundScore; 
//                    }, 400);
//                }



                var pRed = document.querySelector("#p" + activePlayer + "Red").value;
                var pGreen = document.querySelector("#p" + activePlayer + "Green").value;
                var pBlue = document.querySelector("#p" + activePlayer + "Blue").value;
                document.querySelector('#player-' + activePlayer + '-box').style.outline = roundScore + "px solid rgb(" + pRed + ", " + pGreen + ", " + pBlue + ")";
                var totalPlusCurrent = scores[activePlayer] + roundScore;
                if (totalPlusCurrent >= winScore) {
                    totalPlusCurrent = winScore;
                }
                document.querySelector('#player-' + activePlayer + '-progressBar').style.height = totalPlusCurrent + "%";
                console.log("roundScore before else = " + roundScore);
            } else {
                //next player
                console.log("roundScore after else = " + roundScore);
                roundScore = 0;
                console.log("roundScore after 0 = " + roundScore);
                document.querySelector('#player-' + activePlayer + '-box').style.outline = scores[activePlayer] + "px solid rgb(" + pRed + ", " + pGreen + ", " + pBlue + ")";
                document.querySelector('#player-' + activePlayer + '-progressBar').style.height = scores[activePlayer] + "%";
                nextPlayer();
            }
        }, 200 * diceBounceTimes);
    });
}

function playerColorChange() {
    var p0Red = document.querySelector('#p0Red').value;
    document.querySelector('#p0Red_out').value = p0Red;
    var p0Green = document.querySelector('#p0Green').value;
    document.querySelector('#p0Green_out').value = p0Green;
    var p0Blue = document.querySelector('#p0Blue').value;
    document.querySelector('#p0Blue_out').value = p0Blue;
    var p1Red = document.querySelector('#p1Red').value;
    document.querySelector('#p1Red_out').value = p1Red;
    var p1Green = document.querySelector('#p1Green').value;
    document.querySelector('#p1Green_out').value = p1Green;
    var p1Blue = document.querySelector('#p1Blue').value;
    document.querySelector('#p1Blue_out').value = p1Blue;
    var p0Color = "rgb(" + p0Red + ", " + p0Green + ", " + p0Blue + ")";
    var p1Color = "rgb(" + p1Red + ", " + p1Green + ", " + p1Blue + ")";
    console.log("p0Color = rgb= " + p0Red, p0Green, p0Blue + ", p1Color = rgb= " + p1Red, p1Green, p1Blue);
    document.querySelector('body').style.background = "linear-gradient(90deg, " + p0Color + " 0%, " + p1Color + " 100%)";
    document.querySelector('.middleGround').style.background = "linear-gradient(90deg, " + p1Color + " 0%, " + p0Color + " 100%)";
    document.querySelector('.back .middleGround').style.background = "linear-gradient(90deg, " + p1Color + " 0%, " + p0Color + " 100%)";
    document.querySelector('#player-0-progressBar').style.background = p0Color;
    document.querySelector('#player-0-box').style.background = p0Color;
    document.querySelector('#player-0-box').style.outline = roundScore + "px solid " + p0Color;
    document.querySelector('#name-0').style.color = p0Color;
    document.querySelector('#roll-0').style.color = p0Color;
    document.querySelector('#score-0').style.color = p0Color;
    document.querySelector('#p0currentLabel').style.color = "white";
    document.querySelector('#current-0').style.color = "white";
    document.querySelector('#ion-player-0').style.color = p0Color;
    document.querySelector('#roll-0').style.color = p0Color;
    document.querySelector('#player-1-progressBar').style.background = p1Color;
    document.querySelector('#player-1-box').style.background = p1Color;
    document.querySelector('#player-1-box').style.outline = roundScore + "px solid " + p1Color;
    document.querySelector('#name-1').style.color = p1Color;
    document.querySelector('#roll-1').style.color = p1Color;
    document.querySelector('#score-1').style.color = p1Color;
    document.querySelector('#p1currentLabel').style.color = "white";
    document.querySelector('#current-1').style.color = "white";
    document.querySelector('#ion-player-1').style.color = p1Color;
    document.querySelector('#roll-1').style.color = p1Color;
    document.querySelector('.btn-new').style.color = "white";
    document.querySelector('.ion-ios-plus-outline').style.color = "white";
    document.querySelector('.btn-hold').style.color = "white";
    document.querySelector('.ion-ios-download-outline').style.color = "white";
    document.querySelector('.btn-settings').style.color = "white";
    document.querySelector('.ion-ios-settings-outline').style.color = "white";
    document.querySelector('.btn-play').style.color = "white";
    document.querySelector('.ion-ios-settings-outline').style.color = "white";
    var p0ContrastFactor = Math.round(((parseInt(p0Red) * 299) +
            (parseInt(p0Green) * 587) +
            (parseInt(p0Blue) * 114)) / 1000);
    var p1ContrastFactor = Math.round(((parseInt(p1Red) * 299) +
            (parseInt(p1Green) * 587) +
            (parseInt(p1Blue) * 114)) / 1000);
    console.log("p0 contrastFactor = " + p0ContrastFactor);
    console.log("p1 contrastFactor = " + p1ContrastFactor);
    if (p0ContrastFactor > 180) {
        player0Contrast();
    }
    if (p1ContrastFactor > 180) {
        player1Contrast();
    }
    if ((p0ContrastFactor > 180) && (p1ContrastFactor > 180)) {
        middleGroundContrast();
    }
}

function player0Contrast() {
    document.querySelector('#name-0').style.color = "black";
    document.querySelector('#roll-0').style.color = "black";
    document.querySelector('#score-0').style.color = "black";
    document.querySelector('#p0currentLabel').style.color = "black";
    document.querySelector('#current-0').style.color = "black";
    document.querySelector('#ion-player-0').style.color = "black";
    document.querySelector('#roll-0').style.color = "black";
}

function player1Contrast() {
    document.querySelector('#name-1').style.color = "black";
    document.querySelector('#roll-1').style.color = "black";
    document.querySelector('#score-1').style.color = "black";
    document.querySelector('#p1currentLabel').style.color = "black";
    document.querySelector('#current-1').style.color = "black";
    document.querySelector('#ion-player-1').style.color = "black";
    document.querySelector('#roll-1').style.color = "black";
}

function middleGroundContrast() {
    document.querySelector('.btn-new').style.color = "black";
    document.querySelector('.ion-ios-plus-outline').style.color = "black";
    document.querySelector('.btn-hold').style.color = "black";
    document.querySelector('.ion-ios-download-outline').style.color = "black";
    document.querySelector('.btn-settings').style.color = "black";
    document.querySelector('.ion-ios-settings-outline').style.color = "black";
    document.querySelector('.btn-play').style.color = "black";
    document.querySelector('.ion-ios-settings-outline').style.color = "black";
}

