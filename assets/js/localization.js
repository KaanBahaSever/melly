function getLanguage() {
    const intl = window.Intl;
    if (intl !== undefined) {
        return intl.NumberFormat().resolvedOptions().locale.slice(0, 2);
    }

    const languages = navigator.languages;
    if (languages !== undefined && languages.length > 0) {
        return languages[0];
    }

    return navigator.language ?? "en";
}

async function loadTranslations(language) {
    try {
        const response = await fetch(`assets/js/locales/${language}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${language} translations`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function initializeTranslations() {
    const urlParams = new URLSearchParams(window.location.search);
    let language = urlParams.get('lang');

    if (!language) {
        language = getLanguage();
    }
    console.log(`Language set to: ${language}`);

    const translations = await loadTranslations(language);
    if (!translations) {
        console.error(`Translations for language ${language} not found, falling back to 'en'`);
        language = 'en';
        translations = await loadTranslations(language);
    }

    const elements = document.querySelectorAll('[data-translator]');
    for (const element of elements) {
        const key = element.getAttribute('data-translator');
        const translation = translations[key];
        if (translation) {
            element.textContent = translation;
        }
    }
}

/* window.addEventListener("load", initializeTranslations); */

async function setLanguage(language) {
    let translations = await loadTranslations(language);
    if (!translations) {
        console.error(`Translations for language ${language} not found, falling back to 'en'`);
        language = 'en';
        translations = await loadTranslations(language);
    }

    const elements = document.querySelectorAll('[data-translator]');
    for (const element of elements) {
        const key = element.getAttribute('data-translator');
        const translation = translations[key];
        if (translation) {
            element.textContent = translation;
        }
    }
    setTimeout(() => {
        hideLogo();
    }, 100);
}


//language class add click event
document.addEventListener('DOMContentLoaded', function () {
    const languageButtons = document.querySelectorAll('.language');
    for (const button of languageButtons) {
        button.addEventListener('click', setLanguage.bind(null, button.getAttribute('data-lang')));
    }
});
