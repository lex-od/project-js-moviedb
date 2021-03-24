// 📌 Имортируем как объект pagination

import paginationTpl from '../templates/pagination.hbs';
import after4 from '../templates/after4page.hbs';
import content from './content';

export default {
    // pageNext: null,
    // pageNext2: null,
    // pagePrev: null,
    // pagePrev2: null,
    // pageNext20: null,
    parentNode: null,
    galleryCont: null,
    pagDiv: null,
    incrementBtn: null,
    decrementBtn: null,
    repos: null,
    page: 1,

    linkParent(selector) {
        this.parentNode = document.querySelector(selector);
    },
    linkRefs() {
        this.repos = document.querySelector('.repos-pagination__link');
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
        this.toggleChosen();
        this.increment();
        this.choosePage();
        this.bindEvents();
    },

    pagMarkup() {
        let page = 1;
        console.log(this.page);

        let pageNext20 = this.page + 19;

        if (content.page) {
            this.parentNode.innerHTML = paginationTpl({ pageNext20 });
        }

        if (page > 4) {
            let pageNext = this.page + 1;
            let pageNext2 = this.page + 2;
            let pagePrev = this.page - 1;
            let pagePrev2 = this.page - 2;
            this.parentNode.innerHTML = after4({
                page,
                pageNext,
                pageNext2,
                pagePrev,
                pagePrev2,
                pageNext20,
            });
        }
        content.render();
    },

    increment() {
        // console.log(content);
        this.page += 1;
        content.page = this.page;
        content.render();
    },

    decrement() {
        // console.log(content.page);
        if (this.page <= 1) {
            return;
        }
        this.page -= 1;
        content.page = this.page;
        content.render();
    },
    choosePage() {
        content.page = parseInt(this.page);
        this.pagMarkup();
    },
    toggleChosen() {
        let allPagLinks = document
            .querySelector('.pagination')
            .getElementsByTagName('*');

        allPagLinks.forEach(item => {
            if (parseInt(item.innerHTML) === content.page) {
                item.classList.add('active-page');
            }
        });
    },
};
