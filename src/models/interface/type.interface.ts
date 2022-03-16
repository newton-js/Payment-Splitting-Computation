export interface FeeConfigResponse {
    status?: string;
    error?: string;
}

export interface FeeComputationResponse {
    AppliedFeeID: string;
    AppliedFeeValue: number;
    ChargeAmount: number,
    SettlementAmount: number,
    Error?: string;
}

export interface PaymentData {
    ID: number,
    Amount: number,
    Currency: string,
    CurrencyCountry: string,
    Customer: {
        ID: string,
        EmailAddress: string,
        FullName: string,
        BearsFee: boolean
    },
    PaymentEntity: {
        ID: number,
        Issuer: string,
        Brand: string,
        Number: string,
        SixID: number,
        Type: string,
        Country: string
    }
}