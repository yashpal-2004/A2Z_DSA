import { processedVideos, getCategoriesSummary } from '../utils/category.js';
import { activeCategory, setActiveCategory } from '../state.js';
import { renderVideos } from './cards.js';

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
