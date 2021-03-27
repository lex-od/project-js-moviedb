const Thems = {
    themeSwthc: null,

    linkParent(selector) {
        this.parentNode = document.querySelector(selector);
    },

    linkRefs() {
        this.themeSwthc = document.querySelector('#switch');
    },
    bindEvents() {
        this.themeSwthc.addEventListener('click', this.toggleTheme.bind(this));
    },
    render() {
        this.linkRefs();
        this.bindEvents();
        this.setTheme();
        this.toggleTheme();
        this.Storage();
    },

    setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    },

    toggleTheme() {
        if (localStorage.getItem('theme') === 'theme-light') {
            this.setTheme('theme-dark');
        } else {
            this.setTheme('theme-light');
        }
    },
    // Immediately invoked function to set the theme on initial load
    Storage() {
        if (localStorage.getItem('theme') === 'theme-dark') {
            this.setTheme('theme-dark');
        } else {
            this.setTheme('theme-light');
        }
    },
};

export default Thems;
