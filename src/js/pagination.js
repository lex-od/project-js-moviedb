// 📌 Имортируем как объект pagination
import paginate from 'handlebars-paginate';
import * as Handlebars from 'handlebars/runtime';
import paginationTpl from '../templates/pagination.hbs';
import paginationOnePage from '../templates/paginationOnePage.hbs';
import content from './content';

Handlebars.registerHelper('paginate', paginate);
export default {
    parentNode: null,
    paginationRef: null,
    pagDiv: null,
    incrementBtn: null,
    decrementBtn: null,
    reposLink: null,
    page: 1,

    linkParent(selector) {
        this.parentNode = document.querySelector(selector);
    },
    linkRefs() {
        this.incrementBtn = document.querySelector('#inc');
        this.decrementBtn = document.querySelector('#dec');
        this.reposLink = document.querySelector('.pag-btn');
        this.paginationRef = document.querySelector('.pagination');
    },

    bindEvents() {
        this.incrementBtn.addEventListener('click', this.increment.bind(this));
        this.decrementBtn.addEventListener('click', this.decrement.bind(this));
        this.reposLink.addEventListener(
            'click',
            this.onReposeLincClick.bind(this),
        );
    },

    render() {
        // console.log(content.page, content.pageCount);
        this.pagMarkup();
        this.linkRefs();
        this.bindEvents();
    },

    pagMarkup() {
        let page = content.page;
        let pageCount = content.pageCount;
        if (pageCount < 2) {
            this.parentNode.innerHTML = '';
        } else {
            this.parentNode.innerHTML = paginationTpl({
                pagination: {
                    page,
                    pageCount,
                },
            });
        }
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
        if (this.page <= 1) {
            return;
        }
        this.page -= 1;
        content.page = this.page;
        content.render();
    },
    onReposeLincClick(e) {
        e.preventDefault();
        console.log(e);
        // this.page = e.target.dataset;
        // content.page = this.page;

        // content.render();
    },
};
