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
        let savedMovies = this.getMovies(listName);
        // let pushMovies = false; //если false - удалили, если true - добавили
        const movieInList = this.isMovieInList(listName, movie.id);

        // === добавление/удаление элемента
        if (movieInList) {
            savedMovies = savedMovies.filter(
                savedMovie => savedMovie.id !== movie.id,
            );
        } else {
            this.removeFromOtherList(listName, movie.id);
            savedMovies.push(movie);
            // pushMovies = true;
        }
        // ===
        localStorage.setItem(listName, JSON.stringify(savedMovies));
        // return { pushMovies, savedMovies };
    }
    // проверка есть или нет в списке фильм который открыт в модалке
    isMovieInList(listName, id) {
        let savedMovies = this.getMovies(listName);
        return savedMovies.some(movie => movie.id === id);
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

    getTheme() {
        return localStorage.getItem('theme');
    }

    setTheme(themeName) {
        localStorage.setItem('theme', themeName);
    }
}
