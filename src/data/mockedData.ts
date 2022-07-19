export const mockPaymentSplitting = {
    payload1: {
        "ID": 13092,
        "Amount": 4500,
        "Currency": "NGN",
        "CustomerEmail": "anon8@customers.io",
        "SplitInfo": [
            {
                "SplitType": "FLAT",
                "SplitValue": 450,
                "SplitEntityId": "LNPYACC0019"
            },
            {
                "SplitType": "RATIO",
                "SplitValue": 3,
                "SplitEntityId": "LNPYACC0011"
            },
            {
                "SplitType": "PERCENTAGE",
                "SplitValue": 3,
                "SplitEntityId": "LNPYACC0015"
            },
            {
                "SplitType": "RATIO",
                "SplitValue": 2,
                "SplitEntityId": "LNPYACC0016"
            },
            {
                "SplitType": "FLAT",
                "SplitValue": 2450,
                "SplitEntityId": "LNPYACC0029"
            },
            {
                "SplitType": "PERCENTAGE",
                "SplitValue": 10,
                "SplitEntityId": "LNPYACC0215"
            }
        ]
    },
    payload2: {
        "ID": 1308,
        "Amount": 12580,
        "Currency": "NGN",
        "CustomerEmail": "anon8@customers.io",
        "SplitInfo": []
    }
}

