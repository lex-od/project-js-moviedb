import API from './services/api';
import pagination from './pagination';
import genresService from './services/genresService';
// import modal from './modal';

// 📌 Имортируем как объект content

export default {
    _parentNode: null,
    // _movieListNode: null,
    _tplName: 'gallery',
    _currTpl: null,

    page: 1,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async render() {
        await genresService.loadFromApi();

        try {
            this.loadCurrTemplate();

            const incomData = await this.getIncomingData();

            incomData.results = this.addGenresStr(incomData.results);

            this.renderCurrTplMarkup(incomData.results);
        } catch (err) {
            this._incomErrorHandler(err);
        }

        this._bindEvents();

        modal.linkParent('.backdrop');
        pagination.linkParent('#pagination');
        pagination.render();
    },
    _linkRefs() {
        // this._movieListNode = this._parentNode.querySelector('.gallery-list');
    },
    _bindEvents() {
        this._inputRef.addEventListener('click', this.inputHandler.bind(this));
    },

    getIncomingData() {
        return API.getTrending({ page: this.page });
    },

    addGenresStr(movieArr) {
        return movieArr.map(movie => {
            return {
                ...movie,
                genres_str: genresService.idListToString(movie.genre_ids, 2),
            };
        });
    },

    renderCurrTplMarkup(movieArr) {
        this._parentNode.innerHTML = this._currTpl(movieArr);
    },

    loadCurrTemplate() {
        this._currTpl = require('../templates/' +
            this._tplName +
            '.content.hbs');
    },

    _incomErrorHandler(err) {
        console.log(`${err.name}: ${err.message}`);
    },

    inputHandler(event) {
        // Пример вызова отрисовки галереи по событию
        // content.initData = async () => {
        //     return API.searchMovies();
        // };
        // content.render();
    },
};
