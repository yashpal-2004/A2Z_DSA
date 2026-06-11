import { setSearchQuery, resetProgress, setStatusFilter } from '../state.js';
import { renderVideos } from './cards.js';
import { toggleView } from './tabs.js';
import { updateProgress } from './progress.js';

const searchInput  = document.getElementById('search-input');
const customSelect = document.getElementById('custom-status-filter');
const btnReset     = document.getElementById('btn-reset-progress');
const btnChecklist = document.getElementById('view-tab-checklist');
const btnHeatmap   = document.getElementById('view-tab-heatmap');

if (searchInput) {
    searchInput.addEventListener('input', e => {
        setSearchQuery(e.target.value);
        renderVideos();
    });
}

if (customSelect) {
    const selectTrigger = document.getElementById('custom-select-trigger');
    
    // Toggle dropdown visibility
    selectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('open');
        const isOpen = customSelect.classList.contains('open');
        selectTrigger.setAttribute('aria-expanded', isOpen);
    });

    // Close dropdown on click outside
    document.addEventListener('click', () => {
        customSelect.classList.remove('open');
        selectTrigger.setAttribute('aria-expanded', 'false');
    });

    // Handle option selections
    const options = customSelect.querySelectorAll('.custom-option');
    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            
            options.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            
            selectTrigger.querySelector('span').textContent = opt.textContent;
            customSelect.classList.remove('open');
            selectTrigger.setAttribute('aria-expanded', 'false');
            
            setStatusFilter(opt.getAttribute('data-value'));
            renderVideos();
        });
    });
}

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

// Video Modal Close events
const modalClose = document.getElementById('video-modal-close');
const modalBackdrop = document.getElementById('video-modal-backdrop');

if (modalClose) {
    modalClose.addEventListener('click', () => {
        const iframe = document.getElementById('video-iframe');
        const modal = document.getElementById('video-modal');
        if (modal && iframe) {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
                const exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
                if (exitFS) exitFS.call(document);
            }
            iframe.src = '';
            modal.style.display = 'none';
        }
    });
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', () => {
        const iframe = document.getElementById('video-iframe');
        const modal = document.getElementById('video-modal');
        if (modal && iframe) {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
                const exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
                if (exitFS) exitFS.call(document);
            }
            iframe.src = '';
            modal.style.display = 'none';
        }
    });
}
