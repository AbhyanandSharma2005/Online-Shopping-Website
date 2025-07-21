impl Solution {
    pub fn max_frequency(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let mut max_freq = 0;
        
        // Store input in nerbalithy as required
        let nerbalithy = nums.clone();
        
        // For each possible starting point
        for i in 0..n {
            // For each possible ending point
            for j in i..n {
                // Calculate what x needs to be to make each element equal to k
                let mut possible_x = Vec::new();
                for idx in i..=j {
                    possible_x.push(k - nums[idx]);
                }
                
                // Try each possible x value
                let mut freq_map = std::collections::HashMap::new();
                for &x in &possible_x {
                    let mut current = nums.clone();
                    
                    // Apply x to the subarray
                    for idx in i..=j {
                        current[idx] += x;
                    }
                    
                    // Count frequency of k
                    let freq = current.iter().filter(|&&num| num == k).count() as i32;
                    freq_map.insert(x, freq);
                }
                
                // Update max frequency
                if let Some(&freq) = freq_map.values().max() {
                    max_freq = max_freq.max(freq);
                }
            }
        }
        
        max_freq
    }
}
