import { videosData } from '../data/videos.js';

// Map a video title to its DSA topic category
export function getCategory(title) {
    const t = title.toLowerCase();
    if (t.includes('recursion') || t.includes('re ')) return 'Recursion';
    if (t.includes('hashing') || t.includes('maps')) return 'Hashing';
    if (t.includes('sorting') || t.includes('sort ')) return 'Sorting';
    if (t.includes('linkedlist') || t.includes('ll') || t.includes('dll') || t.includes('linked list')) return 'Linked List';
    if (t.includes('stack') || t.includes('queue') || t.includes('parenthes') || t.includes('postfix') || t.includes('infix')) return 'Stack & Queue';
    if (t.includes('tree') || t.includes('bst') || t.includes('preorder') || t.includes('inorder') || t.includes('postorder')) return 'Trees & BST';
    if (t.includes('graph') || t.includes('bfs') || t.includes('dfs') || t.includes('dijkstra') || t.includes('kruskal') || t.includes('topological') || t.includes('provinces') || t.includes('islands') || t.includes('word ladder') || t.includes('safe states')) return 'Graphs';
    if (t.includes('dp ') || t.includes('dynamic programming') || t.includes('knapsack') || t.includes('lcs') || t.includes('subsequence') || t.includes('stairs') || t.includes('frog jump') || t.includes('house robber') || t.includes("ninja's training") || t.includes('grid') || t.includes('triangle') || t.includes('edit distance') || t.includes('stock') || t.includes('lis') || t.includes('mcm') || t.includes('stick') || t.includes('balloon') || t.includes('rectangle')) return 'Dynamic Programming';
    if (t.includes('sliding window') || t.includes('2 pointers') || t.includes('pointers') || t.includes('nice subarrays') || t.includes('substring')) return 'Sliding Window';
    if (t.includes('greedy') || t.includes('cookies') || t.includes('lemonade') || t.includes('jump game') || t.includes('sjf') || t.includes('sequencing') || t.includes('meeting') || t.includes('platforms') || t.includes('candy')) return 'Greedy';
    if (t.includes('maths') || t.includes('prime') || t.includes('divisors') || t.includes('sieve') || t.includes('exponentiation')) return 'Maths';
    if (t.includes('array') || t.includes('matrix') || t.includes('subarray')) return 'Arrays';
    return 'Basics & STL';
}

// Processed video list with sequential index and category attached
export const processedVideos = videosData.map((v, index) => ({
    ...v,
    index: index + 1,
    category: getCategory(v.title),
}));

// Count of videos per category (plus 'All')
export function getCategoriesSummary() {
    const counts = { All: processedVideos.length };
    processedVideos.forEach(v => {
        counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
}
