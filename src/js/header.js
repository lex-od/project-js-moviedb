import content from './content';
import params from '../json/headerParams.json';

// 📌 Имортируем как объект header

export default {
    _parentNode: null,
    _navPagesRef: null,
    // _inputRef: null,

    _tplName: params.TPL_NAMES.home,
    _currTpl: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    render() {
        try {
            this.loadCurrTemplate();
            this.renderCurrTplMarkup();

            this._linkRefs();
            this._bindEvents();
        } catch (err) {
            this._errorHandler(err);
        }
    },

    loadCurrTemplate(tplName) {
        this._currTpl = require('../templates/' +
            this._tplName +
            '.header.hbs');
    },

    renderCurrTplMarkup() {
        this._parentNode.innerHTML = this._currTpl();
    },

    _errorHandler(err) {
        console.log(`${err.name}: ${err.message}`);
    },

    _linkRefs() {
        this._navPagesRef = this._parentNode.querySelector('#nav-pages');

        // this._inputRef = this._parentNode.querySelector('#input');
    },

    _bindEvents() {
        this._navPagesRef.addEventListener(
            'click',
            this._onNavPagesClick.bind(this),
        );

        // this._inputRef.addEventListener('input', this.inputHandler.bind(this));
    },

    _onNavPagesClick(e) {
        if (e.target.tagName !== 'A') {
            return;
        }

        this._tplName = params.TPL_NAMES[e.target.dataset.tpl];
        this.render();
    },

    inputHandler(event) {
        // Пример вызова отрисовки галереи по событию
        // content.initData = async () => {
        //     return API.searchMovies();
        // };
        // content.render();
    },
};
