# SearchLite

An easy object search library. It allows scanning objects regardless of their type for properties that match the search criteria.

```javascript
    const { searchLite } = require("searchLite");
```

## find(myIterable, myProperty, valueToCompare)

```javascript
    function findStuff(myIterable, myProperty, valueToCompare){
        const search = searchlite.find(myIterable, myProperty, valueToCompare);
        if (search.wasSuccess()) {
            return search.result;
        }
    }
```
The return value of find is a `SearchResult`.

    class SearchResult {
        count { Number }
        result { Any }
    }

If the search was a failed search, then `count = -1` and `result = {}`

## list(myIterable, myProperty, valueToCompare)

This is the recursive search function it works like find(), but `count` returns the amount of objects found and returns them as a list in the `result` property.

## splice(myIterable, valueToCompare)

Splices a unique Object from an Array. Returns `false` if it removed nothing.

## remove(myIterable, myProperty, valueToCompare)