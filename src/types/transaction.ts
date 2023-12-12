declare global {
  type SerializedTransaction = {
    /** stringified UUID */
    id: string;
    /** tax, gas, etc... */
    category: string;
    /** Wallet UID */
    wallet: string;

    /** UNIX milliseconds timestamp of the moment the transaction was executed. */
    executed_at: number;
    /** UNIX milliseconds timestamp of the moment the transaction was settled. */
    settled_at: number;
    amount: number;
    /** to whom (or from whom) ? */
    counterparty: string;
    /** description visible by both parties */
    description?: string;
    /**
     * custom tags attached to the transaction
     *
     * example: 'disposable' - means the expense was avoidable - was charged within the disposable range of income
     */
    tags: string[];
  };
}
export type module = unknown;
