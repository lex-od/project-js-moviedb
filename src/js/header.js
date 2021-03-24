import content from './content';

// 📌 Имортируем как объект header

export default {
    _parentNode: null,
    _inputRef: null,

    _tplNames: {
        home: 'home',
        library: 'library',
    },
    _currTpl: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        try {
            this.loadCurrTemplate(this._tplNames.home);
            this.renderCurrTplMarkup();
        } catch (err) {
            this._errorHandler(err);
        }

        this._linkRefs();
        this._bindEvents();
    },

    loadCurrTemplate(tplName) {
        this._currTpl = require('../templates/' + tplName + '.header.hbs');
    },

    renderCurrTplMarkup() {
        this._parentNode.innerHTML = this._currTpl();
    },

    _errorHandler(err) {
        console.log(`${err.name}: ${err.message}`);
    },

    _linkRefs() {
        // Образец подключения ссылки на ДОМ-элемент (указать селектор)
        // this._inputRef = this._parentNode.querySelector('#input');
    },

    _bindEvents() {
        // this._inputRef.addEventListener('input', this.inputHandler.bind(this));
    },

    inputHandler(event) {
        // Пример вызова отрисовки галереи по событию
        // content.initData = async () => {
        //     return API.searchMovies();
        // };
        // content.render();
    },
};
