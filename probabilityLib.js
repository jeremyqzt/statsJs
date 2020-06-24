class permutationLib{
    static countPermutation(start, end){
        if (start <= 0 || end < start){
            return 0;
        }

        let ret = 1;
        for (let i = start; i <= end; i++){
            ret *= i;
        }
        return ret;
    }

    static permutation(inArr){
        /**procedure generate(k : integer, A : array of any):
            if k = 1 then
                output(A)
            else
                // Generate permutations with kth unaltered
                // Initially k == length(A)
                generate(k - 1, A)
        
                // Generate permutations for kth swapped with each k-1 initial
                for i := 0; i < k-1; i += 1 do
                    // Swap choice dependent on parity of k (even or odd)
                    if k is even then
                        swap(A[i], A[k-1]) // zero-indexed, the kth is at k-1
                    else
                        swap(A[0], A[k-1])
                    end if
                    generate(k - 1, A)
        
                end for
            end if
        **/
        let ret = [];
        const permute = (k, arr) => {
            if (k === 1) {
                ret.push(arr)
            } else {
                permute(k - 1, [...arr])
                for (let i = 0; i < k - 1; i++) {
                    if( k % 2 === 0){
                        let t = arr[k-1];
                        arr[k-1] = arr[i]
                        arr[i] = t
                    } else {
                        let t = arr[k-1];
                        arr[k-1] = arr[0]
                        arr[0] = t
                    }
                    permute(k - 1, [...arr])
                }
            }
        }

        permute(inArr.length, inArr)
        return ret;
    }
}

class combinationLib{
    static countCombinations(n, r){
        if (n === r) {
            return 1;
        }
        let nObj = probabilityLib.countPermutation(1, n);
        let noOrder = probabilityLib.countPermutation(1, n-r);
        let rObj = probabilityLib.countPermutation(1, r);

        return (nObj)/(noOrder*rObj);
    }

    static combinations(inArr, k){
        let ret = [];
        let N = inArr.length;
        let pointers = Array.of(k);
        let i = 0;
        let r = 0;

        if (k > N){
            return inArr;
        }

        while (r >= 0){
            if (i <= (N + (r - k))){
                pointers[r] = i;
                
                if (r == k-1){
                    let newComb = []
                    for (let j = 0; j < pointers.length; j++){
                        newComb.push(inArr[pointers[j]]);
                    }
                    ret.push(new Set(newComb));
                    i++
                }
                else
                {
                    i = pointers[r] + 1;
                    r++
                }
            }
            else
            {
                r--;
                if(r >= 0){
                    i = pointers[r]+1;
                }
            }
        }
        return ret;
    }
}

class probabilityLib{
    static valuesOk(x,y){
        if (x < 0 || x > 1 || y < 0 || y > 1){
            return false;
        }
        return true;
    }

    static XandY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return x*y;
        }
        return 0;
    }

    static XandNotY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return x*(1-y);
        }
        return 0;
    }

    static XorY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return 1-((1-x)*(1-y));
        }
        return 0;
    }

    static XgivenY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return (x*y)/y;
        }
        return 0;
    }

    static XgivenNotY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return (probabilityLib.XandNotY(x, y))/(1-y);
        }
        return 0;
    }
}