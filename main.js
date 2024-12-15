let debounceTimer;

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

document.addEventListener('scroll', function() {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(function() {
        const sections = document.querySelectorAll('.sub-menu');
        const menuItems = document.querySelectorAll('.tab');
        let currentIndex = -1;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            
            if (rect.top - 100 <= 0 && rect.bottom - 100 >= 0) {
                currentIndex = index;
            }
        });

        menuItems.forEach((item, index) => {
            if (index === currentIndex) {
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                    });
                }
            } else {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            }
        });
    }, 100);
});
