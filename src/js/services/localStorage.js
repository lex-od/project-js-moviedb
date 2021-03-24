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
//         const moviesStore = localStorageUtils.getMovies();

//         // MOVIES.forEach({id, name}) => {
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
