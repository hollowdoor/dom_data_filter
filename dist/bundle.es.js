import { charTreeMixin } from 'char-tree';
import getElement from 'dom-get-element';
import { toggleMixin } from 'dom-toggle-mixin';

var DataFilter = function DataFilter(element, ref){
    if ( ref === void 0 ) ref = {};
    var value = ref.value; if ( value === void 0 ) value = '';
    var display = ref.display; if ( display === void 0 ) display = 'block';
    var read = ref.read; if ( read === void 0 ) read = null;
    var toggle = ref.toggle; if ( toggle === void 0 ) toggle = null;
    var autoToggle = ref.autoToggle; if ( autoToggle === void 0 ) autoToggle = true;
    var render = ref.render; if ( render === void 0 ) render = function(v){ return v + ''; };


    this.element = getElement(element);
    this.value = value;
    this.autoToggle = autoToggle;
    this.initCharTree();
    this.initToggle({display: display, toggle: toggle});

    if(autoToggle){
        this.toggleDisplay(this.element.children.length);
    }

    if(typeof read === 'function'){
        this._read = function(){
            return Promise.resolve(read.call(this));
        };
    }else{
        this._read = function(){
            return Promise.resolve();
        };
    }

    if(typeof render !== 'function'){
        throw new TypeError(render + ' is not a function.');
    }

    this._render = render;
};
DataFilter.prototype.update = function update (value){
        var this$1 = this;

    return this._read().then(function (){
        var el = this$1.element;
        var found = this$1.findAll(value);
        this$1.value = value;

        el.innerHTML = '';
        found.forEach(function (data){
            var html = this$1._render(data);
            el.insertAdjacentHTML(
                'beforeend',
                html
            );
        });

        if(this$1.autoToggle)
            { return this$1.toggle(found.length).then(function (){ return found; }); }
        return found;
    });
};
DataFilter.prototype.readNext = function readNext (value, sep){
        var this$1 = this;

    return this.update(value)
    .then(function (found){
        return this$1.nextPhrase(value, sep)
        .then(function (val){ return (this$1.value = val); });
    });
};

charTreeMixin(DataFilter.prototype);
toggleMixin(DataFilter.prototype);

export { DataFilter };
//# sourceMappingURL=bundle.es.js.map
