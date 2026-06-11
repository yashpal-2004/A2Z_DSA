// Achievement badge definitions and renderer

const BADGES = [
    {
        id: 'first_step',
        title: 'First Step',
        desc: 'Any progress made',
        threshold: 0.01,
        tier: 'bronze',
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 8 16 12 12 16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>`,
    },
    {
        id: 'dedicated',
        title: 'Dedicated',
        desc: '10% of course time watched',
        threshold: 10,
        tier: 'bronze',
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>`,
    },
    {
        id: 'consistent',
        title: 'Consistent',
        desc: '25% of course time watched',
        threshold: 25,
        tier: 'silver',
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>`,
    },
    {
        id: 'halfway_hero',
        title: 'Halfway Hero',
        desc: '50% of course time watched',
        threshold: 50,
        tier: 'gold',
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
        </svg>`,
    },
    {
        id: 'grinder',
        title: 'Grinder',
        desc: '75% of course time watched',
        threshold: 75,
        tier: 'gold',
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
        </svg>`,
    },
    {
        id: 'algorithm_pro',
        title: 'Algorithm Pro',
        desc: '90% of course time watched',
        threshold: 90,
        tier: 'platinum',
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
            <rect x="9" y="9" width="6" height="6"/>
            <line x1="9" y1="1" x2="9" y2="4"/>
            <line x1="15" y1="1" x2="15" y2="4"/>
            <line x1="9" y1="20" x2="9" y2="23"/>
            <line x1="15" y1="20" x2="15" y2="23"/>
            <line x1="20" y1="9" x2="23" y2="9"/>
            <line x1="20" y1="14" x2="23" y2="14"/>
            <line x1="1" y1="9" x2="4" y2="9"/>
            <line x1="1" y1="14" x2="4" y2="14"/>
        </svg>`,
    },
    {
        id: 'dsa_master',
        title: 'DSA Master',
        desc: 'Full A2Z course completed',
        threshold: 100,
        tier: 'diamond',
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4l3 12h14l3-12-6 5-4-7-4 7-6-5z"/>
            <line x1="5" y1="16" x2="19" y2="16"/>
        </svg>`,
    },
];

const TIER_LABELS = {
    bronze:   'Bronze',
    silver:   'Silver',
    gold:     'Gold',
    platinum: 'Platinum',
    diamond:  'Diamond',
};

export function renderBadges(pct) {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;

    grid.innerHTML = '';

    BADGES.forEach(badge => {
        const earned = pct >= badge.threshold;
        const card = document.createElement('div');
        card.className = `badge-card ${earned ? `earned tier-${badge.tier}` : 'locked'}`;
        card.setAttribute('title', earned ? `Earned — ${badge.desc}` : `Locked — ${badge.desc}`);

        card.innerHTML = `
            <div class="badge-icon-wrap">
                ${badge.icon}
            </div>
            <div class="badge-info">
                <span class="badge-tier-pill tier-${badge.tier}">${TIER_LABELS[badge.tier]}</span>
                <div class="badge-title">${badge.title}</div>
                <div class="badge-desc">${badge.desc}</div>
                ${earned ? '<div class="badge-earned-mark"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Earned</div>' : '<div class="badge-locked-mark">Locked</div>'}
            </div>
        `;

        grid.appendChild(card);
    });
}
