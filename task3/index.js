/*Task 3:  Write a function that takes an array of positive integers 
 and returns the length of the longest chain of consecutive numbers.
 A chain is defined as a sequence of numbers in the array where each number
  is exactly one more than the previous number in the sequence, and
   the sequence can be in any order in the array.
    Also explain the time complexity and space complexity. */

    function longestChain(nums) {
        let length = 0;
      
        //first create a set from the given array of nums
        let numSet = new Set(nums);
        // iterates through the nums
        for (let num of nums) {
          // check if the num is start of chain or not
          if (!numSet.has(num - 1)) {
            let chainNum = num;
            let chainLength = 1;
      
            // now check the length of the chain from that num
            while (numSet.has(chainNum + 1)) {
              chainNum += 1;
              chainLength += 1;
            }
      
            // now update the length
            length = Math.max(length, chainLength);
          }
        }
        return length;
      }
      console.log(longestChain([10, 4, 50, 1, 2, 3]));
      