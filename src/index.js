import './styles.scss';
import API from './js/services/api';

init();

function init() {
    //
    API._getDiffData('/movie/100', '&language=en-US').then(console.log);
}
