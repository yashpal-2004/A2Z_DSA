import { processedVideos } from '../utils/category.js';
import { formatDuration } from '../utils/format.js';
import { getLeetCodeNumber } from '../data/leetcode-map.js';
import {
    completedMap,
    lcSolvedMap,
    activeCategory,
    searchQuery,
    statusFilter,
    markVideoCompleted,
    toggleLCSolvedState,
} from '../state.js';
import { updateProgress } from './progress.js';

const videoGrid = document.getElementById('video-grid');
const emptyState = document.getElementById('empty-state');

// Toggle watched state for a video
export function toggleVideo(id, isChecked) {
    markVideoCompleted(id, isChecked);

    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.classList.toggle('completed', isChecked);
        const timeContainer = card.querySelector('.completed-time-container');
        if (timeContainer) {
            if (isChecked) {
                const date = new Date();
                timeContainer.textContent = `Checked: ${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                timeContainer.style.display = 'flex';
            } else {
                timeContainer.textContent = '';
                timeContainer.style.display = 'none';
            }
        }
    }

    updateProgress();
}

// Toggle LeetCode solved state for a video card
export function toggleLCSolved(videoId, btn) {
    const nowSolved = toggleLCSolvedState(videoId);
    btn.classList.toggle('lc-solved', nowSolved);
    btn.setAttribute('title', nowSolved ? 'LeetCode solved' : 'Mark LeetCode as solved');
    updateProgress();
}

// Build and mount all video cards
export function renderVideos() {
    videoGrid.innerHTML = '';

    const filtered = processedVideos.filter(v => {
        const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
        const matchesSearch   =
            v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `L${v.index}`.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesStatus = true;
        const isCompleted = !!completedMap[v.id];
        const isLCSolved  = !!lcSolvedMap[v.id];
        const lcObject    = getLeetCodeNumber(v.title);

        if (statusFilter === 'completed') {
            matchesStatus = isCompleted;
        } else if (statusFilter === 'incomplete') {
            matchesStatus = !isCompleted;
        } else if (statusFilter === 'leetcode-solved') {
            matchesStatus = isLCSolved;
        } else if (statusFilter === 'leetcode-unsolved') {
            matchesStatus = !!lcObject && !isLCSolved;
        }

        return matchesCategory && matchesSearch && matchesStatus;
    });

    emptyState.style.display = filtered.length === 0 ? 'block' : 'none';

    filtered.forEach(v => {
        const isCompleted = !!completedMap[v.id];
        const completedVal = completedMap[v.id];
        const lcObject    = getLeetCodeNumber(v.title);
        const isLCSolved  = !!lcSolvedMap[v.id];

        let completedTimeStr = '';
        if (isCompleted && completedVal) {
            const date = new Date(completedVal);
            completedTimeStr = `Checked: ${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        }

        const lcSection = lcObject
            ? `<a href="https://leetcode.com/problems/${lcObject.slug}/" target="_blank" rel="noopener noreferrer" class="leetcode-tag" title="Open on LeetCode">${lcObject.num}</a>
               <button class="lc-check-btn ${isLCSolved ? 'lc-solved' : ''}" data-lc-id="${v.id}" title="${isLCSolved ? 'LeetCode solved' : 'Mark LeetCode as solved'}" aria-label="Toggle LeetCode solved">
                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </button>`
            : '';

        const card = document.createElement('div');
        card.className = `video-card ${isCompleted ? 'completed' : ''}`;
        card.setAttribute('data-id', v.id);

        card.innerHTML = `
            <div class="card-header">
                <div class="video-index">#${v.index}</div>
                <label class="checkbox-container" aria-label="Mark completed">
                    <input type="checkbox" ${isCompleted ? 'checked' : ''} data-toggle-id="${v.id}">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="card-body">
                <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer" class="video-title">
                    ${v.title}
                </a>
                <div class="completed-time-container" style="display: ${isCompleted && completedTimeStr ? 'flex' : 'none'};">
                    ${completedTimeStr}
                </div>
            </div>
            <div class="card-footer">
                <div class="footer-row">
                    <span class="video-duration">${formatDuration(v.duration)}</span>
                    <span class="video-tag" title="${v.category}">${v.category}</span>
                    ${lcSection}
                    <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer" class="link-icon" aria-label="Watch on YouTube">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            </div>
        `;

        videoGrid.appendChild(card);
    });

    // Wire event listeners on freshly rendered elements
    document.querySelectorAll('[data-toggle-id]').forEach(input => {
        input.addEventListener('change', e => {
            toggleVideo(e.target.getAttribute('data-toggle-id'), e.target.checked);
        });
    });

    document.querySelectorAll('[data-lc-id]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            toggleLCSolved(btn.getAttribute('data-lc-id'), btn);
        });
    });
}
