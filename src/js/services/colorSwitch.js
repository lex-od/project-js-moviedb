import LocalStorageUtils from './localStorage.js';

export default {
    themeSwitch: null,
    lsUtils: new LocalStorageUtils(),

    bindEvents() {
        document
            .querySelector('#switch')
            .addEventListener('click', this.onToggleTheme.bind(this));
    },

    init() {
        this.bindEvents();

        this.loadTheme();
    },

    loadTheme() {
        const savedTheme =
            this.lsUtils.getTheme() === 'dark-theme'
                ? 'dark-theme'
                : 'light-theme';

        this.setSiteTheme(savedTheme);
    },

    setSiteTheme(themeName) {
        document.body.classList.remove('dark-theme');
        document.body.classList.remove('light-theme');
        document.body.classList.add(themeName);
    },

    onToggleTheme() {
        const newTheme =
            this.lsUtils.getTheme() === 'dark-theme'
                ? 'light-theme'
                : 'dark-theme';

        this.setSiteTheme(newTheme);
        this.lsUtils.setTheme(newTheme);
    },
};
