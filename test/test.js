const {probabilityLib, statsLib, combinationLib, permutationLib} = require('../index.js');
const assert = require('assert');

test = permutationLib.permutation([1,2,3]);
console.log(test)

describe('Permutation Counting Test', () => {
    let testDesc = "Simple Permutation Test";
    let simpleTestIdx = 1;
    it(`${testDesc} ${simpleTestIdx}`, () => {
           assert.equal(permutationLib.countPermutation(7,2), 42);
       });
    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(permutationLib.countPermutation(7,1), 7);
    });
    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}`, () => {
        assert.equal(permutationLib.countPermutation(7,7), permutationLib.factorial(7));
    });
   });

   
describe('Permutation Test', () => {
    let testDesc = "Permutation Test";
    let len = 7;
    let simpleTestIdx = 1;
    let testData = Array.from({length: len}, () => Math.floor(Math.random() * 100));
    let testOutput = permutationLib.kPermutations(testData, len);

    const arrEqual = (x, y) => {
        for (let i = 0 ; i < x.length; i++){
            if (x[i] !== y[i]){
                return false;
            }
        }
        return true;
    }

    it(`${testDesc} ${simpleTestIdx}`, () => {
           assert.equal(testOutput.length, permutationLib.factorial(len));
    });

    simpleTestIdx++;
    it(`${testDesc} ${simpleTestIdx}`, () => {
        for (let j = 0; j < testOutput.length; j++){
            for (let z = 0; z < testOutput.length; z++){
                if (z === j) {continue;}
                assert(!arrEqual(testOutput[z], testOutput[j]));
                simpleTestIdx++;
            } 
        } 
    });
   });


/*
console.log(statsLib.stdev([5,3,1,4,2,3,4,5,7,7,7], opt = {"population": false}));

console.log(statsLib.zScorePercentile(3.99));

console.log(combinationLib.combinations([1,2,3,4,5,6,7,8,9,10],7))

console.log(combinationLib.combinations([1,2,3,4,5,6,7,8,9,10],7).length)

console.log(permutationLib.kPermutations([1,2,3,4,5], 3))

console.log(permutationLib.kPermutations([1,2,3,4,5], 3).length)

console.log(statsLib.percentileFromMeanAndStdev(5, 5.5, 3));

console.log(permutationLib.factorial(5));
*/