import { Request, Response } from 'express'
import { PaymentSlitResponse, SplitBreakdown } from '@models';
import helpers from '../utils/helpers'
import { request } from 'http';

const computePaymentSplitting = (req: Request, res: Response) => {
    var response = <PaymentSlitResponse>{}
    var splitBreakdown: Array<SplitBreakdown> = []
    let balance = req.body.Amount, ratioBalance = 0
    let splitAmount = 0, totalSplitAmount = 0 

    try {
        if (!req.body.SplitInfo.length || req.body.SplitInfo.length > 20 ) 
            throw new Error("'SplitInfo' array can contain only a minimum of 1 split entity and a maximum of 20 entities.")

        // Order splitInfo by precedence (FLAT -> PERCENTAGE -> RATIO) 
        // Get the total ratio split value
        let orderedSplitInfo = helpers.orderSplitInfo(req.body.SplitInfo)
        let splitInfo = orderedSplitInfo.orderedSplitInfo
        const totalRatioSplitValue = orderedSplitInfo.totalRatioSplitValue
        
        for (let item of splitInfo) {
            // Calculate the split amount for each entity of the splitInfo
            if (item.SplitType === 'FLAT') {
                splitAmount = item.SplitValue
            }
            else if (item.SplitType === 'PERCENTAGE') {
                splitAmount = (item.SplitValue / 100) * balance
            }
            else if (item.SplitType === 'RATIO') {
                // Set ratioBalance to the current balance if ratio balance is zero
                if (!ratioBalance) ratioBalance = balance
                splitAmount = (item.SplitValue / totalRatioSplitValue) * ratioBalance
            }

            // Ensure each calculated split amount is not greater than transaction amount or less than zero
            if (splitAmount > req.body.Amount || splitAmount < 0) 
                throw new Error('Split amount for each entity cannot be greater than transaction amount or less than zero')
            
            // Add the properties of entity whose split amount is just calculated to the response property (SplitBreakdown)
            splitBreakdown.push({
                SplitEntityId: item.SplitEntityId,
                Amount: splitAmount
            })

            // Substract split amount from the remaining balance
            balance -= splitAmount
            totalSplitAmount += splitAmount
        }
        
        // Ensure total split amount is not greater than transaction amount
        if (totalSplitAmount > req.body.Amount) 
            throw new Error('The sum of all Split amount cannot be greater than transaction amount')

        // Ensure remaining balance is not lesser than zero
        if (balance < 0) {
            throw new Error('Final balance cannot be lesser than zero')
        }

        response = {
            ID: req.body.ID,
            Balance: balance,
            SplitBreakdown: splitBreakdown
        }
        return res.status(200).send(response);
    }
    catch (err: any) {
        response.Error = `Something went wrong: ${err}`
        res.status(400).send(response);
    }
}

export default {
    computePaymentSplitting
}