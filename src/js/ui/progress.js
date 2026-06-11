import { processedVideos } from '../utils/category.js';
import { completedMap, lcSolvedMap } from '../state.js';
import { formatDurationSummary } from '../utils/format.js';
import { getLeetCodeNumber } from '../data/leetcode-map.js';
import { renderBadges } from './badges.js';

const statTotal         = document.getElementById('stat-total');
const statCompleted     = document.getElementById('stat-completed');
const statRemaining     = document.getElementById('stat-remaining');
const progressPct       = document.getElementById('progress-percentage');
const progressBar       = document.querySelector('.progress-circle .bar');
const progressStatusLbl = document.getElementById('progress-status-lbl');

const statTotalLC       = document.getElementById('stat-total-lc');
const statSolvedLC      = document.getElementById('stat-solved-lc');
const statRemainingLC   = document.getElementById('stat-remaining-lc');

export function updateProgress() {
    const total           = processedVideos.length;
    const completedVideos = processedVideos.filter(v => !!completedMap[v.id]);
    const completed       = completedVideos.length;
    const remaining       = total - completed;

    const totalDuration = processedVideos.reduce((acc, v) => acc + (v.duration || 0), 0);
    const doneDuration  = completedVideos.reduce((acc, v) => acc + (v.duration || 0), 0);
    const leftDuration  = totalDuration - doneDuration;

    // LeetCode stats
    const lcVideos = processedVideos.filter(v => !!getLeetCodeNumber(v.title));
    const totalLC = lcVideos.length;
    const solvedLC = lcVideos.filter(v => !!lcSolvedMap[v.id]).length;
    const remainingLC = totalLC - solvedLC;

    // Percentage is based on time, not video count — two decimal places
    const pct = totalDuration > 0
        ? parseFloat(((doneDuration / totalDuration) * 100).toFixed(2))
        : 0;

    statTotal.textContent     = total;
    statCompleted.textContent = completed;
    statRemaining.textContent = remaining;

    document.getElementById('stat-total-duration').textContent = formatDurationSummary(totalDuration);
    document.getElementById('stat-done-duration').textContent  = formatDurationSummary(doneDuration);
    document.getElementById('stat-left-duration').textContent  = formatDurationSummary(leftDuration);

    if (statTotalLC)     statTotalLC.textContent = totalLC;
    if (statSolvedLC)    statSolvedLC.textContent = solvedLC;
    if (statRemainingLC) statRemainingLC.textContent = remainingLC;

    progressPct.textContent = `${pct}%`;

    // Animate circular SVG arc
    const circumference = 2 * Math.PI * 55;
    progressBar.style.strokeDashoffset = circumference - (pct / 100) * circumference;

    // Motivational label — 11 milestones
    if (pct === 0)        progressStatusLbl.textContent = "Let's get started!";
    else if (pct < 10)    progressStatusLbl.textContent = 'First steps taken. Keep it up!';
    else if (pct < 20)    progressStatusLbl.textContent = 'Warming up nicely!';
    else if (pct < 30)    progressStatusLbl.textContent = 'Great start! You are building momentum.';
    else if (pct < 40)    progressStatusLbl.textContent = 'Almost a third done. Solid work!';
    else if (pct < 50)    progressStatusLbl.textContent = 'Approaching halfway. Stay consistent!';
    else if (pct < 60)    progressStatusLbl.textContent = 'Past halfway! The hard part is behind you.';
    else if (pct < 70)    progressStatusLbl.textContent = 'Over 60% done. You are on fire!';
    else if (pct < 80)    progressStatusLbl.textContent = 'Three-quarters there. Incredible effort!';
    else if (pct < 90)    progressStatusLbl.textContent = 'Almost there. Do not stop now!';
    else if (pct < 100)   progressStatusLbl.textContent = 'Final stretch. Finish what you started!';
    else                  progressStatusLbl.textContent = 'Masterclass complete. Legend status!';

    renderBadges(pct);
}
