var zTable = require('./zTable');

/** Class aggregating statistical methods. */
class statsLib{

    /**
     * Evaluates sum of an array.
     * @param {number[]} inArr - The array to sum
     * @return {number} Numerical value representing the sum of all array elements
     */
    static sum(inArr){
        let total = 0;
        for (let i = 0; i < inArr.length; i++){
            total += inArr[i];
        }
        return total;
    }

    /**
     * Evaluates geometric sum of an array.
     * @param {number[]} inArr - The array to sum
     * @return {number} Numerical value representing the geometric sum of all array elements
     */
    static geometricSum(inArr){
        if (inArr.length === 0){
            return 0;
        }
        let total = inArr[0];
        for (let i = 1; i < inArr.length; i++){
            total *= inArr[i];
        }
        return total;
    }

    /**
     * Evaluates statistical mean of an array.
     * @param {number[]} inArr - The array to find mean for.
     * @return {number} Numerical value representing the mean of all array elements
     */
    static mean(inArr){
        return statsLib.sum(inArr) / inArr.length;
    }

    /**
     * Evaluates statistical geometric mean of an array.
     * @param {number[]} inArr - The array to find geometric mean for.
     * @return {number} Numerical value representing the geometric mean of all array elements
     */
    static geometricMean(inArr){
        let totalGeometric = statsLib.geometricSum(inArr);
        return Math.pow(totalGeometric, 1/inArr.length);
    }

    /**
     * Evaluates statistical median of an array.
     * @param {number[]} inArr - The array to find median for.
     * @return {number} Numerical value representing the median of all array elements
     */
    static median(inArr){
        let newArr = [...inArr];
        let arrSizeEven = newArr.length % 2 === 0;
        let midIdx = Math.floor(newArr.length / 2);

        newArr.sort(function(a, b) {return a - b;});
        return arrSizeEven ? (newArr[midIdx] + newArr[midIdx - 1]) / 2 : newArr[midIdx];
    }

    /**
     * Evaluates statistical mode of an array.
     * @param {number[]} inArr - The array to find mode for.
     * @return {number} Numerical value representing the mode of all array elements
     */
    static mode(inArr){
        let retMode = [];
        let modeDict = {};
        let maxCount = 0;
        for (let i = 0; i < inArr.length; i++){
            (inArr[i] in modeDict) ? modeDict[inArr[i]]++ : modeDict[inArr[i]] = 1;
            if (modeDict[inArr[i]] > maxCount){
                retMode = [inArr[i]];
                maxCount = modeDict[inArr[i]];
            } else if (modeDict[inArr[i]] === maxCount){
                retMode.push(inArr[i]);
            }
        }
        return retMode;
    }

    /**
     * Evaluates statistical standard deviation of an array.
     * @param {number[]} inArr - The array to find standard deviation for
     * @param {{population: boolean}} opt - Option denoting if a population or a sample is provided
     * @return {number} Numerical value representing the standard deviation of all array elements
     */
    static stdev(inArr, opt = {
        "population": true,
    }){
        let size = inArr.length;
        if (!opt["population"]){
            size--;
        }
        let mean = statsLib.mean(inArr);
        let total = 0;
        for (let i = 0; i < inArr.length; i++){
            total += Math.pow((inArr[i] - mean), 2);
        }
        return Math.sqrt(total / size);
    }

    /**
     * Finds an array element representing the given percentile.
     * @param {number} percentile - Percentile to find in the given array (0 <= percentile <= 100)
     * @param {number[]} inArr - Array to find the percentile element in
     * @return {!number} A numerical value that is a part of the input array representing the given percentile
     */
    static absolutePercentile(percentile, inArr){
        if (!inArr.length){
            return undefined;
        }
        let newArr = [...inArr];
        newArr.sort(function(a, b) {return a - b;});
        let idxRank = Math.round((percentile / 100) * newArr.length) - 1;
        return newArr[idxRank];
    }

