async function loadTranslations(language) {
    try {
        const response = await fetch(`/path/to/locales/${language}.json`);
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

window.addEventListener("load", initializeTranslations);