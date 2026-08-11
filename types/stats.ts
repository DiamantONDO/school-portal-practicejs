//GET /api/accounts/profile/stats
export interface StatItem {
    label: string;
    value: string;
}

export interface StatsResponse {
    stats: StatItem[];
}