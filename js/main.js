'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let durationBeforeFiring = 10;
let rocketIsMoving = false;
let chronosIsRunning = false;
let firingButton = $('#firing-button');
let cancelFiringButton = $('#cancel-firing-button');
let rocket = $('#rocket');
let chrono = $('#billboard span');
let currentTimer;


/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function moveRocket() {
    rocket.attr('src', 'images/rocket3.gif');
    firingButton.removeClass('disabled');
    firingButton.prop('disabled', false);
    firingButton.attr('src', 'images/cancel-button.png');
    rocket.addClass('tookOff');

    rocketIsMoving = true;
    chronosIsRunning = false;
}

function startChrono() {
    chronosIsRunning = true;

    let counter = durationBeforeFiring;
    currentTimer = setInterval(function () {
        counter--;
        chrono.text(counter);

        if (counter <= 0) {
            clearInterval(currentTimer);
            cancelFiringButton.css('display', 'none');

            moveRocket();
        }
    }, 1000);
}


/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

firingButton.click(function () {
    if (chronosIsRunning) {
        return;
    }

    if (rocketIsMoving) {
        rocket.removeClass('tookOff');
        rocket.attr('src', 'images/rocket1.png');
        firingButton.attr('src', 'images/firing-button.png');
        rocketIsMoving = false;
        chronosIsRunning = false;

        chrono.text('');

        return clearInterval(currentTimer);
    }

    firingButton.prop('disabled', true);
    cancelFiringButton.css('display', 'block');
    startChrono();

    rocket.attr('src', 'images/rocket2.gif');
    firingButton.addClass('disabled');
});

cancelFiringButton.click(function () {
    rocket.removeClass('tookOff');
    rocket.attr('src', 'images/rocket1.png');
    firingButton.attr('src', 'images/firing-button.png');
    rocketIsMoving = false;
    chronosIsRunning = false;

    chrono.text('');

    firingButton.removeClass('disabled');
    firingButton.prop('disabled', false);

    cancelFiringButton.css('display', 'none');

    return clearInterval(currentTimer);
});

var mainElement = $("#main");

for (var i = 0; i < 150; i++) {
    let element = $("<div>");
    element.addClass("star");

    let random = Math.floor(Math.random() * 3);
    let stars = ["normal", "big", "tiny"];

    element.addClass(stars[random]);
    element.css({
        left: Math.random() * 90 + "vw",
        top: Math.random() * 90 + "vh"
    });

    mainElement.append(element);
}