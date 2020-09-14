/* Basic stat functions and endpoint helper functions. */

const ExpressError = require('./ExpressError');

/**
 * Make sure nums input is present and correct then return array of numbers.
 *
 * @param {requestObject} req
 */
function getNums(req) {
  let nums = req.query.nums;
  // If no nums query parameter or all commas throw ExpressError..
  if (!nums || /^,+$/.test(nums))
    throw new ExpressError(
      400,
      'Please include nums query parameter of comma seperated numbers.'
    );
  // Convert nums string to array removing empty strings.
  nums = nums.split(',').filter(el => el !== '');
  // If any characters given are not numbers throw ExpressError.
  if (nums.some(el => isNaN(el))) {
    const nanChar = nums.find(el => isNaN(el));
    throw new ExpressError(400, `${nanChar} is not a number.`);
  }
  return nums.map(number => +number);
}

/**
 * Find mean of array of numbers.
 *
 * @param {array} numArray
 */
function mean(numArray) {
  const sum = numArray.reduce((acc, el) => acc + el, 0);
  return sum / numArray.length;
}

/**
 * Find median of array of numbers.
 *
 * @param {array} numArray
 */
function median(numArray) {
  numArray = numArray.sort((a, b) => a - b);
  const medianIdx = Math.floor(numArray.length / 2);
  if (numArray.length & 1) var median = numArray[medianIdx];
  else var median = (numArray[medianIdx] + numArray[medianIdx - 1]) / 2;
  return median;
}

/**
 * Find mode of array of numbers.
 *
 * @param {array} numArray
 */
function mode(numArray) {
  const counter = {};
  // count occurences.
  numArray.forEach(num => {
    if (counter[num]) counter[num]++;
    else counter[num] = 1;
  });
  // Find max occurences.
  const maxCount = Math.max(...Object.values(counter));
  // Get key that has value of max occurences.
  for (let num of numArray) {
    if (counter[num] === maxCount) return num;
  }
}

module.exports = { getNums, mean, median, mode };