    /**
     * Evaluates the Z score of a given value and a sample or population dataset array.
     * @param {number} val - Value to find Z score for
     * @param {number[]} inArr - The array representing the population or sample
     * @param {{population: boolean}} opt - Option denoting if a population or a sample is provided
     * @return {number} Numerical value representing the Z score the given value in the context of the dataset
     */
    static zScore(val, inArr, opt = {
        "population": true,
    }){
        let mean = statsLib.mean(inArr);
        let stdev = statsLib.stdev(inArr, opt);
        return (val - mean) / stdev;
    }

    /**
     * Evaluates the percentile of a given value and a sample or population dataset array.
     * @param {number} val - Value to find percentile for
     * @param {number[]} inArr - The array representing the population or sample
     * @param {{population: boolean}} opt - Option denoting if a population or a sample is provided
     * @return {number} Numerical value representing the percentile the given value in the context of the dataset
     */
    static percentile(val, inArr, opt = {
        "population": true,
    }){
        let z = statsLib.zScore(val, inArr, opt);
        return statsLib.zScorePercentile(z);
    }

    /**
     * Evaluates the percentile of a given value and a sample or population dataset array.
     * @param {number} val - Value to find percentile for
     * @param {number} mean - The value representing mean of the dataset
     * @param {number} stdev - The value representing standard deviation of the dataset
     * @return {number} Numerical value representing the percentile the given value in the context of the dataset
     */
    static percentileFromMeanAndStdev(val, mean, stdev){
        let diff = val - mean;
        let zScore = (diff/stdev);
        return statsLib.zScorePercentile(zScore);
    }

    /**
     * Evaluates the percentile of a given Z score, maximum is [-3.99, 3.99]. If the value is too large
       or too small, it goes to the nearest valid Z score.
     * @param {number} score - Z score to find percentile for
     * @return {number} Numerical value representing the percentile the given Z score
     */
    static zScorePercentile(score){
        if (!(typeof score == 'number')){
            return undefined;
        }
        score = (score > 3.99) ? 3.99: score;
        score = (score < -3.99) ? -3.99: score;
        let combinedIdx = score.toFixed(2);
        let idx1 =  combinedIdx.substr(0, combinedIdx.length - 1);
        let idx2 = combinedIdx.substr(combinedIdx.length - 1, 1);
        return zTable.zScoreTab[idx1][idx2];
    }

    /**
     * Evaluates statistical correlation of two arrays.
     * @param {number[]} inArr1 - The first array to find correlation for
     * @param {number[]} inArr2 - The second array to find correlation for
     * @return {number} Numerical value representing the correlation of the 2 arrays
     */
    static correlation(inArr1, inArr2){
        if (inArr1.length !== inArr2.length){
            return 0;
        }
    
        const arrSum = (x) => {
            let sum = 0;
            for (let i = 0; i < x.length; i++){
                sum += x[i];
            }
            return sum;
        }
        
        let n = inArr1.length;
        let inArr1Sum = arrSum(inArr1);
        let inArr2Sum = arrSum(inArr2);
        
        
        let inArr1Sq = arrSum(inArr1.map(function(num) {
            return Math.pow(num, 2)
        }));
    
        let inArr2Sq = arrSum(inArr2.map(function(num) {
            return Math.pow(num, 2)
        }));
    
        let xy = 0;
        for (let i = 0; i < n; i++){
            xy += inArr1[i] * inArr2[i];  
        }
        
        let numo = (n*xy) - (inArr1Sum*inArr2Sum);
        let deno0 = (n*inArr1Sq) - Math.pow(inArr1Sum,2);
        let deno1 = (n*inArr2Sq) - Math.pow(inArr2Sum,2);
        let deno = Math.sqrt(deno0*deno1)
        let r = numo/deno;
        return r;
    }
}

module.exports = {
    statsLib: statsLib,
};