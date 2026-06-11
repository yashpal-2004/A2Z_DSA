import { setSearchQuery, resetProgress } from '../state.js';
import { renderVideos } from './cards.js';
import { toggleView } from './tabs.js';
import { updateProgress } from './progress.js';

const searchInput = document.getElementById('search-input');
const btnReset    = document.getElementById('btn-reset-progress');
const btnChecklist = document.getElementById('view-tab-checklist');
const btnHeatmap   = document.getElementById('view-tab-heatmap');

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

if (btnChecklist) {
    btnChecklist.addEventListener('click', () => {
        toggleView('checklist');
    });
}

if (btnHeatmap) {
    btnHeatmap.addEventListener('click', () => {
        toggleView('heatmap');
    });
}
