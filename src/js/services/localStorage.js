// ==== синхронизация ЛС в нескольких окнах ==================
// window.addEventListener('storage', event => {
//     console.log(event);
// });
// ===================================
export default class LocalStorageUtils {
    constructor() {
        this.listNames = {
            watched: 'watched',
            queued: 'queued',
        };
    }

    getMovies(listName) {
        const moviesLocalStorage = localStorage.getItem(listName);
        if (moviesLocalStorage !== null) {
            return JSON.parse(moviesLocalStorage);
        }
        return [];
    }

    toggleMoviesInList(listName, movie) {
        let movies = this.getMovies(listName);
        let pushMovies = false; //если false - удалили, если true - добавили
        let movieIndex = -1;
        movies.forEach((currentMovie, index) => {
            if (currentMovie.id === movie.id) {
                movieIndex = index;
            }
        });

        // === добавление/удаление элемента
        if (movieIndex === -1) {
            this.removeFromOtherList(listName, movie.id);
            movies.push(movie);
            pushMovies = true;
        } else {
            movies.splice(movieIndex, 1);
        }
        // ===
        localStorage.setItem(listName, JSON.stringify(movies));
        return { pushMovies, movies };
    }

    // проверка есть или нет в списке фильм который открыт в модалке
    isMovieInList(listName, id) {
        let movies = this.getMovies(listName);
        return movies.some(movie => movie.id === id);
    }

    removeFromOtherList(listName, id) {
        const otherList =
            listName === this.listNames.watched
                ? this.listNames.queued
                : this.listNames.watched;

        if (this.isMovieInList(otherList, id)) {
            let otherMovies = this.getMovies(otherList);
            otherMovies = otherMovies.filter(
                otherMovie => otherMovie.id !== id,
            );
            localStorage.setItem(otherList, JSON.stringify(otherMovies));
        }
    }
}

// ======================================
// class Movies {
//     constructor() {
//         this.lassNameActive = 'isActive';
//         this.lableAdd = 'Добавить в список';
//         this.labelRemove = 'Удалить из списка';
//     }
//     handleSetLocationStorage(element, id) {
//         const { pushMovies, movies } = localStorageUtils.putMovies(id);

//         if (pushMovies) {
//             element.classList.add(this.lassNameActive);
//             element.innerHTML = this.labelRemove;
//         } else {
//             element.classList.remove(this.lassNameActive);
//             element.innerHTML = this.lableAdd;
//         }
//     }

//     render() {
//         const moviesStore = localStorageUtils.toggleMoviesInList();

//         MOVIES.forEach({id, name}) => {
//         let activeClass = '';
//         let activeText = '';

//         if (moviesStore.indexOf(id) === -1) {
//             // повесить <button class="${activeClass}" onclick="moviesPage.handleSetLocationStorage(this, '${id}')">${activeText}</button> вместо текста кнопки
//             activeText = this.lableAdd;
//         } else {
//             activeClass = ' ' + this.lassNameActive;
//             activeText = this.labelRemove;
//         }

//         // }
//     }
// }
// moviesPage.render();
