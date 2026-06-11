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
            renderVideos();
        });
        categoryTabs.appendChild(tab);
    });
}

export function toggleView(view) {
    const checklistControls = document.getElementById('checklist-controls');
    const categoryTabsEl = document.getElementById('category-tabs');
    const videoGrid = document.getElementById('video-grid');
    const emptyState = document.getElementById('empty-state');
    const heatmapSection = document.getElementById('heatmap-section');

    const btnChecklist = document.getElementById('view-tab-checklist');
    const btnHeatmap = document.getElementById('view-tab-heatmap');

    if (view === 'heatmap') {
        if (btnChecklist) btnChecklist.classList.remove('active');
        if (btnHeatmap) btnHeatmap.classList.add('active');

        if (checklistControls) checklistControls.style.display = 'none';
        if (categoryTabsEl) categoryTabsEl.style.display = 'none';
        if (videoGrid) videoGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
        if (heatmapSection) heatmapSection.style.display = 'block';

        renderHeatmap();
    } else {
        if (btnChecklist) btnChecklist.classList.add('active');
        if (btnHeatmap) btnHeatmap.classList.remove('active');

        if (checklistControls) checklistControls.style.display = 'flex';
        if (categoryTabsEl) categoryTabsEl.style.display = 'flex';
        if (videoGrid) videoGrid.style.display = 'grid';
        if (heatmapSection) heatmapSection.style.display = 'none';

        renderVideos();
    }
}


