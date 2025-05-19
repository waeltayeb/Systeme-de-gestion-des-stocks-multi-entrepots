export interface StockMovement {
    productId: number;
    type: 'ENTRY' | 'EXIT';
    quantity: number;
    date: Date;
}
