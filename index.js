const clothes = {
    accessories: {
        z: 40,
        items: ['red-gloves'],
    },
    bottoms: {
        z: 50,
        items: ['black-jeans', 'black-shorts', 'blue-jeans', 'green-pants', 'plaid-skirt', 'purple-slacks', 'quilt-skirt'],
    },
    hats: {
        z: 90,
        items: ['green-cowboy', 'red-cowboy'],
    },
    outerwear: {
        z: 80,
        items: ['leather-jacket', 'rain-coat'],
    },
    shoes: {
        z: 30,
        items: ['black-heels', 'converse', 'cowboy-boots', 'orange-heels', 'pink-heels'],
    },
    socks: {
        z: 20,
        items: ['green-socks', 'pink-socks', 'white-socks', 'yellow-socks',],
    },
    sweaters: {
        z: 70,
        items: ['black-sweater', 'orange-sweater'],
    },
    tops: {
        z: 60,
        items: ['button-up', 'pink-jumpsuit', 'red-dress', 'torn-tank', 'yellow-blouse'],
    },
    underwear: {
        z: 10,
        items: ['black-tights', 'bralette', 'fishnets', 'orange-tights', 'purple-tights'],
    },
};

let cell = 0;

for (category in clothes) {
    clothes[category].items.forEach((item) => {
        let el = document.createElement('div');
        el.dataset.clothing = item;
        el.style.zIndex = clothes[category].z;

        let col = cell % 6;
        let row = (cell - col) / 6;
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
        cell++;
    });
}

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
