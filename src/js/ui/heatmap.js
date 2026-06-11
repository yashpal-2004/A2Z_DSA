import { Chart } from 'https://esm.sh/frappe-charts';
import { completedMap } from '../state.js';

let chartInstance = null;

export function renderHeatmap() {
    const container = document.getElementById('heatmap-container');
    if (!container) return;

    // Clear container before rendering a new chart
    container.innerHTML = '';

    const dataPoints = {};

    Object.values(completedMap).forEach(timestamp => {
        if (!timestamp) return;
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return;

        // Group by local midnight start to count activities per day
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const epochSeconds = Math.floor(startOfDay.getTime() / 1000).toString();

        dataPoints[epochSeconds] = (dataPoints[epochSeconds] || 0) + 1;
    });

    try {
        chartInstance = new Chart("#heatmap-container", {
            title: "",
            type: 'heatmap',
            data: {
                dataPoints: dataPoints
            },
            countLabel: 'Videos Completed',
            discreteDomains: 0,
            colors: ['#e2e8f0', '#bbf7d0', '#4ade80', '#16a34a', '#15803d'] // Beautiful modern shades of green
        });
    } catch (err) {
        console.error('Failed to render frappe heatmap:', err);
    }
}
