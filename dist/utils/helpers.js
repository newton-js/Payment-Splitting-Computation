"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function orderSplitInfo(splitInfo) {
    let [flatGroup, percentageGroup, ratioGroup] = [[], [], []];
    let totalRatioSplitValue = 0;
    for (let item of splitInfo) {
        if (item.SplitType === 'FLAT')
            flatGroup.push(item);
        else if (item.SplitType === 'PERCENTAGE')
            percentageGroup.push(item);
        else if (item.SplitType === 'RATIO') {
            totalRatioSplitValue += item.SplitValue;
            ratioGroup.push(item);
        }
    }
    return {
        orderedSplitInfo: [...flatGroup, ...percentageGroup, ...ratioGroup],
        totalRatioSplitValue
    };
}
exports.default = {
    orderSplitInfo
};
