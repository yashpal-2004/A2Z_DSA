// Application entry point
import { loadProgress } from './state.js';
import { renderTabs } from './ui/tabs.js';
import { renderVideos } from './ui/cards.js';
import { updateProgress } from './ui/progress.js';
import './ui/events.js'; // registers search + reset listeners as a side-effect

async function initApp() {
    await loadProgress(); // fetch from Firestore before first render
    renderTabs();
    renderVideos();
    updateProgress();
}

initApp();
