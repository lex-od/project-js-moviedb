import API from '../js/services/api';

// 📌 Имортируем как объект modal

export default {
    _parentNode: null,

    _tplName: 'base',
    _currTpl: null,

    _closeModalBtnRef: null,
    _addToWatchedBtnRef: null,
    _addToQueueBtnRef: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async render(movieId) {
        try {
            this.loadCurrTemplate();

            const movieObj = await API.getMovieDetails({ movieId });

            this.renderCurrTplMarkup(movieObj);

            this._linkRefs();
            this._bindEvents();
        } catch (err) {
            this._incomErrorHandler(err);
        }
    },

    _bindEvents() {
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

    loadCurrTemplate() {
        this._currTpl = require('../templates/' + this._tplName + '.modal.hbs');
    },

    renderCurrTplMarkup(movieObj) {
        this._parentNode.innerHTML = this._currTpl(movieObj);

        this._parentNode.classList.remove('modal-is-hidden');
    },

    clearMarkup() {
        this._parentNode.classList.add('modal-is-hidden');

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

    _addToWatched(e) {
        if (this._addToWatchedBtnRef.textContent === 'Remove from watched') {
            this._addToWatchedBtnRef.textContent = 'Add to watched';
        } else {
            this._addToWatchedBtnRef.textContent = 'Remove from watched';
        }
        this._addToWatchedBtnRef.classList.toggle('modal-info-button-active');

        ////
    },

    _addToQueue(e) {
        if (this._addToQueueBtnRef.textContent === 'Remove from queue') {
            this._addToQueueBtnRef.textContent = 'Add to queue';
        } else {
            this._addToQueueBtnRef.textContent = 'Remove from queue';
        }
        this._addToQueueBtnRef.classList.toggle('modal-info-button-active');
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
// addToWatchedBtnRef.addEventListener('click', addToWatched);
// addToQueueBtnRef.addEventListener('click', addToQueue);
