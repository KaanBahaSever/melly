function disableScroll() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
    //Set to scroll to top
    window.scrollTo(0, 0);
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
window.addEventListener('load', async () => {
    disableScroll();
    setTimeout(hideLogo, 2500);

    const el = document.querySelector(".tabs")
    const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle("is-sticky", !e.isIntersecting && el.getBoundingClientRect().bottom < window.innerHeight),
        {
            threshold: [1],
            root: document,
            rootMargin: '-11px 0px 0px 0px',
        },
    );
    observer.observe(el);
});

document.addEventListener('scroll', function () {
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
    }, 50);
});