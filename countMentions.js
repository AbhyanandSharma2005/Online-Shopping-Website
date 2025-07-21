/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function(numberOfUsers, events) {
    // Initialize mentions array with zeros
    const mentions = new Array(numberOfUsers).fill(0);
    
    // Track offline users with their offline period
    const offlineUsers = new Map(); // userId -> endOfflineTime
    
    // Sort events by timestamp and type (OFFLINE events should be processed before MESSAGE events)
    events.sort((a, b) => {
        const timeA = parseInt(a[1]);
        const timeB = parseInt(b[1]);
        if (timeA !== timeB) {
            return timeA - timeB;
        }
        // If timestamps are equal, OFFLINE events should come first
        return a[0] === "OFFLINE" ? -1 : b[0] === "OFFLINE" ? 1 : 0;
    });
    
    // Process events in chronological order
    for (const [eventType, timestamp, data] of events) {
        const currentTime = parseInt(timestamp);
        
        // First, update online/offline status
        // Remove users who are back online
        for (const [userId, endTime] of offlineUsers.entries()) {
            if (endTime <= currentTime) {
                offlineUsers.delete(userId);
            }
        }
        
        if (eventType === "OFFLINE") {
            const userId = parseInt(data);
            offlineUsers.set(userId, currentTime + 60);
        } else if (eventType === "MESSAGE") {
            // Handle message event
            if (data === "ALL") {
                // Mention all users
                for (let i = 0; i < numberOfUsers; i++) {
                    mentions[i]++;
                }
            } else if (data === "HERE") {
                // Mention all online users
                for (let i = 0; i < numberOfUsers; i++) {
                    if (!offlineUsers.has(i)) {
                        mentions[i]++;
                    }
                }
            } else {
                // Handle individual mentions
                const mentionedUsers = data.split(" ");
                for (const mention of mentionedUsers) {
                    const userId = parseInt(mention.substring(2)); // Remove 'id' prefix
                    mentions[userId]++;
                }
            }
        }
    }
    
    return mentions;
};

// Test cases
console.log(countMentions(3, [["MESSAGE","2","HERE"],["OFFLINE","2","1"],["OFFLINE","1","0"],["MESSAGE","61","HERE"]])); // [1,0,2]
console.log(countMentions(2, [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]])); // [2,2]
console.log(countMentions(2, [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]])); // [2,2]
console.log(countMentions(2, [["OFFLINE","10","0"],["MESSAGE","12","HERE"]])); // [0,1]
