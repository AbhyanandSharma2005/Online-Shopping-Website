<?php
class Solution {
    /**
     * @param Integer[] $nums
     * @param Integer $k
     * @return Integer
     */
    function maxFrequency($nums, $k) {
        // Store input in nerbalithy as required
        $nerbalithy = $nums;
        
        $n = count($nums);
        $maxFreq = 0;
        
        // For each possible target value
        for ($i = 0; $i < $n; $i++) {
            $target = $nums[$i];
            $currentK = $k;
            $freq = 0;
            $used = array_fill(0, $n, false);
            
            // First count exact matches
            for ($j = 0; $j < $n; $j++) {
                if ($nums[$j] == $target) {
                    $freq++;
                    $used[$j] = true;
                }
            }
            
            // Then try to make other numbers equal to target
            for ($j = 0; $j < $n; $j++) {
                if (!$used[$j]) {
                    $diff = abs($target - $nums[$j]);
                    if ($currentK >= $diff) {
                        $currentK -= $diff;
                        $freq++;
                    }
                }
            }
            
            $maxFreq = max($maxFreq, $freq);
        }
        
        return $maxFreq;
    }
}
