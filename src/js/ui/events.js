import { setSearchQuery, resetProgress } from '../state.js';
import { renderVideos } from './cards.js';
import { updateProgress } from './progress.js';

const searchInput = document.getElementById('search-input');
const btnReset    = document.getElementById('btn-reset-progress');

searchInput.addEventListener('input', e => {
    setSearchQuery(e.target.value);
    renderVideos();
});

btnReset.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all your progress?')) {
        resetProgress();
        renderVideos();
        updateProgress();
    }
});
