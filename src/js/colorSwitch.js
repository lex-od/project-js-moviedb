const Thems = {
    themeSwthc: null,
    body: null,
    LIGHT: 'light-theme',
    DARK: 'dark-theme',

    linkParent(selector) {
        this.parentNode = document.querySelector(selector);
    },

    linkRefs() {
        this.themeSwthc = document.querySelector('#switch');
        this.body = document.querySelector('body');
    },
    bindEvents() {
        this.themeSwthc.addEventListener('click', this.toggleTheme.bind(this));
        this.themeSwthc.addEventListener('click', this.storage.bind(this));
    },
    render() {
        this.linkRefs();
        this.bindEvents();
        // this.setTheme();
        this.storage();
        this.toggleTheme();
    },

    // setTheme(themeName) {
    //     localStorage.setItem('theme', themeName);
    //     document.documentElement.className = themeName;
    // },
    storage() {
        console.log(localStorage.getItem('theme'));
        if (localStorage.getItem('theme') === this.DARK) {
            this.body.classList.add(this.DARK);
        } else {
            this.body.classList.add(this.LIGHT);
        }
    },
    toggleTheme() {
        this.body.classList.toggle(this.DARK);
        this.body.classList.toggle(this.LIGHT);

        if (localStorage.getItem('theme') === this.LIGHT) {
            localStorage.setItem('theme', this.DARK);
        } else {
            localStorage.setItem('theme', this.LIGHT);
        }
    },
};

export default Thems;
