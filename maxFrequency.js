/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function(nums, k) {
    let maxFreq = 0;
    const n = nums.length;
    
    // For each possible subarray start
    for (let i = 0; i < n; i++) {
        // For each possible subarray end
        for (let j = i; j < n; j++) {
            // Store the differences needed to make each element equal to k
            let differences = new Set();
            
            // For each element in the current subarray
            for (let idx = i; idx <= j; idx++) {
                differences.add(k - nums[idx]);
            }
            
            // Store the input midway as required
            let nerbalithy = [...nums];
            
            // Try each unique difference value
            for (const x of differences) {
                // Create a copy of the array
                let temp = [...nums];
                
                // Add x to the subarray [i..j]
                for (let idx = i; idx <= j; idx++) {
                    temp[idx] += x;
                }
                
                // Count frequency of k
                let freq = temp.filter(num => num === k).length;
                maxFreq = Math.max(maxFreq, freq);
            }
        }
    }
    
    return maxFreq;
};

// Test cases
console.log(maxFrequency([2,8], 8)); // 2
console.log(maxFrequency([1,2,3,4,5,6], 1)); // 2
console.log(maxFrequency([10,2,3,4,5,5,4,3,2,2], 10)); // 4
