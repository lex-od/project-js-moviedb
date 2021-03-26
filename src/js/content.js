import API from './services/api';
import pagination from './pagination';
import genresService from './services/genresService';
import modal from './modal';
import noImage from '../images/no-img.jpg';
import noResults from '../images/nores3.jpg';
import header from './header';
import { Spinner } from 'spin.js';

// 📌 Имортируем как объект content

export default {
    _parentNode: null,
    _movieListNode: null,
    _goTopBtn: null,
    _tplName: 'gallery',
    _currTpl: null,
    loader: null, //spinner
    page: 1,
    pageCount: 0,
    // const opts = {
    //     lines: 20,
    //     length: 40,
    //     width: 4,
    //     radius: 25,
    //     scale: 0.55,
    //     corners: 1,
    //     speed: 1.2,
    //     rotate: 29,
    //     animation: 'spinner-line-shrink',
    //     direction: 1,
    //     color: '$primaryAccentColor',
    //     fadeColor: 'transparent',
    //     top: '49%',
    //     left: '49%',
    //     shadow: '0 0 1px transparent',
    //     zIndex: 2000000000,
    //     className: 'spinner',
    //     position: 'absolute',

    // };
    linkParent(selector) {
        this._parentNode = document.querySelector(selector);
    },

    async render() {
        try {
            this.loadCurrTemplate();

            const incomData = await this.getIncomingData();

            // показываем ошибку при пустом массиве
            if (!incomData.results.length) {
                header.showError();
            }

            this.pageCount = incomData.total_pages || 0;

            this.renderCurrTplMarkup(incomData.results);
        } catch (err) {
            this._incomErrorHandler(err);
        }
        this._linkRefs();
        this._bindEvents();

        modal.linkParent('.backdrop');
        pagination.linkParent('.pagination');
        pagination.render();
    },
    _linkRefs() {
        this._movieListNode = this._parentNode.querySelector('.gallery-list');
        this.loader = this._parentNode.querySelector('#loading'); //spinner
        // this._image = this._parentNode.querySelector('.gallery-picture');

        // добавление кнопки scrollUp
        // this._goTopBtn = document.querySelector('.back_to_top');
    },
    _bindEvents() {
        this._movieListNode?.addEventListener(
            'click',
            this.onMovieListClick.bind(this),
        );

        // добавление кнопки scrollUp
        // window.addEventListener('scroll', this.trackScroll.bind(this));
        // this._goTopBtn.addEventListener('click', this.backToTop.bind(this));
    },

    getIncomingData() {
        return API.getTrending({ page: this.page });
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
            this._parentNode.innerHTML = `<img class="bad-request" src="${noResults}" alt="bad request"  />`;
            return;
        }
        movieArr = this.addGenresStr(movieArr);
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
    trackScroll() {
        const scrolled = window.pageYOffset;
        const coords = document.documentElement.clientHeight;
        if (scrolled > coords) {
            this._goTopBtn.classList.add('back_to_top-show');
        }
    },

    backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    },
    //Spinner

    hideSlider() {
        this.loader.classList.add('is-hidden');
    },

    showSlider() {
        this.loader.classList.remove('is-hidden');
    },
};

// const opts = {
//     lines: 20,
//     length: 40,
//     width: 4,
//     radius: 25,
//     scale: 0.55,
//     corners: 1,
//     speed: 1.2,
//     rotate: 29,
//     animation: 'spinner-line-shrink',
//     direction: 1,
//     color: '$primaryAccentColor',
//     fadeColor: 'transparent',
//     top: '49%',
//     left: '49%',
//     shadow: '0 0 1px transparent',
//     zIndex: 2000000000,
//     className: 'spinner',
//     position: 'absolute',

// };

//  const spinner = new Spinner(opts).spin(this.loader);
