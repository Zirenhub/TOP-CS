const sumToForLoop = (num) => {
  let sum = 0;

  for (let i = num; i >= 1; i--) {
    sum += i;
  }
  console.log(sum);
};

const sumToRecursion = (num) => {
  if (num == 1) return 1;
  return num + sumToRecursion(num - 1);
};

const sumToFormula = (num) => {
  return (num * (num + 1)) / 2;
};

//------------------------------

const factorial = (num) => {
  if (num == 1) return 1;
  return num * factorial(num - 1);
};

//------------------------------

const fibonacci = (num) => {
  return num <= 1 ? num : fibonacci(num - 1) + fibonacci(num - 2);
};

//------------------------------

let fibArray = [];

const fibonacciLoop = (num) => {
  let a = 1;
  let b = 0;
  let nextTerm;

  for (let i = 1; i < num; i++) {
    nextTerm = a + b;
    a = b;
    b = nextTerm;
    fibArray.push(b);
  }
};

const fibsRec = (num, sequence = [0, 1]) => {
  if (sequence.length >= num) {
    return sequence.slice(0, num);
  }

  const newNumber = sequence.at(-1) + sequence.at(-2);
  sequence.push(newNumber);
  return fibsRec(num, sequence);
};

let sortArray = [1, 4, 6, 2, 8, 5, 9, 10, 3, 7];

const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle, arr.length);
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  const res = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  while (left.length) {
    res.push(left.shift());
  }
  while (right.length) {
    res.push(right.shift());
  }
  return res;
};

console.log(mergeSort([1, 4, 6, 2, 8, 5, 9, 10, 3, 7]));