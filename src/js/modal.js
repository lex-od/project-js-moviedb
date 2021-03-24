// 📌 Имортируем как объект modal
import API from '../js/services/api';

export default {
    _parentNode: null,
    _currTpl: null,
    _tplName: 'base',
    _closeModalBtnRef: null,
    _addToWatchedBtnRef: null,
    _addToQueueBtnRef: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async show(id) {
        loadCurrTemplate();
        this._linkRefs();
        this._bindEvents();
        this._paretnNode.classList.remove('modal-is-hidden');
        try {
            result = await API.getMovieDetails({ movieId: id });
            this._paretnNode.innerHTML = this._currTpl(result);
        } catch (err) {
            this._incomErrorHandler(err);
        }
    },

    _bindEvents() {
        _closeModalBtnRef.addEventListener('click', closeModal.bind(this));
    },

    loadCurrTemplate() {
        this._currTpl = require('../templates/' + this._tplName + '.modal.hbs');
    },

    _linkRefs() {
        // Образец подключения ссылки на ДОМ-элемент (указать селектор)
        // this._inputRef = this._parentNode.querySelector('#input');
        this._closeModalBtnRef = this._parentNode.querySelector(
            '#close-lightbox',
        );
        this._addToWatchedBtnRef = this._parentNode.querySelector(
            '#js-watched-button',
        );
        this._addToQueueBtnRef = this._parentNode.querySelector(
            '#js-queue-button',
        );
    },

    closeModal() {
        this._parentNode.classList.add('modal-is-hidden');
        this._parentNode.innerHTML = '';
    },

    pressKey(e) {
        if (e.key === 'Escape') return this.closeModal();
    },

    _incomErrorHandler(err) {
        console.log(`${err.name}: ${err.message}`);
    },
};

// addToWatchedBtnRef.addEventListener('click', addToWatched);
// addToQueueBtnRef.addEventListener('click', addToQueue);

// function openModal() {
//     renderModal(+e.target.dataset.id);
//     document.addEventListener('keydown', pressKey);
// closeModalBtnRef.addEventListener('click', closeModal);
// modalRef.addEventListener('click', closeModal);
// }
