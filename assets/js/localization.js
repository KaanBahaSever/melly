function determineLocale() {
    // All modern browsers support this. Should match what's used by localeCompare() etc.
    const intl = window.Intl;
    if (intl !== undefined) {
        return intl.NumberFormat().resolvedOptions().locale.slice(0, 2);
    }

    // Fall back to ranked choice locales, which are configured in the browser but aren't necessarily
    // what's used in functions like localeCompare().
    const languages = navigator.languages;
    if (languages !== undefined && languages.length > 0) {
        return languages[0];
    }

    // Old standard.
    return navigator.language ?? "en";
}