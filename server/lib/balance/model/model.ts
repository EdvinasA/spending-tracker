export interface Balance {
    id: string;
    category: string;
    amount: number;
    note?: string | null;
    createdAt: string;
}