// 📌 Имортируем как объект pagination
// import Pagination from 'tui-pagination';
import API from './services/api';
import paginationTpl from '../templates/pagination.hbs';
import content from './content';
import icons from '../images/icons.svg';

export default {
    _parentNode: null,
    galleryCont: null,
    pageDiv: null,
    page: 1,
    linkParent() {
        this._parentNode = document.querySelector('.pagination');
    },
    _linkRefs() {
        this.galleryCont = document.querySelector('.gallery-list');
        this.pageDiv = document.querySelector('#pagDiv');
    },
    render() {
        this._parentNode.innerHTML = paginationTpl();

        this._linkRefs();
        this.pagMarkup();
        this._bindEvents();
        this.increment();
        this.decrement();
    },

    pagMarkup() {
        this.pageDiv.innerHTML = paginationTpl();
        document
            .querySelector('#dec')
            .addEventListener('click', this.decrement.bind(this));
    },
    increment() {
        this.page += 1;

        this.pagMarkup();
        document
            .querySelector('#inc')
            .addEventListener('click', this.increment.bind(this));
        // console.log(this.page);
    },
    decrement() {
        if (this.page > 1) {
            this.page -= 1;
        }
        // console.log(this.page);
    },

    _bindEvents() {
        //  incPage.addEventListener('click', this.increment);
    },
    renderSvg() {
        document.querySelector('.btnRight').innerHTML = paginationTpl(icons);
    },
};
