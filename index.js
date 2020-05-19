document.querySelectorAll('[data-clothing]').forEach((item) => {
    item.ondragstart = () => false;
    item.ondragend = () => false;

    item.onmousedown = (event) => {
        let offsetX = event.clientX - item.getBoundingClientRect().left;
        let offsetY = event.clientY - item.getBoundingClientRect().top;

        let onMove = (event) => {
            item.style.left = event.pageX - offsetX + 'px';
            item.style.top = event.pageY - offsetY + 'px';
        };

        document.addEventListener('mousemove', onMove);
        document.onmouseup = () => document.removeEventListener('mousemove', onMove);
    };
});
