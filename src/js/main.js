// Application entry point
import { loadProgress } from './state.js';
import { renderTabs } from './ui/tabs.js';
import { renderVideos } from './ui/cards.js';
import { updateProgress } from './ui/progress.js';
import './ui/events.js'; // registers search + reset listeners as a side-effect

async function initApp() {
    // Always render even if Firebase is unreachable (e.g. unauthorized domain)
    try {
        await loadProgress();
    } catch (err) {
        console.warn('initApp: loadProgress failed, continuing with empty state.', err);
    }

    renderTabs();
    renderVideos();
    updateProgress();
}

initApp();
