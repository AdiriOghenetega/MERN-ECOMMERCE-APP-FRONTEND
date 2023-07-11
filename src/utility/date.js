export const dayOfYear= (currentdate)=>{
    let result = Math.floor((currentdate - new Date(currentdate.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)+1);
   return result
  }