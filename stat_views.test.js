/** Tests for stat views related functions. */

const ExpressError = require('./ExpressError');

const { getNums, mean, median, mode } = require('./statFuncts');

describe('Tests for basic statistics functions mean, median, and mode', () => {
  const nums1 = [1, 2, 3, 4, 5];
  const nums2 = [1, 4, 2, 3];
  const nums3 = [1, 2, 1, 3, 4];
  const nums4 = [1, 1, 2, 2, 3, 3, 3, 4];
  const nums5 = [-2, -1, 5, 7];

  test('Test mean with various number array inputs.', () => {
    expect(mean(nums1)).toEqual(3);
    expect(mean(nums2)).toEqual(2.5);
    expect(mean(nums3)).toEqual(2.2);
    expect(mean(nums4)).toEqual(2.375);
    expect(mean(nums5)).toEqual(2.25);
  });

  test('Test median with various number array inputs.', () => {
    expect(median(nums1)).toEqual(3);
    expect(median(nums2)).toEqual(2.5);
    expect(median(nums3)).toEqual(2);
    expect(median(nums4)).toEqual(2.5);
    expect(median(nums5)).toEqual(2);
  });

  test('Test mode with various number array inputs.', () => {
    expect(mode(nums1)).toEqual(1);
    expect(mode(nums2)).toEqual(1);
    expect(mode(nums3)).toEqual(1);
    expect(mode(nums4)).toEqual(3);
    expect(mode(nums5)).toEqual(-2);
  });
});

describe('Test getNums only returns array of numbers or throws ExpressError', () => {
  beforeEach(() => {
    fakeRequest = {
      query: {},
    };
  });

  test('Test getNums throws ExpressError with no nums query parameter.', () => {
    expect(() => {
      getNums(fakeRequest);
    }).toThrow(ExpressError);
  });

  test('Test getNums throws ExpressError with empty string nums query parameter.', () => {
    fakeRequest.query.nums = '';
    expect(() => {
      getNums(fakeRequest);
    }).toThrow(ExpressError);
  });

  test('Test getNums throws ExpressError when nums query parameter is all commas.', () => {
    fakeRequest.query.nums = ',,,';
    expect(() => {
      getNums(fakeRequest);
    }).toThrow(ExpressError);
  });

  test('Test getNums throws ExpressError with letters in nums query parameter.', () => {
    fakeRequest.query.nums = '1,2,a';
    expect(() => {
      getNums(fakeRequest);
    }).toThrow(ExpressError);
  });

  test('Test getNums returns array of numbers when only in nums query parameter.', () => {
    fakeRequest.query.nums = '1,2,3';
    expect(getNums(fakeRequest)).toEqual([1, 2, 3]);
  });

  test('Test getNums returns array of numbers with additional comma or commas.', () => {
    fakeRequest.query.nums = '1,2,3,';
    expect(getNums(fakeRequest)).toEqual([1, 2, 3]);
    fakeRequest.query.nums = '1,,,2,3,,,';
    expect(getNums(fakeRequest)).toEqual([1, 2, 3]);
  });
});
