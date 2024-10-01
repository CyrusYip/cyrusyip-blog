---
title: Prototype and Inheritance in JavaScript
date: 2024-10-02T00:00:00+08:00
slug: javascript-prototype-inheritance
tags:
  - javascript
  - web
lastmod: 2024-10-02T00:00:00+08:00
---

## Prototype

In JavaScript, every object has a hidden built-in property called prototype (`[[Prototype]]` in ECMAScript Specification and Chrome, `<prototype>` in Firefox), which is an object. With prototypes, we can create shared properties. To get or set `[[Prototype]]`, use `Object.getPrototypeOf()` and `Object.setPrototypeOf()`. `__proto__` is a non-standard getter/setter of `[[Prototype]]`, but it's implemented by many JavaScript engines.

```js
const fruit = {
  eatable: true,
}

const apple = {
  shape: "round",
  __proto__: fruit, // set [[Prototype]] as fruit
}
console.log(apple.__proto__)      // { eatable: true }
console.log(apple.shape)          // round, own property
console.log(apple.eatable)        // true, inherit from [[Prototype]]
console.log(apple.requireCooking) // undefined, not exist in apple or fruit
fruit.requireCooking = false      // add a property to [[Prototype]]
console.log(apple.requireCooking) // false, inherit from [[Prototype]]

const banana = {
  shape: "long and curved",
}
Object.setPrototypeOf(banana, fruit)       // set [[Prototype]] as fruit
console.log(Object.getPrototypeOf(banana)) // { eatable: true, requireCooking: false } 
console.log(banana.eatable)                // true, inherit from [[Prototype]]
```

## Prototype Chain / Inheritance

An object has a prototype and its prototype also has a prototype. All these prototypes are called the prototype chain. The last prototype's prototype is `null`. An object can inherit properties from multiple prototypes in the prototype chain.  When a property is accessed, the object is first checked. If the property is not found, check every prototype in the prototype chain until the property is found. If the property is not found at the end, `undefined` is returned.

In the apple example, the prototype chain of `apple` is:

```
apple -> fruit -> Object.prototype -> null
```

The code below demonstrates the prototype chain:

```js
const fruit = {
  eatable: true,
}
const apple = {
  shape: "round",
  __proto__: fruit,
}
// fruit
console.log(apple.__proto__)                                // { eatable: true }
console.log(apple.__proto__ === fruit)                      // true
// Object.prototype
console.log(apple.__proto__.__proto__)                      // { … }
console.log(apple.__proto__.__proto__ === Object.prototype) // true
// null
console.log(apple.__proto__.__proto__.__proto__)            // null
```

## Further Reading

- [Object prototypes - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [Inheritance and the prototype chain - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Prototypal inheritance - javascript.info](https://javascript.info/prototype-inheritance)

## Test

- [Prototypal inheritance#tasks - javascript.info](https://javascript.info/prototype-inheritance#tasks)