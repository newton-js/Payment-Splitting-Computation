import { SplitInfo } from '@models'

function orderSplitInfo (splitInfo: Array<SplitInfo>) {
    let [flatGroup, percentageGroup, ratioGroup]: Array<Array<SplitInfo>> = [[], [], []]
    let totalRatioSplitValue = 0

    for (let item of splitInfo) {
        if (item.SplitType === 'FLAT') flatGroup.push(item)
        else if (item.SplitType === 'PERCENTAGE') percentageGroup.push(item)
        else if (item.SplitType === 'RATIO') {
            totalRatioSplitValue += item.SplitValue
            ratioGroup.push(item)
        }
    }
    return {
        orderedSplitInfo: [...flatGroup, ...percentageGroup, ...ratioGroup],
        totalRatioSplitValue
    }
}

export default {
    orderSplitInfo
}