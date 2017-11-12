dom-data-filter
===

Install
---

`npm install dom-data-filter`

Usage
---

```javascript
import { DataFilter } from 'dom-data-filter';

let data = [
    'The Thing',
    'The Terminator',
    'Super man',
    'Legend of Sleepy Hollow',
    'The Shining',
    'Fifty Shades of Grey'
];

const df = new DataFilter('#test-list', {
    read(){
        //Empty the data, and push some data
        this.empty().push(...data);
    },
    render(data){
        //Return the HTML of each data member
        return `<li>${data}</li>`;
    }
});

let input = document.querySelector('input');
input.addEventListener('keyup', e=>{
    //Update the filter with a value
    df.update(input.value)
    .then(matched=>{});
});
input.addEventListener('keydown', e=>{
    if(e.keyCode === 9){
        //Change the value based on TAB input
        df.readNext(input.value, /[ ]+/)
        .then(val=>input.value = val);

        e.preventDefault();
        input.focus();
    }
});

```


API
---

A DataFilter instance comes with the API of mixins from these modules:

* [char-tree](https://github.com/hollowdoor/char_tree)
* [dom-toggle-mixin](https://github.com/hollowdoor/dom_toggle_mixin)

Any methods those mixins provide are also provided by an instance of `DataFilter()`.

Constructor
---------

```javascript
const df = new DataFilter('#test-list', {
    //The initial value
    value: '',
    //The visible style display
    display: 'block',
    //Should this instance of DataFilter "toggle"
    //the visual state automatically based on
    //the element having no children
    autoToggle: true,
    //toggle() is optional, and is used by the toggle mixin
    toggle(showing){

    }
    //read() is optional
    //read() is called before render
    //Return a Promise from read to
    //make render wait for reading
    read(){

    },
    render(data){
        //Return the HTML of each data member on update
        return `<li>${data}</li>`;
    }
});
```

Properties
-----

### df.value

The current value set from `df.update(value)`.

### df.element

The top level element set on the constructor.

### df.autoToggle

A boolean set to true for auto toggling. False otherwise.

Methods
-----

### df.update(value)

Update the value for the filter. `df.update()` returns a Promise that resolves to an array of all values that matched `value`.

### df.readNext(value, separator)

Update the value, and modify the value based on a separator. This works like the well known feature of TAB completion.

`df.readNext()` returns a promise that resolves to the the modified value.

About
---

This module filters an array of items based on the algorithms for trie structures; mostly by using the [char-tree](https://github.com/hollowdoor/char_tree) module.

`dom-data-filter` should pair well with [dom-arrow-select](https://github.com/hollowdoor/dom_arrow_select) as an auto-complete solution.
