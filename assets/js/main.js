function disableScroll() {
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
    /* console.log(index); */
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    if (index !== -1) {
        const tab = document.querySelectorAll('.tab')[index];
        tab.classList.add('active');
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

let prevIndex = -1;
window.addEventListener('DOMContentLoaded', () => {
    let link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);

    link.href = 'assets/images/favicon-16x16.png';


    const tabs = document.querySelector('.tabs');
    document.addEventListener('scroll', function () {
        // Check if the tabs are sticky
        const stickyTop = parseInt(window.getComputedStyle(tabs).top);
        const currentTop = tabs.getBoundingClientRect().top;
        tabs.classList.toggle("is-sticky", currentTop === stickyTop);
        // End of sticky check

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
    });
});