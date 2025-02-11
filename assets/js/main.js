function disableScroll() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
    //Set to scroll to top
}

function hideLogo() {
    const element = document.getElementById('logo-intro');
    if (element) {
        element.style.transition = '1s';
        element.style.left = '-100%';
    }
    enableScroll();
}

window.addEventListener('load', async () => {
    disableScroll();
    setTimeout(hideLogo, 2500);
});

function setActiveTabandScroll(index) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    if (index !== -1) {
        const tab = document.querySelectorAll('.tab')[index];
        tab.classList.add('active');
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    else {
        const tab = document.querySelectorAll('.tab')[0];
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

let triggerPoint = 0;
function isSticky(element) {
    if (window.scrollY > triggerPoint) {
        element.classList.add('is-sticky');
        document.body.style.paddingTop = (element.offsetHeight + 16) + 'px';
    }
    else {
        element.classList.remove('is-sticky');
        document.body.style.paddingTop = 0;
    }
}

let dobounceTimer;
let prevIndex = -1;
window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelector('.tabs');
    triggerPoint = tabs.getBoundingClientRect().top;

    document.addEventListener('scroll', function () {
        isSticky(tabs);

        clearTimeout(dobounceTimer);
        dobounceTimer = setTimeout(() => {
            const sections = document.querySelectorAll('.sub-menu');
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();

                if (rect.top - 100 <= 0 && rect.bottom - 100 >= 0) {
                    if (prevIndex !== index) {
                        setActiveTabandScroll(index);
                        prevIndex = index;
                    }
                }
            });

            if (window.scrollY === 0) {
                setActiveTabandScroll(-1);
                prevIndex = -1;
            }


        }, 100);

    });
});