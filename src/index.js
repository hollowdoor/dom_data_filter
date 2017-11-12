import { charTreeMixin } from 'char-tree';
import getElement from 'dom-get-element';
import { toggleMixin } from 'dom-toggle-mixin';

export class DataFilter {
    constructor(element, {
        value = '',
        display = 'block',
        read = null,
        toggle = null,
        autoToggle = true,
        render = function(v){ return v + ''; }
    } = {}){

        this.element = getElement(element);
        this.value = value;
        this.autoToggle = autoToggle;
        this.initCharTree();
        this.initToggle({display, toggle});

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
    }
    update(value){
        return this._read().then(()=>{
            const el = this.element;
            const found = this.findAll(value);
            this.value = value;

            el.innerHTML = '';
            found.forEach(data=>{
                let html = this._render(data);
                el.insertAdjacentHTML(
                    'beforeend',
                    html
                );
            });

            if(this.autoToggle)
                return this.toggle(found.length).then(()=>found);
            return found;
        });
    }
    readNext(value, sep){
        return this.update(value)
        .then(found=>{
            return this.nextPhrase(value, sep)
            .then(val=>(this.value = val));
        });
    }
}

charTreeMixin(DataFilter.prototype);
toggleMixin(DataFilter.prototype);
