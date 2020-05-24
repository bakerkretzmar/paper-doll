const clothes = ['black-jeans', 'black-heels', 'black-shorts', 'black-sweater', 'black-tights', 'blue-jeans', 'bralette', 'button-up', 'converse', 'cowboy-boots', 'fishnets', 'green-cowboy', 'green-pants', 'green-socks', 'leather-jacket', 'orange-heels', 'orange-sweater', 'orange-tights', 'pink-heels', 'pink-jumpsuit', 'pink-socks', 'plaid-skirt', 'purple-slacks', 'purple-tights', 'quilt-skirt', 'rain-coat', 'red-cowboy', 'red-dress', 'red-gloves', 'torn-tank', 'white-socks', 'yellow-blouse', 'yellow-socks'];

clothes.forEach((item, i) => {
    let el = document.createElement('div');
    el.dataset.clothing = item;

    let col = i % 6;
    let row = (i - col) / 6;
    el.style.position = 'absolute';
    el.style.left = `${2 + 8 * col}rem`;
    el.style.top = `${2 + 10 * row}rem`;

    let img = document.createElement('img');
    if (['leather-jacket', 'rain-coat', 'red-gloves'].includes(item)) {
        img.classList.add('five-eighths-doll-width', 'w-24');
    } else {
        img.classList.add('half-doll-width', 'w-20');
    }
    img.classList.add('select-none')
    img.src= `./img/${item}.png`;

    el.appendChild(img);
    document.body.appendChild(el);
});

const dollArea = document.getElementById('doll-area');

document.querySelectorAll('[data-clothing]').forEach((item) => {
    item.ondragstart = () => false;
    item.ondragend = () => false;

    item.onmousedown = (event) => {
        item.classList.add('active');
        let offsetX = event.clientX - item.getBoundingClientRect().left;
        let offsetY = event.clientY - item.getBoundingClientRect().top;

        let onMove = (event) => {
            item.style.left = event.pageX - offsetX + 'px';
            item.style.top = event.pageY - offsetY + 'px';
        };

        document.addEventListener('mousemove', onMove);
        document.onmouseup = (event) => {
            document.removeEventListener('mousemove', onMove);
            // if (event.clientX < dollArea.getBoundingClientRect().left) {
            //     // If the item was dropped in the clothes area, put it away
            //     // undo sizing
            //     item.style.position = 'relative';
            // }
        }
    };
});
