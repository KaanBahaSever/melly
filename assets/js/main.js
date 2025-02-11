function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

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
function isSticky(el) {
    if (window.scrollY > triggerPoint) {
        el.classList.add('is-sticky');
        document.body.style.paddingTop = (el.offsetHeight + 16) + 'px';
    }
    else {
        el.classList.remove('is-sticky');
        document.body.style.paddingTop = 0;
    }
}

function getOrientation() {
    if (window.orientation === 0 || window.orientation === 180) {
        return 'portrait';
    }
    else {
        return 'landscape';
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

            if (window.scrollY === 0 && getOrientation() === 'portrait') {
                setActiveTabandScroll(-1);
                prevIndex = -1;
            }


        }, 100);

    });
});

//check orientation change event
window.addEventListener('orientationchange', () => {
    console.log('orientation change to ' + getOrientation());
    setTimeout(() => {
        const tabs = document.querySelector('.tabs-helper');
        const realTabs = document.querySelector('.tabs').getBoundingClientRect().top;
        if (realTabs <= 0) triggerPoint = getOffset(tabs).top - 80; //80 is the height of the sticky tabs
        else triggerPoint = realTabs;

        console.log('orientation change');
        console.log("triggerPoint = " + triggerPoint);
    }, 100);
});