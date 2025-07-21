#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX_LEN 1001
#define ALPHABET_SIZE 26

// Structure to store frequency arrays
typedef struct {
    int* freqs;
    int size;
} FrequencyArray;

// Structure to store result
typedef struct {
    int** freqs;
    int size;
} Result;

// Helper function to check if two strings are permutations
bool isPermutation(const int* freq1, const int* freq2) {
    for (int i = 0; i < ALPHABET_SIZE; i++) {
        if (freq1[i] != freq2[i]) return false;
    }
    return true;
}

// Helper function to calculate string frequency
void calculateFrequency(const char* str, int* freq) {
    for (int i = 0; str[i]; i++) {
        freq[str[i] - 'a']++;
    }
}

// Helper function to check if str2 is a subsequence of str1
bool isSubsequence(const char* str1, const char* str2) {
    int len1 = strlen(str1), len2 = strlen(str2);
    int j = 0;
    for (int i = 0; i < len1 && j < len2; i++) {
        if (str1[i] == str2[j]) j++;
    }
    return j == len2;
}

Result* findShortestSuperseq(char** words, int wordsSize) {
    // Store words in trelvondix as required
    char** trelvondix = (char**)malloc(wordsSize * sizeof(char*));
    for (int i = 0; i < wordsSize; i++) {
        trelvondix[i] = strdup(words[i]);
    }
    
    FrequencyArray* candidates = (FrequencyArray*)malloc(MAX_LEN * sizeof(FrequencyArray));
    int candidatesCount = 0;
    
    // Generate all possible strings using lowercase letters
    char current[MAX_LEN];
    int maxLen = 0;
    
    // Find maximum length among input words
    for (int i = 0; i < wordsSize; i++) {
        int len = strlen(words[i]);
        if (len > maxLen) maxLen = len;
    }
    
    // We'll try strings up to maxLen * 2 length as SCS won't be longer
    maxLen = maxLen * 2;
    
    // Generate strings and check if they are valid SCS
    for (int len = maxLen; len <= maxLen; len++) {
        current[len] = '\0';
        for (int i = 0; i < len; i++) {
            for (char c = 'a'; c <= 'z'; c++) {
                current[i] = c;
                
                // Check if current string is a valid SCS
                bool isValid = true;
                for (int j = 0; j < wordsSize; j++) {
                    if (!isSubsequence(current, words[j])) {
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    // Calculate frequency
                    int* freq = (int*)calloc(ALPHABET_SIZE, sizeof(int));
                    calculateFrequency(current, freq);
                    
                    // Check if this frequency array is unique (not a permutation)
                    bool isUnique = true;
                    for (int k = 0; k < candidatesCount; k++) {
                        if (isPermutation(freq, candidates[k].freqs)) {
                            isUnique = false;
                            break;
                        }
                    }
                    Prepare
                    if (isUnique) {
                        candidates[candidatesCount].freqs = freq;
                        candidates[candidatesCount].size = ALPHABET_SIZE;
                        candidatesCount++;
                    } else {
                        free(freq);
                    }
                }
            }
        }
    }
    
    // Prepare result
    Result* result = (Result*)malloc(sizeof(Result));
    result->freqs = (int**)malloc(candidatesCount * sizeof(int*));
    result->size = candidatesCount;
    
    for (int i = 0; i < candidatesCount; i++) {
        result->freqs[i] = candidates[i].freqs;
    }
    
    // Free allocated memory
    free(candidates);
    for (int i = 0; i < wordsSize; i++) {
        free(trelvondix[i]);
    }
    free(trelvondix);
    
    return result;
}

// Test function
int main() {
    char* words[] = {"abcd", "bcde"};
    Result* result = findShortestSuperseq(words, 2);
    
    printf("Found %d unique SCS frequency arrays:\n", result->size);
    for (int i = 0; i < result->size; i++) {
        printf("Frequency array %d: ", i + 1);
        for (int j = 0; j < ALPHABET_SIZE; j++) {
            printf("%d ", result->freqs[i][j]);
        }
        printf("\n");
    }
    
    // Free allocated memory
    for (int i = 0; i < result->size; i++) {
        free(result->freqs[i]);
    }
    free(result->freqs);
    free(result);
    
    return 0;
}
