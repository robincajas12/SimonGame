let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let nexSequenceWasCalled = false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $('.h1-game').text('level ' + level);
    let randomNumer = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumer];
    gamePattern.push(randomChosenColour);
    playSong(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}



$('.btn').on('click', (e)=>{

    let selectedItem = $(e.target);
    let userChosenColour = $(e.target).attr('id');
    playSong(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animationBtn(selectedItem);
    checkAnswer(userClickedPattern.length -1);
})

function animationBtn(selectedItem){
    selectedItem.toggleClass('click');
    setTimeout(()=>{
        selectedItem.toggleClass('click');
    }, 100);
}

$(document).on('keypress', ()=>{
    if(!nexSequenceWasCalled){
        nextSequence();
        nexSequenceWasCalled = true;
    }
});


function playSong(url)
{
    const audio = new Audio('./sounds/' + url + '.mp3'); 
    audio.play();
}


function checkAnswer(index)
{
    if(userClickedPattern[index] === gamePattern[index])
    {
        console.log(userClickedPattern[index]);
        console.log(gamePattern[index]);
        console.log(userClickedPattern)
        console.log(gamePattern);
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(()=>{
                nextSequence();
            }, 1000)
        }
    }else{
        wrongAnswer();
    }
}

function wrongAnswer()
{
    playSong('wrong');
    $('body').toggleClass('game-over');
    $('.h1-game').text('You lost! Press Any Key to Restart')
    setTimeout(()=>{
        $('body').toggleClass('game-over');
    }, 100)
    nexSequenceWasCalled = false;
    level = 0;
    gamePattern = [];
}
