export function dispatchEvent(el, name, options = {}){
    const event = createEvent(name, options);
    return !el.dispatchEvent(event);
}

function createEvent(name, options = {}){
    if(window.Event){
        return new Event(name, options);
    }else{
        let event = document.createEvent('Event');
        event.initEvent(name, options.bubbles, options.cancelable);
    }
    return event;
}
