declare global {
  type SerializedTransaction = {
    /** stringified UUID */
    id: string;
    /** tax, gas, etc... */
    category: string;

    confirmed_by_recipient: boolean;
    confirmed_by_sender: boolean;
    gross_amount: number;
    net_amount: number;
    transaction_fee: number;
    /** UNIX milliseconds timestamp of the moment the transaction was executed. */
    date: number;
    /** description visible by both parties */
    description?: string;
  } & (
    | {
        /** Wallet UID */
        recipient?: string;
      }
    | {
        /** Wallet UID */
        sender?: string;
      }
  );
}
export type module = unknown;
