import { DataFilter } from '../';
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
        this.empty().push(...data);
    },
    toggle(showing){
        console.log('showing ', showing);
    },
    render(data){
        return `<li>${data}</li>`;
    }
});

df.element.addEventListener('beforetoggled', e=>{
    console.log('beforetoggled event');
});

df.element.addEventListener('toggled', e=>{
    console.log('toggled event');
});

let input = document.querySelector('input');
input.addEventListener('keyup', e=>{
    df.update(input.value)
});
input.addEventListener('keydown', e=>{
    if(e.keyCode === 9){
        df.readNext(input.value, /[ ]+/)
        .then(val=>input.value = val);

        e.preventDefault();
        input.focus();
    }
});
