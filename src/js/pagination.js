// 📌 Имортируем как объект pagination

import paginationTpl from '../templates/pagination.hbs';
import content from './content';

export default {
    parentNode: null,
    galleryCont: null,
    pagDiv: null,
    incrementBtn: null,
    decrementBtn: null,

    page: 1,
    linkParent(selector) {
        this.parentNode = document.querySelector(selector);
    },

    linkRefs() {
        this.incrementBtn = document.querySelector('#inc');
        this.decrementBtn = document.querySelector('#dec');
    },

    bindEvents() {
        this.incrementBtn.addEventListener('click', this.increment.bind(this));
        this.decrementBtn.addEventListener('click', this.decrement.bind(this));
    },

    render() {
        this.pagMarkup();
        this.linkRefs();
        this.bindEvents();
    },

    pagMarkup() {
        this.parentNode.innerHTML = paginationTpl();
    },

    increment() {
        console.log(this.page);
        this.page += 1;
        content.page = this.page;
        content.render();
    },

    decrement() {
        if (this.page <= 1) {
            return;
        }
        this.page -= 1;
        content.page = this.page;
        content.render();
    },
};
