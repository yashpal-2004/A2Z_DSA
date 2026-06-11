import { getOrCreateUserId, fetchUserProgress, saveUserProgress } from '../../firebase-db.js';

// ---- Identity ----
export const userId = getOrCreateUserId();

// ---- Application state ----
export let completedMap = {};
export let lcSolvedMap  = {};
export let activeCategory = 'All';
export let searchQuery    = '';

export function setActiveCategory(cat) { activeCategory = cat; }
export function setSearchQuery(q)      { searchQuery = q; }

// ---- Firebase persistence ----

// Load progress from Firestore on app start
export async function loadProgress() {
    try {
        const data = await fetchUserProgress(userId);
        if (data) {
            completedMap = data.completed || {};
            lcSolvedMap  = data.lcSolved  || {};
        }
    } catch (err) {
        console.warn('Firebase load failed — running with empty state.', err);
    }
}

// Write current state to Firestore (fire-and-forget — UI stays instant)
function persist() {
    saveUserProgress(userId, completedMap, lcSolvedMap).catch(err => {
        console.error('Firebase save error:', err);
    });
}

// ---- Video completion ----

export function markVideoCompleted(id, isCompleted) {
    if (isCompleted) {
        completedMap[id] = Date.now();
    } else {
        delete completedMap[id];
    }
    persist();
}

// ---- LeetCode solved ----

// Returns the NEW solved state after toggling
export function toggleLCSolvedState(videoId) {
    if (lcSolvedMap[videoId]) {
        delete lcSolvedMap[videoId];
    } else {
        lcSolvedMap[videoId] = true;
    }
    persist();
    return !!lcSolvedMap[videoId];
}

// ---- Reset ----

export function resetProgress() {
    completedMap = {};
    lcSolvedMap  = {};
    persist();
}
