// 📌 Имортируем как объект pagination

import paginationTpl from '../templates/pagination.hbs';
import content from './content';

export default {
    _parentNode: null,
    galleryCont: null,
    pageDiv: null,
    page: 1,
    linkParent(selektor) {
        this._parentNode = document.querySelector('.pagination');
    },
    _linkRefs() {
        this.galleryCont = document.querySelector('.gallery-list');
        this.pageDiv = document.querySelector('#pagDiv');
    },
    render() {
        // content.linkParent('.pagination');
        // //  content.render();

        // content.initData();

        this._parentNode.innerHTML = paginationTpl();

        this._linkRefs();
        this.pagMarkup();
        this._bindEvents();

       
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
    },
    decrement() {
        if (this.page > 1) {
            this.page -= 1;
        }
    },

    _bindEvents() {
        //  incPage.addEventListener('click', this.increment);
    },
};
