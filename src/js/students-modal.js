import studentsList from '../json/students.json';

export default {
    _parentNode: null,

    _tplName: 'base',
    _currTpl: null,

    _modalBackdropRef: null,
    _closeModalBtnRef: null,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async render() {
        try {
            this.loadCurrTemplate();
            this.renderCurrTplMarkup(studentsList);

            // console.log(studentsList);
            document.body.classList.add('scroll-hidden');
            this._linkRefs();
            this._addEventListeners();
        } catch (err) {
            this._incomErrorHandler(err);
        }
    },

    loadCurrTemplate() {
        this._currTpl = require('../templates/' +
            this._tplName +
            '.students.hbs');
    },

    renderCurrTplMarkup(studentsList) {
        this._parentNode.innerHTML = this._currTpl({ ...studentsList });
        this._parentNode.classList.remove('modal-is-hidden');
        this._parentNode.classList.add('modal-is-open');
    },

    clearMarkup() {
        document.body.classList.remove('scroll-hidden');
        this._parentNode.classList.remove('modal-is-open');
        this._parentNode.classList.add('modal-is-hidden');
        this._removeEventListeners.bind(this);
    },

    _linkRefs() {
        this._modalBackdropRef = document.querySelector('.backdrop');
        this._closeModalBtnRef = this._parentNode.querySelector('#close-modal');
    },

    _addEventListeners() {
        document.addEventListener('click', this._closeModalOnClick.bind(this));
        document.addEventListener('keydown', this._closeModalOnKey.bind(this));
        this._closeModalBtnRef.addEventListener(
            'click',
            this.clearMarkup.bind(this),
        );
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

    _incomErrorHandler(err) {
        console.log(`${err.name}: ${err.message}`);
    },
};
