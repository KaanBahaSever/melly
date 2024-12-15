function disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = null;
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function hideLogo() {
    const element = document.getElementById('logo-intro');
    if (element) {
        element.style.transition = '1s';
        element.style.left = '-100%';
    }
    enableScroll();
}

function updateTextboxState() {
    const scrollTriggerPoint = 100;
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;

    if (window.scrollY > scrollTriggerPoint) {
        tabs.classList.add('fixed');
    } else {
        tabs.classList.remove('fixed');
    }
}

window.addEventListener('load', async () => {
    disableScroll();

    await sleep(2500);
    hideLogo();
    updateTextboxState();

    window.addEventListener('scroll', updateTextboxState);
});

window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelector('.tabs');
    if (tabs) {
        tabs.classList.remove('fixed');
    }
});