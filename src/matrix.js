/** Class aggregating matrix methods. */
class matrixLib{
    /**
     * Checks if a pair of matricies are equal in size
     * @param {number[][]} A - The matrix to check
     * @param {number[][]} B - The second to check
     * @return {bool} Result if the dimension of the given matricies are equal
     */
    static isValidMatrixPair(A, B){
        if (A.length !== B.length){
            return false;
        }

        if (!(Array.isArray(A[0]) === Array.isArray(B[0]))){
            return false;
        }

        for (let i = 0; i < A.length; i++){
            if (A[i].length !== B[i].length){
                return false;
            }
        }
        
        return true;
    }

    /**
     * Adds constant c to each item in the matrix
     * @param {number[][]} A - The matrix to add c to
     * @param {number[][]} c - value to add to matrix A
     * @return {number[][]} Matrix result from the adding C to each element of A
     */
    static addMatrixC(A, c){
        const addFunc = (i, j) =>{
            return i + j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, addFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), addFunc);
        }
        return ret;
    }

    /**
     * Multiplies constant c to each item in the matrix
     * @param {number[][]} A - The matrix to add c to
     * @param {number[][]} c - value to add to matrix A
     * @return {number[][]} Matrix result from the multiplying c to each element of A
     */
    static multiplyMatrixC(A, c){
        const multFunc = (i, j) =>{
            return i * j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, multFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), multFunc);
        }
        return ret;
    }

    /**
     * Divides constant c to each item in the matrix
     * @param {number[][]} A - The matrix to add c to
     * @param {number[][]} c - value to add to matrix A
     * @return {number[][]} Matrix result from the multiplying c to each element of A
     */
    static divideMatrixC(A, c){
        const multFunc = (i, j) =>{
            return i / j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, multFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), multFunc);
        }
        return ret;
    }

    /**
     * Subtracts constant c to each item in the matrix
     * @param {number[][]} A - The matrix to sub c to
     * @param {number[][]} c - value to sub to matrix A
     * @return {number[][]} Matrix result from the subtracting C to each element of A
     */
    static subMatrixC(A, c){
        const subFunc = (i, j) =>{
            return i - j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, subFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), subFunc);
        }
        return ret;
    }

    /**
     * Adds matrix A to matrix B
     * @param {number[][]} A - Matrix input A
     * @param {number[][]} B - Matrix input B
     * @return {number[][]} Matrix result from adding A and B
     */
    static addMatrix(A, B){
        const addFunc = (i, j) =>{
            return i + j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            ret = matrixLib.matrixOpperation(A, B, addFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, B, addFunc);
        }
        return ret;
    }

    /**
     * Subtracts matrix B from matrix A
     * @param {number[][]} A - Matrix input A
     * @param {number[][]} B - Matrix input B
     * @return {number[][]} Matrix result from A - B
     */
    static subMatrix(A, B){
        const subFunc = (i, j) =>{
            return i - j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            ret = matrixLib.matrixOpperation(A, B, subFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, B, subFunc);
        }
        return ret;
    }

    /**
     * Multiplies matrix A and B
     * Note: You must check if the matrices are actually multiply-able
     * @param {number[][]} A - Matrix input A
     * @param {number[][]} B - Matrix input B
     * @return {number[][]} Matrix result from A * B
     */
    static multiplyMatrix(A, B){
        if (!Array.isArray(A[0])){
            //size 1 arr
            let ret = 0;
            for (let z = 0; z < A.length; z++){
                ret += A[z] * B[z][0];
            }
            return [ret];
        }

        let aRow = A.length;
        let bCol = B[0].length;

        let outputSize = {
            row: aRow,
            col: bCol,
        }

        let ret = [];
        for (let i = 0; i < outputSize.row; i++){
            let newRow = [];
            for (let j = 0; j < outputSize.col; j++){
                newRow[j] = matrixLib.dotProductMatrix(A, B, i, j);
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * Computers the dot product at a given row and column
     * Note: A and B must be multiply - able. The dot product is
     * A (dot) B. Inputs are 0-offset.
     * @param {number[][]} A - The matrix A
     * @param {number[][]} B - The matrix B
     * @param {number} row - Row to find dot product for
     * @param {number} col - Column to find dot product for
     * @return {number} Numerical evaluation of the dot product matrix A and B @ (row,col)
     */
    static dotProductMatrix(A, B, row, col){
        let ret = 0;
        for (let i = 0; i < A[row].length; i++){
            ret += A[row][i] * B[i][col];
        }
        return ret;
    }

    /**
     * Operates on the given matricies with func (for 2D dim matrices)
     * @param {number[][]} A - The matrix to sum
     * @param {number[][]} B - The second to sum
     * @return {number[][]} Numerical evaluation of matrix A and B
     */
    static matrixOpperation(A, B, func){
        let ret = [];
        for (let i = 0; i < A.length; i++){
            let row = [];
            for (let j = 0; j < A[i].length; j++){
                row[j] = func(A[i][j], B[i][j]);
            }
            ret[i] = row;
        }
        return ret;
    }

    /**
     * Operates on the given matricies with func (for 1 dim matrices)
     * @param {number[][]} A - The matrix to sum
     * @param {number[][]} B - The second to sum
     * @return {number[][]} Numerical evaluation of matrix A and B
     */
    static matrixOpperation1D(A, B, func){
        let ret = [];
        for (let i = 0; i < A.length; i++){
            ret[i] = func(A[i], B[i]);
        }
        return ret;
    }

    /**
     * Returns an identity matrix of a given size
     * @param {number} size - The size of matrix to generate
     * @return {number[][]} Identity matrix of a given size
     */
    static getIdentityMatrix(size){
        let ret = [];
        for (let i = 0; i < size; i++){
            let newRow = [];
            for (let j = 0; j < size; j++){
                newRow[j] = (i === j) ? 1: 0;
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * Returns an square zero matrix of a given size
     * @param {number} row - The row size of matrix to generate
     * @param {number} col - The column size of matrix to generate
     * @return {number[][]} Zero matrix of a given size
     */
    static getZeroMatrix(row, col){
        let ret = [];
        for (let i = 0; i < row; i++){
            let newRow = [];
            for (let j = 0; j < col; j++){
                newRow[j] = 0;
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * Computes the determinant of a matrix, returns NaN if det === 0
     * @param {number[][]} A - The matrix to find determinat for
     * @return {number} determinant of A
     */
    static determinantMatrix(A){
        let {L, U} = matrixLib.LuDecomposeMatrix(A);
        let lDet = 1;
        let uDet = 1;

        for (let i = 0; i < A.length; i++){
            lDet = lDet * L[i][i];
            uDet = uDet * U[i][i];
        }

        return lDet * uDet;
    }

    /**
     * Computes the upper and lower matrix using crout's method
     * Implementation is from: https://en.wikipedia.org/wiki/Crout_matrix_decomposition
     * @param {number[][]} A - The matrix to decompose
     * @return {number[][]} Identity matrix of a given size
     */
    static LuDecomposeMatrix(A){
        let n = A.length;
        let U = matrixLib.getIdentityMatrix(n);
        let L = matrixLib.getZeroMatrix(n, n);
        let sum = 0;
       
        for (let j = 0; j < n; j++) {
            for (let i = j; i < n; i++) {
                sum = 0;
                for (let k = 0; k < j; k++) {
                    sum = sum + L[i][k] * U[k][j];	
                }
                L[i][j] = A[i][j] - sum;
            }
    
            for (let i = j; i < n; i++) {
                sum = 0;
                for(let k = 0; k < j; k++) {
                    sum = sum + L[j][k] * U[k][i];
                }
                if (L[j][j] == 0) {
                    return NaN;
                }
                U[j][i] = (A[j][i] - sum) / L[j][j];
            }
        }

        return {
            L: L,
            U: U,
        };
    }

    /**
     * Gets a random matrix of given parameters
     * @param {number} row - number of rows to generate
     * @param {number} col - number of columns to generate
     * @param {{min: number, max: number, intOnly: boolean}} opt - Option for random values
     * @return {number[][]} A matrix of random values given the options
     */
    static getRandomMatrix(row, col, opt = {min: -10, max: 10, intOnly: true}){
        let ret = [];

        const randNum = (minVal, maxVal, integer) => {
            let val = (Math.random() * maxVal + minVal);
            if (integer){
                return Math.round(val);
            }
            return val;
        }

        for (let i = 0; i < row; i++){
            let newRow = [];
            for (let j = 0; j < col; j++){
                newRow[j] = randNum(opt.min, opt.max, opt.intOnly);
            }
            ret[i] = newRow;
        }

        return ret;
    }


    /**
     * @typedef {Object} MatrixDescription
     * @property {number} row - Numbers of rows in the given matrix (Do not use if not valid)
     * @property {number} col - Number of columns in the given matrix (Do not use if not valid)
     * @property {boolean} square - Boolean representing if the matrix is square
     * @property {boolean} identity - Boolean representing if the matrix is the identity matrix
     * @property {boolean} valid - Boolean representing if the matrix is valid

     */

    /**
     * Describes a given matrix
     * @param {number[][]} mat - The matrix to describe
     * @return {MatrixDescription} Description of the given matrix
     */
    static describeMatrix(mat){
        let rows = mat.length;
        let colSame = true;
        let isIdentity = true;

        if (Array.isArray(mat[0])){
            let colFirst = mat[0].length;
            let first = mat[0][0];
            for (let i = 0; i < rows; i++){
                if (mat[i].length !== colFirst){
                    colSame = colSame && false;
                }

                for (let j = 0; j < mat[i].length; j++){
                    if (i === j){
                        if (mat[i][j] !== first){
                            isIdentity = isIdentity && false;
                        }
                    } else if (mat[i][j] !== 0){
                        isIdentity = isIdentity && false;
                    }
                }
            }
            let ret = {
                row: rows,
                col: colFirst,
                square: colFirst === rows,
                identity: isIdentity,
                valid: colSame,
            };
            return ret;
        } else {
            return {
                row: 1,
                col: mat.length,
                square: false,
                identity: false,
                valid: true,
            };
        }
    }

    /**
     * Transposes a given matrix
     * 
     * A transpose is exampled as followed:
     *   [                     [
     *   [1, 1, 1, 1]          [1, 1]
     *   [2, 2, 2, 2]   ---\   [2, 2]
     *   ]              ---/   [3, 3]
     *                         [4, 4]
     *                         ]
     * @param {number[][]} mat - The matrix to transpose
     * @return {number[][]} Transposed matrix
     */
    static transposeMatrix(mat){
        let ret = [];

        //[1,2,3]
        if (!Array.isArray(mat[0])){
            for (let i = 0; i < mat.length; i++){
                ret[i] = [mat[i]];
            }
            return ret;
        }
    
        for (let j = 0; j < mat[0].length; j++){
            let col = [];
            for (let i = 0; i < mat.length; i++){
                col.push(mat[i][j]);
            }
            ret[j] = col;
        }
        return ret;
    }

    /**
     * Determins a the matrix of cofactors.
     * The cofactor checkerboard is the followed:
     * [
     *   [+, -, +, -]
     *   [-, +, -, +]
     *   [+, -, +, -]
     *   [-, +, -, +]
     * ]
     * 
     * The calculation of the cofactor is exampled as followed:
     *   [                     [
     *   [1, 1, 1, 1]          [1, -1, 1, -1]
     *   [2, 2, 2, 2]   ---\   [-2, 2, -2, 2]
     *   [3, 3, 3, 3]   ---/   [3, -3, 3, -3]
     *   [4, 4, 4, 4]          [-4, 4, -4, 4] 
     *   ]                     ]
     * 
     * @param {number[][]} mat - The matrix to determine cofactors for
     * @return {number[][]} matrix of cofactors
     */
    static cofactorMatrix(mat){
        let ret = [];
        let multFactor = 1;

        //[1,2,3]
        if (!Array.isArray(mat[0])){
            for (let i = 0; i < mat.length; i++){
                ret[i] = mat[i] * multFactor;
                multFactor = multFactor * -1;
            }
            return ret;
        }
    
        for (let i = 0; i < mat.length; i++){
            let col = [];
            for (let j = 0; j < mat[i].length; j++){
                col[j] = (mat[i][j] * multFactor);
                multFactor = multFactor * -1;
            }
            multFactor = (i % 2 === 0)? -1: 1;
            ret[i] = col;
        }
        return ret;
    }

    /**
     * Duplicates a given matrix. I.e. new copy is created and returned
     * Original reference is maintained
     * @param {number[][]} mat - The matrix to duplicate
     * @return {number[][]} Duplicated matrix
     */
    static duplicateMatrix(mat){
        let ret = [];
        let multFactor = 1;

        //[1,2,3]
        if (!Array.isArray(mat[0])){
            return [...mat];
        }
    
        for (let i = 0; i < mat.length; i++){
            ret[i] = [...mat[i]];
        }
        return ret;
    }

    /**
     * Deletes a row and column of a given matrix
     * Original reference is maintained
     * This method only works on 2D matricies
     * @param {number[][]} mat - The matrix to modify
     * @param {number} row - The row to remove
     * @param {number} col - The col to remove
     * @return {number[][]} Matrix without the specified row and column
     */
    static removeRowAndColMatrix(mat, row, col){
        let ret = matrixLib.duplicateMatrix(mat);
    
        for(var i = 0 ; i < ret.length ; i++)
        {
            ret[i].splice(col,1);
        }

        ret.splice(row, 1);
        
        return ret;
    }
}

test = [
    [3,7,8,9],
    [1,4,99,1],
    [77,11,9,-5],
    [1.5,5.5,1,-3.1]
]

t = [
    [1,2,3],
    [2,3,4],
    [4,5,8]
]
t1 = [
    [1,2,3,4],
    [2,3,4,5],
    [4,5,8,6]
]
t2 = [
    [1,2,3],
    [2,3,4],
]

t3 = [[1,2], [2,3], [4,5]]

z = [1,2,3];
z1 = [[1],[2],[3]]

//console.log(matrixLib.removeRowAndColMatrix(t1, 0, 0))
console.log(matrixLib.LuDecomposeMatrix(t1))
module.exports = {
    matrixLib: matrixLib,
};

//console.log(matrixLib.multiplyMatrix(z, z1));
//console.log(matrixLib.multiplyMatrix(t2, t3));

//console.log(matrixLib.getIdentityMatrix(6));
//matrixLib.describeMatrix(matrixLib.getIdentityMatrix(6))
//console.log(matrixLib.describeMatrix(t2));
//console.log(matrixLib.determinantMatrix(test));
//console.log(matrixLib.getRandomMatrix(5, 4, {min:-2,max:10,intOnly: true}));

//console.log(matrixLib.multiplyMatrixC(t, 6));

//console.log(matrixLib.divideMatrixC(t, 2));
//console.log(matrixLib.transposeMatrix(z1))

//console.log(matrixLib.cofactorMatrix(z))
//console.log(t === t)
//console.log(matrixLib.duplicateMatrix(t) === t)