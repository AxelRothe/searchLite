# SearchLite

An easy object search library. It allows scanning objects regardless of their type for properties that match the search criteria.

```javascript
const { searchLite } = require("searchLite");
```

## find(myIterable, myProperty, valueToCompare)

This method will find and return the first element that matches the search criteria.

```javascript
function findStuff(myIterable, myProperty, valueToCompare){
    const search = searchlite.find(myIterable, myProperty, valueToCompare);
    if (search.success) {
        return search.result;
    } else if (search.failure) {
        //do something
    }
}
```
The return value is a `SearchResult`.

```typescript
class SearchResult {
    count : Number;
    result : any;
}
```

If the search was a **failed** search, then SearchResult will be structured as follows:

```typescript
SearchResult = {
    count : -1,
    result : {}
}
```

## list(myIterable, myProperty, valueToCompare)

This method will return a list of results and the count of elements that matched the search criteria.

```typescript
class SearchResult {
    count : Number; //number of results
    result : Array<any>; //list of results
}
```

##update(myIterable, myProperty, myNewData)

This method will update the first element that matches the search criteria with the new properties.

```javascript

const myIterable = [
	{id:1, bar: 'fooA'},
	{id:2, bar: 'fooB'},
	{id:3, bar: 'fooC'},
]

searchLite.update({
    myIterable,
    "id",
    {
        id: 1,
        bar : 'fooZ'
    }
});
```
Resulting in:

```
/*

myIterable 
[
    {id:1, bar: 'fooZ'},
    {id:2, bar: 'fooB'},
    {id:3, bar: 'fooC'},
]
*/

```

## splice(myIterable, valueToCompare)

This method removes the first element from an Array and returns the new Array.

## remove(myIterable, myProperty, valueToCompare)

This method will remove any first element from an Iterable that matches the search criteria.

## removeAll()