import getElement from 'dom-get-element';
import { dispatchEvent } from './dispatch_event.js';

export function toggleMixin(dest){

    dest.initToggle = function({
        toggle = null,
        display = 'block',
        element = null
    } = {}){
        this._toggle = toggle;
        this._display = display;
        if(element)
            this.element = getElement(element);
    };

    dest.toggleDisplay = function(show){
        return toggleDisplay(this, show, this._display);
    };

    dest.toggle = function(show){
        if(yesToggle(this, show)){

            const cancelled = dispatchEvent(this.element, 'beforetoggled', {"bubbles":false, "cancelable":true});

            if(cancelled){
                return Promise.resolve(getDisplay(this.element) !== 'none');
            }

            if(!this._toggle){
                return Promise.resolve(
                    this.toggleDisplay(show)
                );
            }

            return Promise.resolve(this._toggle.call(this, !!show))
            .then(()=>this.toggleDisplay(show));
        }

        return Promise.resolve(getDisplay(this.element) !== 'none');
    };
}

function yesToggle(that, show){

    if(show === void 0) return true
    {
        const display = getDisplay(that.element);
        return (
            show && display === 'none'
            ||
            !show && display !== 'none'
        );
    };
}

function toggleDisplay(that, show, display){
    if(show === void 0){
        const current = getDisplay(that.element);
        that.element.style.display = (
            display = current === 'none'
            ? display : 'none'
        );

        show = display !== 'none';
    }else{
        that.element.style.display = show ? display : 'none';
    }

    dispatchEvent(that.element, 'toggled', {"bubbles":false});

    return show;
}

function getDisplay(el){
    if(!el.style.display){
        const style = window.getComputedStyle(el, null);
        return style.display;
    }else{
        return el.style.display;
    }
}



export class Toggler {
    constructor(element, {
        toggle = null,
        display = 'block'
    } = {}){
        this.initToggle({toggle, display, element});
    }
}

toggleMixin(Toggler.prototype);
