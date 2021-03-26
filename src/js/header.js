import content from './content';
import params from '../json/headerParams.json';
import debounce from 'lodash.debounce';
import API from './services/api';
import LocalStorageUtils from './services/localStorage';

// 📌 Имортируем как объект header

export default {
    _parentNode: null,
    _navPagesRef: null,
    _inputRef: null,
    _libWrapperRef: null,
    _messageHeader: null,
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

    loadCurrTemplate() {
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

        switch (this._tplName) {
            case params.TPL_NAMES.home:
                this._inputRef = this._parentNode.querySelector(
                    '#search-input',
                );
                this._messageHeader = this._parentNode.querySelector(
                    '.message-header',
                );
                break;
            case params.TPL_NAMES.library:
                this._libWrapperRef = this._parentNode.querySelector(
                    '#library-wrapper',
                );
                break;
        }
    },

    _bindEvents() {
        this._navPagesRef.addEventListener(
            'click',
            this._onNavPagesClick.bind(this),
        );

        switch (this._tplName) {
            case params.TPL_NAMES.home:
                this._inputRef.addEventListener(
                    'input',
                    debounce(this.onInput, 500).bind(this),
                );
                break;
            case params.TPL_NAMES.library:
                this._libWrapperRef.addEventListener(
                    'click',
                    this.onLibraryBtnsClick.bind(this),
                );
                break;
        }
    },

    _onNavPagesClick(e) {
        if (e.target.tagName !== 'A') {
            return;
        }

        this._tplName = params.TPL_NAMES[e.target.dataset.tpl];
        this.render();
    },

    onInput(e) {
        // Переопределяем функцию получения данных в объекте content
        if (e.target.value.trim()) {
            // Если что-то введено - запрашиваем поиск
            content.getIncomingData = getIncDataOverride;
        } else {
            // Если пустая строка - отображаем популярные, как изначально
            content.getIncomingData = getIncDataOriginal;
        }
        // убираем сообщение
        this._messageHeader.classList.add('is-hidden');

        content.page = 1;
        content.render();

        // Заменяющая функция (поиск)
        function getIncDataOverride() {
            return API.searchMovies({ query: e.target.value, page: this.page });
        }
        // Первоначальная функция (попуярные)
        function getIncDataOriginal() {
            return API.getTrending({ page: this.page });
        }
    },

    // убираем сообщение
    showError() {
        this._messageHeader.classList.remove('is-hidden');
    },

    onLibraryBtnsClick(e) {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }

        switch (e.target.dataset.action) {
            case 'watched':
                content.getIncomingData = getIncDataOvrWatched;
                break;
            case 'queue':
                content.getIncomingData = getIncDataOvrQueue;
                break;
        }

        content.page = 1;
        content.render();

        function getIncDataOvrWatched() {
            const lsUtils = new LocalStorageUtils();
            const watchedList = lsUtils.getMovies(lsUtils.listNames.watched);

            const indexFrom = (this.page - 1) * 20;
            const results = watchedList.slice(indexFrom, indexFrom + 20);
            const total_pages = Math.ceil(watchedList.length / 20);

            return Promise.resolve({ results, total_pages });
        }
        function getIncDataOvrQueue() {
            const lsUtils = new LocalStorageUtils();
            const watchedList = lsUtils.getMovies(lsUtils.listNames.queued);

            const indexFrom = (this.page - 1) * 20;
            const results = watchedList.slice(indexFrom, indexFrom + 20);
            const total_pages = Math.ceil(watchedList.length / 20);

            return Promise.resolve({ results, total_pages });
        }
    },
};
