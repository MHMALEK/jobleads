var isModalOpen = false;
var buttonElement = document.querySelector('[data-clickable-btn-id="modal-1"]');
var modalMainElement = document.querySelector('[data-modal-to-show-id="modal-1"]')
var closeModalElement = document.querySelector('[data-modal-to-close-id="modal-1"]');

function fadeIn(element) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}

function fadeOut(element) {
    var op = 0.1; 
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}


var initModalHandler = function () {
    buttonElement.addEventListener('click', function () {
        isModalOpen = !isModalOpen;
        toggleModal(isModalOpen)
    }, false)

    closeModalElement.addEventListener('click', function () {
        isModalOpen = !isModalOpen;
        toggleModal(isModalOpen)
    }, false)

    // we can use css classes to implement fadeIn and fadeout( opacity's change  + transition timing) animations but I used pure js for this task.
    var toggleModal = function (isModalOpen) {
        if (isModalOpen) {
            fadeIn(buttonElement)
            fadeOut(modalMainElement)
            return
        }
        fadeIn(modalMainElement)
        fadeOut(buttonElement)
    }
}


window.addEventListener('load', initModalHandler, false)