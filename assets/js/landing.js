(function () {
    'use strict';

    var STORAGE_KEY = 'melly-lang';
    var root = document.documentElement;

    // Turkish lives in the markup (SEO / no-JS) and is harvested below, so only English is kept here.
    var dictionary = {
        tr: { title: document.title },
        en: {
            title: 'Melly Coffee Co.',
            skip: 'Skip to content',
            langLabel: 'Language',
            tagline: 'Good coffee, warmly served.',
            follow: 'Follow Us',
            followLabel: 'Follow us on Instagram: @mellycoffeeco',
            instaText: 'Our latest news and moments are on Instagram.',
            aboutTitle: 'About',
            aboutText: 'At Melly Coffee, every cup is made fresh by skilled baristas from carefully selected beans. We welcome you in a warm, easygoing atmosphere at our Suadiye, Cihangir and Ankara shops — whether you’re starting the day with a great coffee or settling into a long conversation with friends.',
            plateAlt: 'A quiet coffee table by a window, surrounded by plants',
            locationsTitle: 'Locations',
            directions: 'Get directions',
            directionsSuadiye: 'Get directions: Suadiye',
            directionsCihangir: 'Get directions: Cihangir',
            directionsAnkara: 'Get directions: Ankara',
            closes: 'Closes at',
            franchise: 'For franchise inquiries, please contact us via Instagram.',
            rights: 'All rights reserved.'
        }
    };

    var textNodes = document.querySelectorAll('[data-i18n]');
    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    var langButtons = document.querySelectorAll('.lang__btn');

    // data-i18n-attr="attr:key; attr:key"
    function attrPairs(el) {
        return el.getAttribute('data-i18n-attr').split(';').map(function (pair) {
            var parts = pair.split(':');
            return { attr: parts[0].trim(), key: parts[1].trim() };
        });
    }

    textNodes.forEach(function (el) {
        dictionary.tr[el.getAttribute('data-i18n')] = el.textContent;
    });
    attrNodes.forEach(function (el) {
        attrPairs(el).forEach(function (pair) {
            dictionary.tr[pair.key] = el.getAttribute(pair.attr);
        });
    });

    function setLanguage(lang) {
        var strings = dictionary[lang];
        root.lang = lang;
        document.title = strings.title;
        textNodes.forEach(function (el) {
            el.textContent = strings[el.getAttribute('data-i18n')];
        });
        attrNodes.forEach(function (el) {
            attrPairs(el).forEach(function (pair) {
                el.setAttribute(pair.attr, strings[pair.key]);
            });
        });
        langButtons.forEach(function (button) {
            button.setAttribute('aria-pressed', String(button.getAttribute('data-lang') === lang));
        });
    }

    function storedLanguage() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    langButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var lang = button.getAttribute('data-lang');
            setLanguage(lang);
            try {
                localStorage.setItem(STORAGE_KEY, lang);
            } catch (error) {
                /* storage unavailable (private mode): the choice simply is not remembered */
            }
        });
    });

    // Crawlers report an English browser language; they should index the Turkish page that matches the Turkish <head>.
    var isCrawler = /bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent);
    var initial = storedLanguage();
    if (initial !== 'tr' && initial !== 'en') {
        initial = isCrawler || /^tr\b/i.test(navigator.language || 'tr') ? 'tr' : 'en';
    }
    if (initial === 'en') {
        setLanguage('en');
    }

    // A wrong device clock must never show a year earlier than the one in the markup
    var year = document.getElementById('year');
    year.textContent = Math.max(Number(year.textContent), new Date().getFullYear());

    if (!('IntersectionObserver' in window)) {
        return;
    }

    // Scroll reveals. Whatever is already on screen is marked visible BEFORE the .js class switches the hidden
    // state on, so nothing flashes — and if this script never runs, nothing is ever hidden.
    var reveals = document.querySelectorAll('.reveal');
    reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('is-visible');
        }
    });
    root.classList.add('js');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) {
        if (!el.classList.contains('is-visible')) {
            revealObserver.observe(el);
        }
    });
})();
