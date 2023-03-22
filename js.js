document.body.onload = createMedia();

function createMedia(){
    // Creation des élément 
    const newDiv = document.createElement("div");
    newDiv.className = 'player'
    const newFigure = document.createElement("figure");
    const newVideo = document.createElement('video');
    newVideo.className = ("player__video");
    newVideo.className += (' viewer');
    newVideo.setAttribute ('src',"All Star.mp4");
    newVideo.setAttribute('width', '560');
    newVideo.setAttribute('height', '315');
    const newFigcaption = document.createElement("figcaption");
    const newLabel = document.createElement('label')
    newLabel.setAttribute('id', 'timer');
    newLabel.setAttribute('for', 'progress');
    newLabel.setAttribute('role', 'timer');
    const newProgress = document.createElement('input');
    newProgress.id = "progressBar";
    newProgress.setAttribute('type' , 'range')
    newProgress.setAttribute("step" , '1')
    newProgress.setAttribute('max','100');
    newProgress.setAttribute('min','0');
    newProgress.setAttribute('value','0');
    const playerDiv = document.createElement("div");
    playerDiv.className = "player__controls";
    const playerDiv2 = document.createElement("div");
    playerDiv2.className = "progress" ;
    const playerDiv3 = document.createElement("div");
    playerDiv3.className = "progress_filled" ;
    const newButton = document.createElement("button");
    newButton.className = "player__button";
    newButton.className += " toggle";
    newButton.title = "Toggle Play";
    newButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    const Control = document.createElement("div");
    Control.className = "Control" ;
    const newInput = document.createElement("input");
    newInput.className ="player__slider";
    newInput.setAttribute("type","range");
    newInput.setAttribute("name","volume");
    newInput.setAttribute("min","0");
    newInput.setAttribute("max","1");
    newInput.setAttribute("step","0.05");
    newInput.setAttribute("value","1");
    const newInput2 = document.createElement("input");
    newInput2.className ="player__slider";
    newInput2.setAttribute("type","range");
    newInput2.setAttribute("name","playbackRate");
    newInput2.setAttribute("min","0.5");
    newInput2.setAttribute("max","2");
    newInput2.setAttribute("step","0.1");
    newInput2.setAttribute("value","1");
    const buttonSkip = document.createElement("button");
    buttonSkip.setAttribute("data-skip","-10");
    buttonSkip.className = "player__buton";
    buttonSkip.innerHTML = '<i class="fa-solid fa-backward"></i>';
    const buttonSkip2 = document.createElement("button");
    buttonSkip2.setAttribute("data-skip","10");
    buttonSkip2.className = "player__buton";
    buttonSkip2.innerHTML = '<i class="fa-solid fa-forward"></i>';
    var select = document.createElement("select");
    select.id = "speedSelect";
    var option1 = document.createElement("option");
    option1.value = "option1";
    option1.text = "Vitesse";
    option1.value = 1
    var option2 = document.createElement("option");
    option2.value = "option2";
    option2.text = "x1";
    option2.value = 1;
    var option4 = document.createElement("option");
    option4.value = "option4";
    option4.text = "x1.5";
    option4.value = 1.5
    var option3 = document.createElement("option");
    option3.value = "option3";
    option3.text = "x2";
    option3.value = 2
    var option5 = document.createElement("option");
    option5.value = "option5";
    option5.text = "x0.5";
    option5.value = 0.5
    select.appendChild(option1);
    select.appendChild(option5);
    select.appendChild(option2);
    select.appendChild(option4);
    select.appendChild(option3);
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = "videoUpload";
    //Ajout des élément dans le DOM
    newDiv.appendChild(newFigure)
    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!");
    
    // add the text node to the newly created div
    newDiv.appendChild(newFigure);
    newFigure.appendChild(newVideo);
    newFigcaption.appendChild(buttonSkip);
    newFigure.appendChild(newFigcaption);
    newFigcaption.appendChild(newLabel);
    newFigcaption.appendChild(newProgress);
    newFigcaption.appendChild(buttonSkip2);
    newDiv.appendChild(playerDiv);
    playerDiv.appendChild(playerDiv2);
    playerDiv2.appendChild(playerDiv3);
    newDiv.appendChild(Control)
    Control.appendChild(newButton);
    Control.appendChild(newInput);
    newFigcaption.appendChild(select);
    Control.appendChild(inputFile);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
    }
//Lecteur
function Mediaplayer(){
    //Selecteur
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
// const progress = player.querySelector('.progress');
// const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
// Les Fonctions
function togglePlay(){//Pause de video si lancer ou inverse
    //Version Ternaire
    const method = video.paused ? 'play' : 'pause' ;
    video[method]();

    // Version If Else
    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause();
    // }
}
function updateButton(){
    const icon = this.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
    toggle.innerHTML = icon;
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

const speedSelect = document.getElementById('speedSelect');
    console.log(speedSelect);
    speedSelect.addEventListener('change', () => {
    video.playbackRate = speedSelect.value;
});


video.addEventListener('timeupdate', function() {
    const percentagePlayed = (video.currentTime / video.duration) * 100;
    progressBar.value = percentagePlayed;
});


const progressBar = document.querySelector('#progressBar')

progressBar.addEventListener("input" , function(){
    video.currentTime = video.duration * (progressBar.value / 100);
});

progressBar.addEventListener('timeupdate', function(){
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;
});
const inputFile = document.createElement('input');
document.getElementById("videoUpload").onchange = function(event) {
    let file = event.target.files[0];
    let blobURL = URL.createObjectURL(file);
    document.querySelector("video").style.display = 'block';
    document.querySelector("video").src = blobURL;
}

// function progressLoop() {
//     setInterval(function () {
//     const duration = Math.floor(video.duration);
//     const hours = Math.floor(duration / 3600);
//     const minutes = Math.floor((duration % 3600) / 60);
//     const seconds = Math.floor(duration % 60);
//     let durationStr = '';   
//     if (hours > 0) {
//         durationStr += hours.toString().padStart(2, '0') + ':';
//     }
//     durationStr += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

//     // Display the formatted duration
//     console.log(durationStr);
//     progress.value = Math.round((video.currentTime / video.duration) * 100);
//     timer.innerHTML = progress.value + '/' + durationStr
//     let x = Math.round(video.duration) / 100;
//     console.log(x);
//      // or you can display it on your page by setting an HTML element's text content to `durationStr`
//     });
// }



//Event Listener
//Lance ou pause la video lorsque video cliquer


video.addEventListener('click' , togglePlay);
//Change le bouton play pour un bouton pause
video.addEventListener('play' , updateButton);
video.addEventListener('pause' , updateButton);
//Lance ou pause la video lorsque play btn cliquer
toggle.addEventListener('click' , togglePlay);
//faire suivre la durée de la video sur la range
video.addEventListener("timeupdate" , handleProgress)
//Selectionne chancun des bouton avec la valeur data-skip et applique leur valeur au clique
skipButtons.forEach(button => button.addEventListener('click' , skip))
//Selectionne les range et récupére leur valeur quand clique relacher
ranges.forEach(range => range.addEventListener('change' , handleRangeUpdate));
//Selectionne les range et récupére leur valeur quand clique relacher
ranges.forEach(range => range.addEventListener('mousemove' , handleRangeUpdate));
//Afficher le temps total de la video et le tenir a jour
}
Mediaplayer();



