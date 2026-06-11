import { setSearchQuery, resetProgress } from '../state.js';
import { updateView } from './tabs.js';
import { updateProgress } from './progress.js';

const searchInput = document.getElementById('search-input');
const btnReset    = document.getElementById('btn-reset-progress');

searchInput.addEventListener('input', e => {
    setSearchQuery(e.target.value);
    updateView();
});

btnReset.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all your progress?')) {
        resetProgress();
        updateView();
        updateProgress();
    }
});
