# Description

A package of functions that extend array functionality in Node

## Installation

npm install array-helper

## Functions

### Array.prototype.distinct()
#### Description
Returns an array with duplicate items removes

#### Returns
Array

#### Example

```javascript
var arr = [1,1,5,6,3,5,6,7,7];
var distinct = arr.distinct();
console.log(distinct); //[ 1, 5, 6, 3, 7 ]
```

### Array.prototype.equals(arr)
#### Description
Returns true if elements in the two arrays are equal, false otherwise. Also
checks for nested arrays and their equality.

#### Parameters
*arr* - Array to compare with. Returns false if this is not an array

#### Returns
boolean, true if elements in the arrays are equal

#### Example

```javascript
var arr1 = [ 1, 2, [ 3, 4 ] ];
var arr2 = [ 1, 2, [ 3, 4 ] ];
var arr3 = [ 1, 2, 3, 4 ];

console.log(arr1.equals(arr2)); //true
console.log(arr1.equals(arr3)); //false
```

### Array.prototype.toDict(key)
#### Description
Converts an array of objects into an object with keys specified by *key*

#### Parameters
*key* - String. The value from the objects to use as the key in the dictionary

#### Returns
Object

#### Example

```javascript
var arr = [
	{ ID: 1, Data: 'hello world' },
	{ ID: 2, Data: 'arrays are useful', Data2: 'dictionaries are good to' },
	{ ID: 2, Data: 'example'}
];
console.log(arr.toDict('ID'));
/*
 * { '1': { ID: 1, Data: 'hello world' },
 *   '2':
 *   [ { ID: 2,
 *       Data: 'arrays are useful',
 *       Data2: 'dictionaries are good to' },
 *     { ID: 2, Data: 'example' } ] } 
 */

 console.log(arr.toDict('Data'));
 /*
  * { 'hello world': { ID: 1, Data: 'hello world' },
  * 'arrays are useful':
  *  { ID: 2,
  *    Data: 'arrays are useful',
  *    Data2: 'dictionaries are good to' },
  * example: { ID: 2, Data: 'example' } }
  */

  console.log(arr.toDict('ID')[1]); //{ ID: 1, Data: 'hello world' }
  console.log(arr.toDict('Data').example); //{ ID: 2, Data: 'example' }
```

### Array.prototype.forEachCallback(callback, [end])
#### Description
Loops through each item in the array and waits (non blocking) for the callback before 
proceeding to the next item in the array.

#### Parameters
*callback* - function(item, next)
                 *item* - the current item in the array
			     *next* - call when finished to move to the next item in the array

*end* - function. Optional. Called when the for each loop is complete

#### Returns
No return value

#### example

```javascript
var arr = [
	{ ID: 1, Data: 'foo' },
	{ ID: 2, Data: 'bar' }
];

arr.forEachCallback(function(item, next) {
	db.someCallToDb(item, function(err, res) {
		next();
	});
}, function() {
	console.log('Loop complete notify client side');
});
```

### Array.prototype.execute([callback])
#### Description
Executes an array of functions in a semi-async manner. Does not execute
the callback untill all functions are complete. Each function in the array
accepts one variable that is a function to call when execution is complete.

Useful for when you want to make multiple calls to a database and not have
to wait for each one before executing the next.

Each function in the array is in the below format
```
function(done) {

}
```
Where done is the callback in the format function(err). If err is set other 
functions in the array may finish executing but no more are started and
execution drops straight out to the callback supplied in the execute call.

See example for details.

#### Parameters
*callback* - function(err). Optional. Called when all functions have finished execution.
                 *err* - set if there was an error returned from on of the 
				         functions in the array

#### Returns
No return value

#### Example

```javascript
[
	function(done) {
		console.log('function 1');
		done();
	},
	function(done) {
		done(new Error('Error at function 2'));
	},
	function(done) {
		console.log('function 3');
		done();
	}
].execute(function(err) {
	if(err) console.log(err);
	console.log('Execution complete');
});

/* outputs
 * function 1
 * function 3
 * [Error: Error at function 2]
 * Execution complete
 */
```