const numbers = [3, 5, 7, 9];
// Expected output: 24
const initialValue = 0;
const sum = numbers.reduce((e, c) => (e = e + c), initialValue);
console.log(`The sum of array numbers is ${sum}`);

const numbers1 = [3, 5, 7, 2, 9];
// Expected output: 9
const maxValue = numbers1.reduce((e, c, i) => {
  return e > c ? e : c;
}, initialValue);
console.log(`The max value of numbers1 is ${maxValue}`);

const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
// Expected output: [1, 2, 3, 4, 5, 6]
const unfold = (array) => {
  return array.reduce((e, c) => {
    return Array.isArray(c) ? e.concat(unfold(c)) : e.concat(c);
  }, []);
};
console.log(`The result is [${unfold(nestedArray)}]`);

const fruits = [
  "apple",
  "banana",
  "apple",
  "orange",
  "banana",
  "apple",
  "apple",
  "banana",
];
// Expected output: { apple: 3, banana: 2, orange: 1 }
const fruitCounts = fruits.reduce((acc, c) => {
  acc[c] = (acc[c] || 0) + 1;
  return acc;
}, {});
console.log(fruitCounts);

const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];
// Expected output: 90
// console.log(people[0].age);

const sumPeople = (array) => {
  return array.reduce((acc, current) => {
    return acc + current.age;
  }, initialValue);
};
console.log(sumPeople(people));
