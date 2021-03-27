import API from '../js/services/api';
import LocalStorageUtils from './services/localStorage';
import noImg from '../images/no-img.jpg';
import dataProcess from './services/dataProcess';
import dpParams from '../json/dataProcParams.json';
import content from './content';

// 📌 Имортируем как объект modal

export default {
    _parentNode: null,
    _tplName: 'base',
    _currTpl: null,
    _modalBackdropRef: null,
    _closeModalBtnRef: null,
    _addToWatchedBtnRef: null,
    _addToQueueBtnRef: null,
    _getRandoMovieBtnRef: null,
    _modalWindowRef: null,
    _trailerBtn: null,
    _trailerKey: null,
    localStorageUtils: new LocalStorageUtils(),
    movieId: null,
    movieObj: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },
    async render(movieId) {
        try {
            this.loadCurrTemplate();
            const movieObj = await API.getMovieDetails({ movieId });
            this.movieId = movieId;
            // ===============================
            movieObj.movieInWatched = this.localStorageUtils.isMovieInList(
                this.localStorageUtils.listNames.watched,
                movieObj.id,
            );
            movieObj.movieInQueue = this.localStorageUtils.isMovieInList(
                this.localStorageUtils.listNames.queued,
                movieObj.id,
            );
            // =============================
            // if(!movieObj){
            //     this.render().bind(this)
            // }
            this.renderCurrTplMarkup(movieObj);
            this.movieObj = { ...movieObj, imgTpl: noImg };
            document.body.classList.add('scroll-hidden');
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
        this._parentNode.innerHTML = this._currTpl({
            ...movieObj,
            imgTpl: noImg,
        });

        this._parentNode.classList.remove('modal-is-hidden');
    },

    async showTrailer() {
        this._trailerKey = await API.getUrl(this.movieId);
        this._parentNode.innerHTML = `<iframe
                    class="iframe"
                    src="https://www.youtube.com/embed/${this._trailerKey}"
                >
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write;
                    encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                </iframe>`;
    },

    clearMarkup() {
        document.body.classList.remove('scroll-hidden');
        this._parentNode.classList.add('modal-is-hidden');
        this._removeEventListeners.bind(this);
        setTimeout(() => {
            this._parentNode.innerHTML = '';
        }, 500);
    },
    _linkRefs() {
        this._modalBackdropRef = document.querySelector('#backdrop');
        this._closeModalBtnRef = this._parentNode.querySelector('#close-modal');
        this._addToWatchedBtnRef = this._parentNode.querySelector(
            '#js-watched-button',
        );
        this._addToQueueBtnRef = this._parentNode.querySelector(
            '#js-queue-button',
        );
        this._trailerBtn = this._parentNode.querySelector('#trailerBtn');
        this._modalWindowRef = this._parentNode.querySelector('#modalWindow');
    },

    _addEventListeners() {
        document.addEventListener('click', this._closeModalOnClick.bind(this));
        document.addEventListener('keydown', this._closeModalOnKey.bind(this));
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
        this._trailerBtn.addEventListener('click', this.showTrailer.bind(this));
    },

    _removeEventListeners() {
        document.removeEventListener(
            'click',
            this._closeModalOnClick.bind(this),
        );
        document.removeEventListener(
            'keydown',
            this._closeModalOnKey.bind(this),
        );
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
        this._trailerBtn.removeEventListener(
            'click',
            this.showTrailer.bind(this),
        );
    },

    _closeModalOnClick(e) {
        if (e.target === this._modalBackdropRef) {
            this.clearMarkup();
        }
    },

    _closeModalOnKey(e) {
        if (e.key === 'Escape') {
            this.clearMarkup();
        }
    },

    _addToWatched() {
        if (
            this._addToWatchedBtnRef.classList.contains(
                'modal-info-button-active',
            )
        ) {
            this._addToWatchedBtnRef.textContent = 'ADD TO WATCHED';
            this._addToWatchedBtnRef.classList.remove(
                'modal-info-button-active',
            );
        } else {
            this._addToWatchedBtnRef.textContent = 'REMOVE FROM WATCHED';
            this._addToWatchedBtnRef.classList.add('modal-info-button-active');
            this._addToQueueBtnRef.classList.remove('modal-info-button-active');
            this._addToQueueBtnRef.textContent = 'ADD TO QUEUE';
        }
        this.localStorageUtils.toggleMoviesInList(
            this.localStorageUtils.listNames.watched,
            this.movieObj,
        );

        this.updateContent();
    },

    _addToQueue() {
        if (
            this._addToQueueBtnRef.classList.contains(
                'modal-info-button-active',
            )
        ) {
            this._addToQueueBtnRef.textContent = 'ADD TO QUEUE';
            this._addToQueueBtnRef.classList.remove('modal-info-button-active');
        } else {
            this._addToQueueBtnRef.textContent = 'REMOVE FROM QUEUE';
            this._addToQueueBtnRef.classList.add('modal-info-button-active');
            this._addToWatchedBtnRef.classList.remove(
                'modal-info-button-active',
            );
            this._addToWatchedBtnRef.textContent = 'ADD TO WATCHED';
        }
        this.localStorageUtils.toggleMoviesInList(
            this.localStorageUtils.listNames.queued,
            this.movieObj,
        );

        this.updateContent();
    },

    updateContent() {
        if (
            dataProcess.currName === dpParams.FUNCTIONS.WATCHED ||
            dataProcess.currName === dpParams.FUNCTIONS.QUEUED
        ) {
            content.render();
        }
    },

    _incomErrorHandler(err) {
        console.log(`${err.name} :${err.message}`);
    },
};

// const getRandoMovieBtnRef = document.querySelector('#get-random-movie');
// getRandomMovie() {
//     let randomId = Math.floor(100000 + Math.random() * 900000);
//     console.log(randomId);
//     this.render(randomId);
// }
// getRandoMovieBtnRef.addEventListener('click', this.getRandomMovie.bind(this));
// console.log(Math.floor(100000 + Math.random() * 900000));
