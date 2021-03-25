import API from '../js/services/api';
import LocalStorageUtils from './services/localStorage';
// 📌 Имортируем как объект modal

export default {
    _parentNode: null,

    _tplName: 'base',
    _currTpl: null,

    _closeModalBtnRef: null,
    _addToWatchedBtnRef: null,
    _addToQueueBtnRef: null,

    localStorageUtils: new LocalStorageUtils(),
    movieObj: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async render(movieId) {
        try {
            this.loadCurrTemplate();

            const movieObj = await API.getMovieDetails({ movieId });

            this.renderCurrTplMarkup(movieObj);
            this.movieObj = movieObj;

            this._linkRefs();
            this._addEventListeners();
        } catch (err) {
            this._incomErrorHandler(err);
        }
    },

    loadCurrTemplate() {
        this._currTpl = require('../templates/' + this._tplName + '.modal.hbs');
    },

    renderCurrTplMarkup(movieObj) {
        this._parentNode.innerHTML = this._currTpl(movieObj);

        this._parentNode.classList.remove('modal-is-hidden');
    },

    clearMarkup() {
        this._parentNode.classList.add('modal-is-hidden');
        this._removeEventListeners.bind(this);
        this._parentNode.innerHTML = '';
    },

    _linkRefs() {
        this._closeModalBtnRef = this._parentNode.querySelector('#close-modal');

        this._addToWatchedBtnRef = this._parentNode.querySelector(
            '#js-watched-button',
        );
        this._addToQueueBtnRef = this._parentNode.querySelector(
            '#js-queue-button',
        );
    },

    _addEventListeners() {
        this._closeModalBtnRef.addEventListener(
            'click',
            this.clearMarkup.bind(this),
        );

        this._addToWatchedBtnRef.addEventListener(
            'click',
            this._addToWatched.bind(this),
        );
        this._addToQueueBtnRef.addEventListener(
            'click',
            this._addToQueue.bind(this),
        );
    },

    _removeEventListeners() {
        this._closeModalBtnRef.removeEventListener(
            'click',
            this.clearMarkup.bind(this),
        );
        this._addToWatchedBtnRef.removeEventListener(
            'click',
            this._addToWatched.bind(this),
        );
        this._addToQueueBtnRef.removeEventListener(
            'click',
            this._addToQueue.bind(this),
        );
    },

    _addToWatched() {
        if (this._addToWatchedBtnRef.textContent === 'Remove from watched') {
            this._addToWatchedBtnRef.textContent = 'Add to watched';
        } else {
            this._addToWatchedBtnRef.textContent = 'Remove from watched';
        }
        this._addToWatchedBtnRef.classList.toggle('modal-info-button-active');
        console.log('watched');
        this.localStorageUtils.toggleMoviesInList(
            this.localStorageUtils.listNames.watched,
            this.movieObj,
        );
        ////
    },

    _addToQueue() {
        if (this._addToQueueBtnRef.textContent === 'Remove from queue') {
            this._addToQueueBtnRef.textContent = 'Add to queue';
        } else {
            this._addToQueueBtnRef.textContent = 'Remove from queue';
        }
        this._addToQueueBtnRef.classList.toggle('modal-info-button-active');
        console.log('queue');
        this.localStorageUtils.toggleMoviesInList(
            this.localStorageUtils.listNames.queued,
            this.movieObj,
        );
        /////
    },

    _incomErrorHandler(err) {
        console.log(`${err.name}: ${err.message}`);
    },
};

// document.addEventListener('click', see);
// function see(e) {
//     console.log(e.target);
// }

// function pressKey(e) {
//     if (e.key === 'Escape') return this.closeModal();
// }
