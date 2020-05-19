// let shirt = document.getElementById('shirt');
// let skirt = document.getElementById('skirt');

let body = document.getElementById('doll-body');
let clothes = document.querySelectorAll('[data-clothing]');

clothes.forEach((item) => {
    console.log(item.dataset.clothing);

    item.ondragstart = () => false;

    item.onmousedown = (event) => {
        let offsetX = event.clientX - item.getBoundingClientRect().left;
        let offsetY = event.clientY - item.getBoundingClientRect().top;

        let moveTo = (x, y) => {
            item.style.left = x - offsetX + 'px';
            item.style.top = y - offsetY + 'px';
        }

        let onMove = (event) => moveTo(event.pageX, event.pageY);

        document.addEventListener('mousemove', onMove);

        item.onmouseup = (event) => {
            item.onmouseup = null;
            document.removeEventListener('mousemove', onMove);
        }
    };
});

// shirt.onmousedown = function (event) {
//     let shiftX = event.clientX - shirt.getBoundingClientRect().left;
//     let shiftY = event.clientY - shirt.getBoundingClientRect().top;

//     shirt.style.position = 'absolute';
//     shirt.style.zIndex = 1000;

//     function moveTo(x, y) {
//         shirt.style.left = x - shiftX + 'px';
//         shirt.style.top = y - shiftY + 'px';
//     }

//     function onMouseMove(event) {
//         moveTo(event.pageX, event.pageY);
//     }

//     document.addEventListener('mousemove', onMouseMove);

//     shirt.onmouseup = function () {
//         document.removeEventListener('mousemove', onMouseMove);

//         shirt.onmouseup = null;
//     };

// };

// skirt.onmousedown = function (event) {
//     let shiftX = event.clientX - skirt.getBoundingClientRect().left;
//     let shiftY = event.clientY - skirt.getBoundingClientRect().top;

//     skirt.style.position = 'absolute';
//     skirt.style.zIndex = 1000;

//     function moveTo(x, y) {
//         skirt.style.left = x - shiftX + 'px';
//         skirt.style.top = y - shiftY + 'px';
//     }

//     function onMouseMove(event) {
//         moveTo(event.pageX, event.pageY);
//     }

//     document.addEventListener('mousemove', onMouseMove);

//     skirt.onmouseup = function () {
//         document.removeEventListener('mousemove', onMouseMove);
//         skirt.onmouseup = null;
//     };
// };

// shirt.ondragstart = () => false;
// skirt.ondragstart = () => false;
