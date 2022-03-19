import { PaymentData } from '@models'

function getMatchedConfiguration (transactionData: PaymentData, feeConfigArr: Array<string>): Array<string> {
    const {ID, Type, Issuer, Brand, Number, SixID, Country} = transactionData.PaymentEntity
    const Locale = Country === transactionData.CurrencyCountry ? 'LOCL' : 'INTL'
    const matchedConfiguration = []

    // Loop through the formated configurations and do some checks
    // to get configurations that can be applied to the given transaction
    for (let item of feeConfigArr) {
        const itemToArr = item.split(' ')

        // Get each property of a configuration
        const [, configCurrency, configLocale, configEntity, configEntityProperty] = itemToArr
    
        // Compare the properties of a configuration with the properties of the transaction
        if (
            (configCurrency === transactionData.Currency || configCurrency === '*') 
            && (configLocale === Locale || configLocale === '*') 
            && (configEntity === Type || configEntity === '*') 
            && (configEntityProperty === '*' || configEntityProperty === String(ID) 
                || configEntityProperty === Issuer || configEntityProperty === Brand 
                || configEntityProperty === Number || configEntityProperty === String(SixID)
                )
        ){
            matchedConfiguration.push(itemToArr.join(' '))
        }
    }

    return matchedConfiguration
}

function getSpecificFeeConfig(configs: Array<string>): Array<string> {
    var specificFeeConfig = ['']

    // The possible non specific property we can have is 4
    // currency, locale, entity, and entity property
    let maxNonSpecificProperty = 4 

    // loop through the matched configurations and check for the
    // configuration with less or no non-specific properties
    for (let feeSetting of configs) {
        const nonSpecificProperties = feeSetting.split('*').length - 1
        if (nonSpecificProperties <= maxNonSpecificProperty) {
            maxNonSpecificProperty = nonSpecificProperties
            specificFeeConfig = feeSetting.split(' ')
        }
    }

    return specificFeeConfig
}

function getAppliedFee(type: string, value: string, transactionAmount: number) {
    let appliedFee = 0;

    if (type === 'PERC') {
        appliedFee = (Number(value) * transactionAmount) / 100
    }
    else if (type === 'FLAT_PERC'){
        let splittedValue = value.split(':')
        appliedFee = Number(splittedValue[0]) + ((Number(splittedValue[1]) * transactionAmount) / 100)
    }
    else if (type === 'FLAT') {
        appliedFee = Number(value)
    }

    return appliedFee
}

export default {
    getMatchedConfiguration,
    getSpecificFeeConfig,
    getAppliedFee
}