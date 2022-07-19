export interface PaymentSlitResponse {
    ID: number;
    Balance: number;
    SplitBreakdown: Array<SplitBreakdown>,
    Error?: string;
}

export interface SplitBreakdown {
    Amount: number,
    SplitEntityId: string
}

export interface SplitInfo {
    SplitType: 'FLAT' | 'RATIO' | 'PERCENTAGE',
    SplitValue: number,
    SplitEntityId: string
}