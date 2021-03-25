// 📌 Имортируем как объект pagination
import paginate from 'handlebars-paginate';
import * as Handlebars from 'handlebars/runtime';
import paginationTpl from '../templates/pagination.hbs';
import content from './content';

Handlebars.registerHelper('paginate', paginate);
export default {
    parentNode: null,
    paginationRef: null,
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
        this.paginationRef = document.querySelector('.pagination');
    },

    bindEvents() {
        this.incrementBtn.addEventListener('click', this.increment.bind(this));
        this.decrementBtn.addEventListener('click', this.decrement.bind(this));
        // this.repos.classList.add('active-page');
    },

    render() {
        console.log(content.page, content.pageCount);
        this.pagMarkup();
        this.linkRefs();
        this.bindEvents();
    },

    pagMarkup() {
        let page = content.page;
        let pageCount = content.pageCount;
        //  = paginationTpl(curentPage);

        this.parentNode.innerHTML = paginationTpl({
            pagination: {
                page,
                pageCount,
            },
        });
    },

    increment() {
        if (content.page >= content.pageCount) {
            return;
        }
        this.page += 1;
        content.page = this.page;
        content.render();
        // content.page = content.page + 1;
        // content.render;
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
};
