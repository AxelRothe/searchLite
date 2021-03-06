/**
 * This is because I'm tired of writing for loops
 *
 * Author: Axel Rothe (c) 2021
 */

class SearchResult {
    count;
    result;

    constructor(count, result) {
        this.count = count;
        this.result = result;
    }

    get success(){
        return this.wasSuccess()
    }

    wasSuccess() {
        return this.count >= 0;
    }

    get failure(){
        return this.wasFailure()
    }

    wasFailure() {
        return this.count === -1;
    }
}

class SearchLite {
    /**
     * Inits Searchlight
     *
     * @param {Boolean} debug defaults to false, prints logs if true
     */
    constructor(debug = false) {
        this.debug = debug;
    }

    /**
     * Finds an object in an array or iterable object and returns an object containing the result and position it was found at.
     *
     * @param {Array|Object}  array     An Array or an Object that is iterable
     * @param {String}        property  the name of the property
     * @param {String|Object} compare   the object or string to compare to
     * @param {Object}        options   A dictionary of options: {reverse: Boolean}
     *
     * @return {SearchResult}
     */
    find(array, property, compare, options = null) {
        let counter = 0;

        let startPos = 0;
        let endPos = array.length;

        if (options !== null && options.reverse === true) {
            const t = startPos;
            startPos = endPos - 1;
            endPos = t;

            for (let i = startPos; i > endPos; i--) {
                if (array[i].hasOwnProperty(property) && array[i][property] === compare) {
                    this.log("Successful Search", {
                        property: property,
                        compareElem: compare,
                        array: array,
                    });
                    return new SearchResult(counter, array[i]);
                }
                counter++;
            }
        } else {
            for (let i = startPos; i < endPos; i++) {
                if (array[i].hasOwnProperty(property) && array[i][property] === compare) {
                    this.log("Successful Search", {
                        property: property,
                        compareElem: compare,
                        array: array,
                    });
                    return new SearchResult(counter, array[i]);
                }
                counter++;
            }
        }
        this.log("Failed Search", {
            property: property,
            compareElem: compare,
            array: array,
        });
        return new SearchResult(-1, {});
    }

    findAsync(array, property, compare, options = null) {
        return new Promise((resolve, reject) => {
            resolve(this.find(array, property, compare, options))
        })
    }

    update(array, property, compare, options = null) {
        let search = this.find(array, property, compare[property], options);
        if (search.wasSuccess()) {
            search.result = Object.assign(search.result, compare);
            return true;
        } else if (search.wasFailure()) {
            if (array instanceof Array) {
                array.push(compare);
                return true;
            }
            if (array instanceof Set) {
                array.add(compare);
                return true;
            }
            if (array instanceof Object) {
                array[compare[property]] = compare;
                return true;
            }
            return false;
        }
    }

    updateAll(array, property, compare, options = null){
        let search = this.list(array, property, compare[property], options);

        for (let searchResult of search.result) {
            searchResult = Object.assign(search.result, compare);
        }
        return search.result
    }

    /**
     * Removes an object from the array, it does not remove it from the stack
     *
     * @param {Array|Object}  array     An Array or an Object that is iterable
     * @param {String}        property  the name of the property
     * @param {String|Object} compare   the object or string to compare to
     * @param {Object}        options   A dictionary of options, currently not implemented
     *
     * @return {Boolean}                True if found and removed, false if not found
     */
    remove(array, property, compare, options = null) {
        const res = this.find(array, property, compare, options);
        if (res.count !== -1) {
            array.splice(res.count, 1);
            return true;
        } else {
            return false;
        }
    }

    removeAll(array, property, compare) {
        if (this.remove(array, property, compare)) {
            this.removeAll(array, property, compare);
        } else {
            return true;
        }
    }

    splice(array, compare) {
        let indexOfElem = array.indexOf(compare);
        if (indexOfElem >= 0) {
            array.splice(indexOfElem, 1);
            return true;
        }
        return false;
    }

    count(array, property, compare){
        return this.list(array, property, compare);
    }

    list(array, property, compare) {
        let counter = 0;
        let resultList = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty(property) && array[i][property] === compare) {
                resultList.push(array[i]);
                counter++;
            }
        }
        if (counter > 0) {
            return new SearchResult(counter, resultList);
        } else {
            this.log("Failed Search", {
                property: property,
                compareElem: compare,
                array: array,
            });
            return new SearchResult(-1, {});
        }
    }

    contains(array, item){
        return array.indexOf(item) >= 0;
    }

    toggle(array, item){
        if (this.contains(array, item)){
            for (let i=0; i<array.length; i++){
                if (array[i] === item){
                    array.splice(i,1);
                    break;
                }
            }
        } else {
            array.push(item);
        }
    }

    /**
     * Logs for development purposes
     *
     * @param {Object} message  the message can be anything, if its a object it is displayed in the object viewer
     * @param {Object} object   the object is default undefined, set it if you need a title and a object viewer
     */
    log(message, object = undefined) {
        if (this.debug) {
            if (object) {
                console.log("SEARCHLIGHT: " + message, object);
            } else {
                console.log("SEARCHLIGHT: ", message);
            }
        }
    }
}

/*
Export Searchlight Module
 */
module.exports = new SearchLite(false);
