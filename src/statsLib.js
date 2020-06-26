var zTable = require('./zTable');

class statsLib{
    static sum(inArr){
        let total = 0;
        for (let i = 0; i < inArr.length; i++){
            total += inArr[i];
        }
        return total;
    }

    static geometricSum(inArr){
        if (!inArr.length){
            return 0;
        }
        let total = inArr[0];
        for (let i = 1; i < inArr.length; i++){
            total *= inArr[i];
        }
        return total;
    }

    static mean(inArr){
        return statsLib.sum(inArr) / inArr.length;
    }

    static geometricMean(inArr){
        let totalGeometric = statsLib.geometricSum(inArr);
        return Math.pow(totalGeometric, 1/inArr.length);
    }

    static median(inArr){
        let newArr = [...inArr];
        let arrSizeEven = newArr.length % 2 === 0;
        let midIdx = Math.floor(newArr.length / 2);

        newArr.sort(function(a, b) {return a - b;});
        return arrSizeEven ? (newArr[midIdx] + newArr[midIdx - 1]) / 2 : newArr[midIdx];
    }

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

    static absolutePercentile(percentile, inArr){
        if (!inArr.length){
            return undefined;
        }
        if (percentile <= 1){
            percentile *= 100;
        }
        let newArr = [...inArr];
        newArr.sort(function(a, b) {return a - b;});
        let idxRank = Math.floor((percentile / 100) * newArr.length) - 1;
        return newArr[idxRank];
    }

    static zScore(val, inArr, opt = {
        "population": true,
    }){
        let mean = statsLib.mean(inArr);
        let stdev = statsLib.stdev(inArr, opt);
        return (val - mean) / stdev;
    }

    static percentile(val, inArr, opt = {
        "population": true,
    }){
        let z = statsLib.zScore(val, inArr, opt).toFixed(2);
        //Cant go any deeper...
        z = (z > 3.99) ? 3.99: z;
        z = (z < -3.99) ? -3.99: z;
        let combinedIdx = `${z}`;
        let idx1 =  combinedIdx.substr(0, combinedIdx.length - 1);
        let idx2 = combinedIdx.substr(combinedIdx.length - 1, 1);
        return zTable.zScoreTab[idx1][idx2];
    }
}