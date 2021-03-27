import pagination from './pagination';
import genresService from './services/genresService';
import modal from './modal';
import noImage from '../images/no-img.jpg';
import noResults from '../images/nores3.jpg';
import header from './header';

import { spinner } from './spinner';
import 'spin.js/spin.css';

import dataProcess from './services/dataProcess';

// 📌 Имортируем как объект content

export default {
    _parentNode: null,
    _movieListNode: null,
    _paginationNode: document.querySelector('#pagDiv'),
    _tplName: 'gallery',
    _currTpl: null,
    loader: document.querySelector('#loading'), //spinner
    page: 1,
    pageCount: 0,

    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async render() {
        try {
            this.loadCurrTemplate();

            spinner.spin(this.loader);
            // const incomData = await this.getIncomingData();

            const incomData = await dataProcess.currFunc(this.page);

            // показываем ошибку при пустом массиве
            if (!incomData.results.length) {
                header.showError();
            }

            this.pageCount = incomData.total_pages || 0;

            this.renderCurrTplMarkup(incomData.results);
            spinner.stop();
        } catch (err) {
            this._incomErrorHandler(err);
        }
        this._linkRefs();
        this._bindEvents();

        modal.linkParent('.backdrop');
        pagination.linkParent('.pagination');
        pagination.render();
        // spinner.spin(this.loader);
    },
    _linkRefs() {
        this._movieListNode = this._parentNode.querySelector('.gallery-list');
    },
    _bindEvents() {
        this._movieListNode?.addEventListener(
            'click',
            this.onMovieListClick.bind(this),
        );
    },

    addGenresStr(movieArr) {
        return movieArr.map(movie => {
            return {
                ...movie,
                genres_str: genresService.idListToString(movie.genre_ids, 2),
            };
        });
    },

    addNoImageIcon(movieArr) {
        return movieArr.map(movie => ({
            ...movie,
            poster_path: movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : noImage,
        }));
    },

    renderCurrTplMarkup(movieArr) {
        if (!movieArr.length) {
            this._parentNode.innerHTML = `<div><img class="bad-request" src="${noResults}" alt="bad request" /></div>`;
            this._paginationNode.style.display = 'none';
            // this._paginationNode.innerHTML = '';
            console.log(this._paginationNode);
            return;
        }
        movieArr = this.addGenresStr(movieArr);
        this._paginationNode.style.display = 'flex';
        //Вариант 1
        // movieArr = movieArr.map(movie => ({ ...movie, imageTpl: noImage }));

        //Вариант 2
        movieArr = this.addNoImageIcon(movieArr);

        this._parentNode.innerHTML = this._currTpl(movieArr);
    },

    loadCurrTemplate() {
        this._currTpl = require('../templates/' +
            this._tplName +
            '.content.hbs');
    },

    _incomErrorHandler(err) {
        console.log(`${err.name}: ${err.message}`);
    },

    onMovieListClick(event) {
        event.preventDefault();

        if (event.target === event.currentTarget) {
            return;
        }
        const movieCard = event.target.closest('.gallery-item');

        const movieId = movieCard.dataset.source;

        modal.render(Number(movieId));
    },

    // добавление кнопки scrollUp
    // trackScroll() {
    //     const scrolled = window.pageYOffset;
    //     const coords = document.documentElement.clientHeight;
    //     if (scrolled > coords) {
    //         this._goTopBtn.classList.add('back_to_top-show');
    //     }
    // },

    // backToTop() {
    //     if (window.pageYOffset > 0) {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: 'smooth',
    //         });
    //     }
    // },
};
