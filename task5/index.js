// Task 5: You are given an integer array nums and you have to return a new counts array where counts[i] is the number of smaller elements to the right of nums[i].


function countSmaller(nums){
    // create a new counts array to store result
    let counts=Array(nums.length).fill(0)
 
    // now iterates through the nums
    for(let i=0; i<nums.length;i++){
     for(j=i+1; j<nums.length;j++){
         if(nums[i]>nums[j]){
             counts[i]+=1
         }
     }
    }
     return counts
 }
 console.log(countSmaller([5, 2, 6, 1]))



 //1. Time Complexity
 //  The outer loop runs n times, and for each element,
 // the inner loop runs approximately n-i times, 
 // total TC= O(n)*O(n-i)=== O(n^2)
 
 // 2. SC= O(n) since we are using extra array counts to store result