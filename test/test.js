const {probabilityLib, statsLib, combinationLib, permutationLib} = require('../index.js');
const assert = require('assert');
const { matrixLib } = require('../src/matrix.js');

test = permutationLib.permutation([1,2,3]);

describe('Permutation Counting Test', () => {
    let testDesc = "Simple Permutation Test";
    let simpleTestIdx = 1;
    it(`${testDesc} ${simpleTestIdx}: 7P2 = 42`, () => {
           assert.equal(permutationLib.countPermutation(7,2), 42);
       });
    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}: 7P1 = 7`, () => {
        assert.equal(permutationLib.countPermutation(7,1), 7);
    });
    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}: 7P7 = 7!`, () => {
        assert.equal(permutationLib.countPermutation(7,7), permutationLib.factorial(7));
    });
   });

   
describe('Permutation Test', () => {
    let testDesc = "Permutation Test";
    let len = 6;
    let simpleTestIdx = 1;
    let testData = Array.from(new Set(Array.from({length: len}, () => Math.floor(Math.random() * 100))));
    len = testData.length;
    let testOutput = permutationLib.permutation(testData);

    const arrEqual = (x, y) => {
        for (let i = 0 ; i < x.length; i++){
            if (x[i] !== y[i]){
                return false;
            }
        }
        return true;
    }

    it(`${testDesc} ${simpleTestIdx}: ${len}P${len} = ${testOutput.length}`, () => {
           assert.equal(testOutput.length, permutationLib.factorial(len));
    });

    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}: Asserting difference between ${testOutput.length} outputs`, () => {
        for (let j = 0; j < testOutput.length; j++){
            for (let z = 0; z < testOutput.length; z++){
                if (z === j) {continue;}
                assert(!arrEqual(testOutput[z], testOutput[j]));
                simpleTestIdx++;
            } 
        } 
    });
   });

   describe('kPermutation Test', () => {
    let testDesc = "kPermutation Test";
    let len = 7;
    let simpleTestIdx = 1;
    let testData = Array.from(new Set(Array.from({length: len}, () => Math.floor(Math.random() * 100))));
    len = testData.length;
    let diffLen = len - Math.floor((Math.random()) * len);
    let len2 = Math.max(1, diffLen);
    let testOutput = permutationLib.kPermutations(testData, len2);
    const arrEqual = (x, y) => {
        for (let i = 0 ; i < x.length; i++){
            if (x[i] !== y[i]){
                return false;
            }
        }
        return true;
    }



    it(`${testDesc} ${simpleTestIdx}: ${len}P${len2} = ${testOutput.length}`, () => {
        let t1 = testOutput.length;
        let t2 = permutationLib.countPermutation(len, len2);
        assert.equal(t1, t2);
    });

    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}: Asserting difference between ${testOutput.length} outputs`, () => {
        for (let j = 0; j < testOutput.length; j++){
            for (let z = 0; z < testOutput.length; z++){
                if (z === j) {continue;}
                assert(!arrEqual(testOutput[z], testOutput[j]));
                simpleTestIdx++;
            } 
        } 
    });
   });


   describe('Combination Test', () => {
    let testDesc = "Combination Test";
    let simpleTestIdx = 1;
    let n = 6;
    let r = 2;
    let realAns = permutationLib.factorial(n)/(permutationLib.factorial(n-r)*permutationLib.factorial(r));
    
    it(`${testDesc} ${simpleTestIdx}: ${n}C${r} = ${realAns}`, () => {
           assert.equal(realAns, combinationLib.countCombinations(n, r));
    });
    simpleTestIdx++;

    n = 8;
    r = 6;
    realAns = permutationLib.factorial(n)/(permutationLib.factorial(n-r)*permutationLib.factorial(r));
    
    it(`${testDesc} ${simpleTestIdx}: ${n}C${r} = ${realAns}`, () => {
           assert.equal(realAns, combinationLib.countCombinations(n, r));
    });
    simpleTestIdx++;

    n = 40;
    r = 31;
    realAns = permutationLib.factorial(n)/(permutationLib.factorial(n-r)*permutationLib.factorial(r));
    
    it(`${testDesc} ${simpleTestIdx}: ${n}C${r} = ${realAns}`, () => {
           assert.equal(realAns, combinationLib.countCombinations(n, r));
    });
   });


   describe('kCombination Test', () => {
    let testDesc = "kCombination Test";
    let len = 6;
    let simpleTestIdx = 1;
    let testData = Array.from(new Set(Array.from({length: len}, () => Math.floor(Math.random() * 100))));
    len = testData.length;
    let diffLen = len - Math.floor((Math.random()) * len);
    len2 = Math.max(2, diffLen);
    let testOutput = combinationLib.combinations(testData, len2);

    it(`${testDesc} ${simpleTestIdx}: ${testData.length}C${len2} = ${testOutput.length}`, () => {
           assert.equal(testOutput.length, combinationLib.countCombinations(testData.length, len2));
    });

    const setSameOrMisMatch = (as, bs) => {
        if (as.size !== bs.size){
            return true;
        }

        for (var a of as) if (!bs.has(a)){
            return false;
        }

        return true;
    }

    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}: Asserting difference between ${testOutput.length} outputs`, () => {
        for (let j = 0; j < testOutput.length; j++){
            for (let z = 0; z < testOutput.length; z++){
                if (z === j) {continue;}
                assert(!setSameOrMisMatch(testOutput[z], testOutput[j]));
                simpleTestIdx++;
            } 
        } 
    });
   });

   describe('Power Set Test', () => {
    let testDesc = "Power Set Test";
    let len = 6;
    let simpleTestIdx = 1;
    let testData = Array.from(new Set(Array.from({length: len}, () => Math.floor(Math.random() * 100))));
    let testOutput = combinationLib.powerSet(testData);

    it(`${testDesc} ${simpleTestIdx}: ${testData.length}C${len2} = ${testOutput.length}`, () => {
           assert.equal(testOutput.length, combinationLib.countPowerSet(testData.length));
    });

    const setSameOrMisMatch = (as, bs) => {
        if (as.size !== bs.size){
            return false;
        }
        for (var a of as) if (!bs.has(a)){
            return false;
        }
        return true;
    }

    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}: Asserting difference between ${testOutput.length} outputs`, () => {
        for (let j = 0; j < testOutput.length; j++){
            for (let z = 0; z < testOutput.length; z++){
                if (z === j) {continue;}
                assert(!setSameOrMisMatch(testOutput[z], testOutput[j]));
            } 
        } 
    });
   });

   describe('Statistics Test', () => {
    let testDesc = "Statistics Test";
    let simpleTestIdx = 1;
    let mean = Math.floor(Math.random() * 10);
    let arr = [mean];
    let otherElems = 100;
    let nextElem = 0;
    for (let i = 0; i < otherElems; i++){
        nextElem = Math.floor(Math.random() * 100);
        arr.push(mean + nextElem);
        arr.push(mean - nextElem);
    }
    
    it(`${testDesc} ${simpleTestIdx}: Mean of Array = ${mean}`, () => {
           assert.equal(mean, statsLib.mean(arr));
    });
    simpleTestIdx++;

    let geometricTest = [1,2,3,4,5,6,7,8];
    let ans = Math.pow(permutationLib.factorial(8), 1/geometricTest.length);

    it(`${testDesc} ${simpleTestIdx}: Geometric Mean of Array = ${mean}`, () => {
        assert.equal(ans, statsLib.geometricMean(geometricTest));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Median of Array = ${mean}`, () => {
        assert.equal(mean, statsLib.median(arr));
    });
    simpleTestIdx++;

    let evenSizedArr = [5,1,3,4,5,1];
    it(`${testDesc} ${simpleTestIdx}: Median of Even Sized Array = ${mean}`, () => {
        assert.equal(3.5, statsLib.median(evenSizedArr));
    });
    simpleTestIdx++;

    let modeTest = [1,2,3,4,5,6,7,8,9,9];
    it(`${testDesc} ${simpleTestIdx}: Mode of Array = [9]`, () => {
        assert.equal(9, statsLib.mode(modeTest)[0]);
    });
    simpleTestIdx++;

    let modeTest2 = [1,1,2,3,4,5,6,7,8,9,9];
    it(`${testDesc} ${simpleTestIdx}: Median of Array = [1, 9]`, () => {
        assert.equal(1, statsLib.mode(modeTest2)[0]);
        assert.equal(9, statsLib.mode(modeTest2)[1]);
    });
    simpleTestIdx++;

    let stdevTest = [1,1,2,3,4,5,6,7,8,9,9];
    //2.89
    it(`${testDesc} ${simpleTestIdx}: Population Standard Deviation = 2.89`, () => {
        assert.equal("2.89", statsLib.stdev(stdevTest, opt = {"population": true}).toFixed(2));
    });
    simpleTestIdx++;

    //3.03
    it(`${testDesc} ${simpleTestIdx}: Population Standard Deviation = 3.03`, () => {
        assert.equal("3.03", statsLib.stdev(stdevTest, opt = {"population": false}).toFixed(2));
    });
    simpleTestIdx++;

    let percentileTest = [];
    for (var i = 1; i <= 100; i++) {
        percentileTest.push(i);
    }

    it(`${testDesc} ${simpleTestIdx}: Absolute Percentile Test From 1 - 100`, () => {
        for (var i = 1; i <= 100; i++) {
            assert.equal(i, statsLib.absolutePercentile(i, percentileTest));
        }
    });
    simpleTestIdx++;

    let zScoreTest = [1,1,2,2,3,3,4,4,5,5,6,6];
    let standardDeviation = statsLib.stdev(zScoreTest, opt = {"population": true});
    let standardDeviationSamp = statsLib.stdev(zScoreTest, opt = {"population": false});
    let meanZscoreTest = statsLib.mean(zScoreTest);

    it(`${testDesc} ${simpleTestIdx}: z-Score Test Population`, () => {
        assert.equal(1, statsLib.zScore(meanZscoreTest + standardDeviation, zScoreTest, opt = {"population": true}));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: z-Score Test Sample`, () => {
        assert.equal(-1, statsLib.zScore(meanZscoreTest - standardDeviationSamp, zScoreTest, opt = {"population": false}));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: z-Score Validation`, () => {
        for (let i = -4.1; i < 4.1; i += 0.01){
            assert(statsLib.zScorePercentile(i) <= statsLib.zScorePercentile(i+0.01));
        }
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: 68/96/99.7 Test`, () => {
        assert.equal("0.68", (statsLib.percentileFromMeanAndStdev(3,2,1) - statsLib.percentileFromMeanAndStdev(1,2,1)).toFixed(2));
        assert.equal("0.95", (statsLib.percentileFromMeanAndStdev(4,2,1) - statsLib.percentileFromMeanAndStdev(0,2,1)).toFixed(2));
        assert.equal("0.997", (statsLib.percentileFromMeanAndStdev(5,2,1) - statsLib.percentileFromMeanAndStdev(-1,2,1)).toFixed(3));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Simple Percentile Test`, () => {
        //1.4142135623731, 3 1/1.41 = 0.71
        assert.equal("0.76", statsLib.percentile(4 ,[1,2,3,4,5], opt={"population": true}).toFixed(2));
        //1.5811388300842, 3 1/1.58 = 0.63
        assert.equal("0.74", statsLib.percentile(4 ,[1,2,3,4,5], opt={"population": false}).toFixed(2));
    });

    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Simple Correlation Test`, () => {
        assert.equal(1, statsLib.correlation([1,2,3], [1,2,3]));
        assert.equal("0.51", statsLib.correlation([2,4,5,76,8,1], [-1,-4,7,8,2,6]).toFixed(2));
    });
   });



   describe('Simple Probability Test', () => {
    let testDesc = "Simple Probability Test";
    let x = 0.2;
    let y = 0.4;
    let simpleTestIdx = 1;

    it(`${testDesc} ${simpleTestIdx}: ${x} and ${y} = ${x*y}`, () => {
           assert.equal(x*y, probabilityLib.XandY(x,y));
       });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: ${x} and ~${y} = ${x*(1-y)}`, () => {
        assert.equal(x*(1-y), probabilityLib.XandNotY(x,y));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: ${x} or ${y} = ${1-(1-x)*(1-y)}`, () => {
        assert.equal(1-(1-x)*(1-y), probabilityLib.XorY(x,y));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: ${x} given ${y} = ${x*y/y}`, () => {
        assert.equal(x*y/y, probabilityLib.XgivenY(x,y));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: ${x} given ~${y} = ${x*(1-y)/(1-y)}`, () => {
        assert.equal(x*(1-y)/(1-y), probabilityLib.XgivenNotY(x,y));
    });
    simpleTestIdx++;
    
   });

   describe('Invalid Input Test', () => {
    let testDesc = "Invalid/Trivial Input Test";
    let simpleTestIdx = 1;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(1, permutationLib.countPermutation(0, 1));
        assert.equal(1, permutationLib.countPermutation(1, 0));
        assert.equal(1, permutationLib.countPermutation(1, 2));
        assert.equal(1, combinationLib.countCombinations(1, 1));
        assert.equal(1, combinationLib.countCombinations(1, 0));
        assert.equal(1, combinationLib.countCombinations(0, 1));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(1, permutationLib.kPermutations([1,2,3], 4).length);
     });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(1, combinationLib.combinations([1,2,3], 4).length);
     });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(0, statsLib.geometricSum([]));
     });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(undefined, statsLib.absolutePercentile(40, []));
     });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(undefined, statsLib.zScorePercentile([]));
     });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(false, probabilityLib.valuesOk(-1.5, 0.5));
        assert.equal(false, probabilityLib.valuesOk(1.5, 0.5));
        assert.equal(false, probabilityLib.valuesOk(0, 1.5));
        assert.equal(false, probabilityLib.valuesOk(0, -1.5));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(0, probabilityLib.XandY(-1.5, 0.5));
        assert.equal(0, probabilityLib.XandY(1.5, 0.5));
        assert.equal(0, probabilityLib.XandY(0, 1.5));
        assert.equal(0, probabilityLib.XandY(0, -1.5));
    });
    simpleTestIdx++;

    
    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(0, probabilityLib.XandNotY(-1.5, 0.5));
        assert.equal(0, probabilityLib.XandNotY(1.5, 0.5));
        assert.equal(0, probabilityLib.XandNotY(0, 1.5));
        assert.equal(0, probabilityLib.XandNotY(0, -1.5));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(0, probabilityLib.XorY(-1.5, 0.5));
        assert.equal(0, probabilityLib.XorY(1.5, 0.5));
        assert.equal(0, probabilityLib.XorY(0, 1.5));
        assert.equal(0, probabilityLib.XorY(0, -1.5));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(0, probabilityLib.XgivenY(-1.5, 0.5));
        assert.equal(0, probabilityLib.XgivenY(1.5, 0.5));
        assert.equal(0, probabilityLib.XgivenY(0, 1.5));
        assert.equal(0, probabilityLib.XgivenY(0, -1.5));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(0, probabilityLib.XgivenNotY(-1.5, 0.5));
        assert.equal(0, probabilityLib.XgivenNotY(1.5, 0.5));
        assert.equal(0, probabilityLib.XgivenNotY(0, 1.5));
        assert.equal(0, probabilityLib.XgivenNotY(0, -1.5));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(0, statsLib.correlation([1], [1,2]));
    });
   });

   describe('Matrix Library Test', () => {
    let testDesc = "Matrix Library Test";

    let t = [1,2,3,4];
    let tt = [[1,5], [-1,-7]];
    let ttAppox = [[1.1,5.1], [-1.1,-7.1]];

    let ttt = [[1,5,22], [-1,-7, 8], [10,-6, 1]];
    let tttt = [[1.00002,2.31,3,4,5], [-1,-10.4,1,1,5], [7,-8,1,2,8], [9,-1.1231,1,2,3]];

    let simpleTestIdx = 1;

    it(`${testDesc} ${simpleTestIdx}: Comparison`, () => {
           assert(matrixLib.areMatriciesEqual(tt, tt));
       });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Comparison Approximate`, () => {
        assert(matrixLib.areMatriciesApproximatelyEqual(tt, ttAppox, 0.11));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Test Matrix pair`, () => {
        assert(!matrixLib.isValidMatrixPair(tt, ttt));
        assert(!matrixLib.isValidMatrixPair(tt, [1,2,3]));
        assert(!matrixLib.isValidMatrixPair(tt, [[1,2],[1]]));
        assert(matrixLib.isValidMatrixPair(ttt, ttt));

    });

    it(`${testDesc} ${simpleTestIdx}: Add C Test`, () => {
        let addedMat = matrixLib.addMatrixC(tt, 1);
        let added1DMat = matrixLib.addMatrixC(t, 1);
        assert(matrixLib.areMatriciesEqual(added1DMat, [2,3,4,5,6]));
        assert(matrixLib.areMatriciesApproximatelyEqual(tt, addedMat, 1.01));
        assert(!matrixLib.areMatriciesApproximatelyEqual(tt, addedMat, 0.99));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Subtract C Test`, () => {
        let addedMat = matrixLib.subMatrixC(tt, 1);
        let added1DMat = matrixLib.subMatrixC(t, 1);
        assert(matrixLib.areMatriciesEqual(added1DMat, [0,1,2,3,4]));
        assert(matrixLib.areMatriciesApproximatelyEqual(tt, addedMat, 1.01));
        assert(!matrixLib.areMatriciesApproximatelyEqual(tt, addedMat, 0.99));
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Mutiply matrix Test`, () => {
        let mat1X = matrixLib.multiplyMatrixC(tt, 1);
        let mat2X = matrixLib.multiplyMatrixC(tt, 2);
        let expectedMat2X = [[2,10], [-2,-14]];
        assert(matrixLib.areMatriciesEqual(tt, mat1X));
        assert(matrixLib.areMatriciesEqual(mat2X, expectedMat2X));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Power matrix Test`, () => {
        let mat1X = matrixLib.powerMatrixC(tt, 1);
        let mat2X = matrixLib.powerMatrixC(tt, 2);
        let expectedMat2X = [[1,25], [1,49]];
        let powerTest1D = [1,2,3]
        let powerTest1DLib = matrixLib.powerMatrixC(powerTest1D, 3);

        assert(matrixLib.areMatriciesEqual(powerTest1DLib, [1,8,27]));
        assert(matrixLib.areMatriciesEqual(tt, mat1X));
        assert(matrixLib.areMatriciesEqual(mat2X, expectedMat2X));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Divide matrix Test`, () => {
        let mat1X = matrixLib.divideMatrixC(tt, 1);
        let mat2X = matrixLib.multiplyMatrixC(tt, 2);
        let matBackTo1X = matrixLib.divideMatrixC(mat2X, 2);
        
        let divideTest = [2,4,6]
        let divideTestLib = matrixLib.divideMatrixC([4,8,12], 2);

        assert(matrixLib.areMatriciesEqual(divideTest, divideTestLib));
        assert(matrixLib.areMatriciesEqual(tt, mat1X));
        assert(matrixLib.areMatriciesEqual(tt, matBackTo1X));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Add matrix Test`, () => {
        let mat2XbyAdd = matrixLib.addMatrix(tt, tt);
        let mat2X = matrixLib.multiplyMatrixC(tt, 2);
        assert(matrixLib.areMatriciesEqual(mat2X, mat2XbyAdd));

        let mat2XbyAdd1D = matrixLib.addMatrix(t, t);
        let mat2X1D = matrixLib.multiplyMatrixC(t, 2);
        assert(matrixLib.areMatriciesEqual(mat2X1D, mat2XbyAdd1D));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Add matrix Test`, () => {
        let mat0 = matrixLib.subMatrix(tt, tt);
        let zeroMat = matrixLib.getZeroMatrix(tt.length, tt.length);
        assert(matrixLib.areMatriciesEqual(mat0, zeroMat));

        let mat01D = matrixLib.subMatrix(t, t);
        let zeroMat1D = [0,0,0,0];
        assert(matrixLib.areMatriciesEqual(mat01D, zeroMat1D));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Multiply matrix Test`, () => {
        let matMult = [1,2,3];
        let matMult2 = [[1],[2],[3]]
        let result = [14];
        let libResult = matrixLib.multiplyMatrix(matMult, matMult2);
        assert(matrixLib.areMatriciesEqual(libResult, result));

        let matMult2D = [[216,-162,84],[86,-4,-70],[26,86,173]];
        let libResult2D = matrixLib.multiplyMatrix(ttt, ttt);
        assert(matrixLib.areMatriciesEqual(libResult2D, matMult2D));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Identity matrix Test`, () => {
        let identity = [[1,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,0,1]];
        let libIdentity = matrixLib.getIdentityMatrix(5);
        assert(matrixLib.areMatriciesEqual(identity, libIdentity));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: RC Identity matrix Test`, () => {
        let identityRC = [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0]];
        let libIdentityRC = matrixLib.getIdentityMatrixRC(5, 6);
        assert(matrixLib.areMatriciesEqual(identityRC, libIdentityRC));

    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Zero matrix Test`, () => {
        let zeroMat = matrixLib.getZeroMatrix(5, 6);
        for (let i = 0; i < zeroMat.length; i++){
            for (let j = 0; j < zeroMat[0].length; j++){
                assert(0 === zeroMat[i][j]);
            }
        }
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Matrix Determinant Test`, () => {
        let det = matrixLib.determinantMatrix(ttt);
        assert(det === 2118);

        let nonDetMatrix = [[1,2,3],[4,5,6],[7,8,9]];
        let det0 = matrixLib.determinantMatrix(nonDetMatrix);
        assert(det0 === 0);
    });
    simpleTestIdx++;

    it(`${testDesc} ${simpleTestIdx}: Matrix Inverse Test`, () => {
        let inverse = [[1,2,3],[4,5,6],[7,2,9]];
        let invMat = matrixLib.inverseMatrix(inverse);
        let expectedInv = [[(-11/12), (1/3),(1/12)], [(-1/6),(1/3),(-1/6)],[0.75,(-1/3),(1/12)]];
        assert(matrixLib.areMatriciesApproximatelyEqual(invMat, expectedInv));
    });
    simpleTestIdx++;

    /*it(`${testDesc} ${simpleTestIdx}: Matrix Eigenvalue Test`, () => {
        let eigTest = [[1,2,1],[6,-1,0],[-1,-2,-1]];
        let eigs = matrixLib.QReig(eigTest, 80000);
        console.log(eigs)
        //assert(det0 === 0);
    });*/
    simpleTestIdx++;
   });
