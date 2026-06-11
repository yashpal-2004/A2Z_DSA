import { processedVideos, getCategoriesSummary } from '../utils/category.js';
import { activeCategory, setActiveCategory } from '../state.js';
import { renderVideos } from './cards.js';
import { renderHeatmap } from './heatmap.js';

const categoryTabs = document.getElementById('category-tabs');

export function renderTabs() {
    const summary = getCategoriesSummary();
    categoryTabs.innerHTML = '';

    Object.keys(summary).forEach(cat => {
        const tab = document.createElement('button');
        tab.className = `tab ${cat === activeCategory ? 'active' : ''}`;
        tab.innerHTML = `${cat} <span class="tab-count">${summary[cat]}</span>`;
        tab.addEventListener('click', () => {
            setActiveCategory(cat);
            renderTabs();
            updateView();
        });
        categoryTabs.appendChild(tab);
    });

    // Activity Heatmap Tab
    const actTab = document.createElement('button');
    actTab.className = `tab ${activeCategory === 'Activity' ? 'active' : ''}`;
    actTab.innerHTML = `Activity Heatmap`;
    actTab.addEventListener('click', () => {
        setActiveCategory('Activity');
        renderTabs();
        updateView();
    });
    categoryTabs.appendChild(actTab);
}

export function updateView() {
    const heatmapSection = document.getElementById('heatmap-section');
    const videoGrid = document.getElementById('video-grid');
    const emptyState = document.getElementById('empty-state');

    if (activeCategory === 'Activity') {
        if (videoGrid) videoGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
        if (heatmapSection) heatmapSection.style.display = 'block';
        renderHeatmap();
    } else {
        if (heatmapSection) heatmapSection.style.display = 'none';
        if (videoGrid) videoGrid.style.display = 'grid';
        renderVideos();
    }
}

