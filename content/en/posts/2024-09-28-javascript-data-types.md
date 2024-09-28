---
title: JavaScript Data Types
date: 2024-09-28T00:00:00+08:00
slug: javascript-data-types
tags:
  - javascript
  - web
lastmod: 2024-09-28T00:00:00+08:00
---

JavaScript has 8 data types:

1. Undefined (`undefined`)
1. Null (`null`)
1. Boolean (`true` / `false`)
1. Number
1. BigInt
1. String
1. Symbol (unique value)
1. Object

Object is the only mutable type. Other types are immutable and are called primitive types.

## Undefined

The Undefined type has only one value: `undefined`, which means a variable is declared but no value is assigned to it.

```js
let name;
console.log(name); // undefined
```

`undefined` can be assigned to a variable but one should use `null` to represent emptiness.

```js
let name = "Kate";
console.log(name) // Kate
name = undefined;
console.log(name); // undefined
```

## Null

The Null type has only one value: `null`, which means empty.

```js
let name = null;
console.log(name); // null
```

## Boolean

The Boolean type has two values: `true` and `false`. The Boolean values are usually used in conditional operations.

```js
console.log(1 > 2); // false
if (1 > 2) {
  console.log("One is greater than two."); // not executed
} else {
  console.log("One is less than two."); // executed
}
```

## Number

The Number type represents both integer and floating point numbers.

```js
let num;
num = 10;
num = 10.1;
```

The Number type contains some special values: `Infinity`, `-Infinity` and `NaN` (**N**ot **a** **N**umber).

```js
console.log(10 / 0); // Infinity
console.log(-10 / 0); // -Infinity
console.log(10 / 'a'); // NaN
console.log(NaN === NaN); // false
```

JavaScript can only safely store integers in the range of `Number.MIN_SAFE_INTEGER` -(2^53^ − 1) to `Number.MAX_SAFE_INTEGER`  (2^53^ − 1).

```js
console.log(Number.MAX_SAFE_INTEGER);     // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 3); // 9007199254740994
```

## BigInt

The BigInt type can safely store integers beyond `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`. To create a BigInt value, append `n` to an integer or call the `BigInt()` function. Note that when `BigInt()` accept a number beyond the safe limits, the number will be rounded.

```js
console.log(9007199254740991);           // 9007199254740991
console.log(9007199254740992);           // 9007199254740992
console.log(9007199254740993);           // 9007199254740992, number is rounded
console.log(9007199254740993n);          // 9007199254740993n
console.log(BigInt(9007199254740993));   // 9007199254740992n, number is rounded
console.log(BigInt("9007199254740993")); // 9007199254740993n
```

## String

The String type represents text.

```js
const firstName = "Jane";
const lastName = "Doe";
const fullName = firstName + " " + lastName;
console.log(fullName); // Jane Doe
const selfIntroduction = `Hi, I am ${fullName}.`;
console.log(selfIntroduction); // Hi, I am Jane Doe.
```

## Symbol

The Symbol type represents a unique and immutable value. To create a Symbol value, call `Symbol()` function with an optional string as its description.

```js
const sym1 = Symbol();
const sym2 = Symbol("foo");
const sym3 = Symbol("foo");
console.log(sym1 === sym2); // false
console.log(sym2 === sym3); // false
```

## Object

Object is a collection of key-value pairs, similar to a dictionary.

```js
const englishDictionary = {
  article: "A piece of writing",
  happy: "Feeling or showing pleasure",
  water: "Clear and tasteless liquid, essential for life"
}
```

## References

- [Data types - javascript.info](https://javascript.info/types)
- [JavaScript data types and data structures - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [What is the difference between null and undefined in JavaScript? - Stack Overflow#57249968](https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript/57249968#57249968)