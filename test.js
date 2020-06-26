const {probabilityLib, statsLib, combinationLib, permutationLib} = require('./index.js');

console.log(statsLib.stdev([5,3,1,4,2,3,4,5,7,7,7], opt = {"population": false}));

console.log(statsLib.zScorePercentile(3.99));

console.log(combinationLib.combinations([1,2,3,4,5,6,7,8,9,10],7))

console.log(combinationLib.combinations([1,2,3,4,5,6,7,8,9,10],7).length)

console.log(permutationLib.nPermutations([1,2,3,4,5], 3))

console.log(permutationLib.nPermutations([1,2,3,4,5], 3).length)
