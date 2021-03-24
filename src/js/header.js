import content from './content';

// 📌 Имортируем как объект header

export default {
    _parentNode: null,
    _tpl: 'home',
    // _inputRef: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        const tpl = require('../templates/' + this._tpl + '.header.hbs');
        this._parentNode.innerHTML = tpl();

        this._linkRefs();
        this._bindEvents();
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
