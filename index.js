// The standard that defines HTML is called the Document Object Model, so often
// we refer to the entire HTML page and all its nodes as 'the DOM'

// Here I'm just finding the DOM node for the shirt and the skirt and assigning
// them to variables so they're easier to use later
// You probably know what IDs are from HTML, and 'document' is a shortcut for the
// whole HTML of the current page.
// getElementById does exactly what you'd think :P
let shirt = document.getElementById('shirt');
let skirt = document.getElementById('skirt');

// DOM nodes have 'events' that you can attach certain behaviour to, 'onmousedown'
// is one of them. Here I'm defining a function that will run every time you
// 'mouse down' on the shirt--in this case, that means every time you click
// or tap. The 'event' will be passed into this function, so every
// time the event happens you will have access to some information about it
// (for example, *where* the click was on the page)
shirt.onmousedown = function (event) {
    // This is to fix something weird where the shirt moves as soon as you click
    // on it--we're basically figuring out where *inside* the shirt you clicked.
    // We define two variables to use later, one for the X coordinate and
    // another for the Y coordinate. Here we use that handy 'event' to figure
    // out exactly where you clicked, and 'getBoundingClientRect()' to find out
    // where on the page the shirt was already, and we get the difference
    // to find out where on the shirt you clicked. All these X and Y values are
    // counted in pixels, starting in the top left corner
    let shiftX = event.clientX - shirt.getBoundingClientRect().left;
    let shiftY = event.clientY - shirt.getBoundingClientRect().top;

    // We can also use JavaScript to get and set CSS properties on DOM nodes.
    // Here we set the shirt to have `position: absolute` so we can move it around
    // independently of everything else, and `z-index: 1000` so it's on
    // top when we're dragging it
    shirt.style.position = 'absolute';
    shirt.style.zIndex = 1000;

    // Here we define another function to move the shirt for us. It takes an X
    // coordinate and Y coordinate, and it sets the shirt to be positioned that
    // far from the 'left' and 'top' of the page (minus the distance from the
    // edge of the shirt to where we clicked, so it doesn't jump around)
    // We're adding 'px' at the end because the CSS values always have to
    // include units. `+` can add numbers and it can also combine strings together,
    // so `x - shiftX + 'px'` will subtract `shiftX` from `x`, and then take that
    // number and add the 'px' units onto the end
    function moveTo(x, y) {
        shirt.style.left = x - shiftX + 'px';
        shirt.style.top = y - shiftY + 'px';
    }

    // This function basically just takes a DOM event and the uses
    // its X and Y coordinate to move the shirt
    function onMouseMove(event) {
        moveTo(event.pageX, event.pageY);
    }

    // Here's where it gets interesting :) we're still inside the 'onmousedown'
    // event, which means at this point you have only just clicked 'down' on the shirt.
    // Now, we add another listener, this time for 'mousemove', on the
    // 'document', which is the whole page--so this listener will tell us
    // whenever you *move* your mouse anywhere at all. We pass it the name of a function
    // to call every time the event happens--so whenever you move your mouse now,
    // the 'onMouseMove' function above will get called, which will call 'moveTo'
    // and move the shirt. These events happen so quickly that it seems smooth--
    // as you move your mouse the functions above are getting called over and
    // over and updating the position of the shirt to the new position of your
    // mouse
    document.addEventListener('mousemove', onMouseMove);

    // You're still holding your mouse down and dragging here, but we also want
    // to allow you to let go of the shirt--so we set up yet another listener
    // for 'mouseup', on the shirt DOM node, meaning you 'unclicked' the shirt,
    // or let go of it
    shirt.onmouseup = function () {
        // As soon as you let go of the shirt, we stop listening to your mouse
        // moving, which means we'll stop calling the functions above, and stop
        // moving the shirt. Without this, as soon as you clicked on the shirt
        // the first time it would stay attached to your mouse no matter how much
        // you clicked or unclicked. Try it! Comment out this line, give the
        // page a second to reload, and try to move the shirt...
        document.removeEventListener('mousemove', onMouseMove);

        // Once that's done, we also cancel out the 'onmouseup' listener that
        // we're still inside, just to clean up...
        shirt.onmouseup = null;
    };

    // And now the main 'onmousedown' event, that start it all, is over!
    // Next time you click 'down' on the shirt, this entire process of
    // figuring out where you clicked, adding listeners to your mouse moving,
    // updating the shirt's position, and letting go when you unclick will run
    // all over again
};

// And here we do it all again for the skirt!
skirt.onmousedown = function (event) {
    let shiftX = event.clientX - skirt.getBoundingClientRect().left;
    let shiftY = event.clientY - skirt.getBoundingClientRect().top;

    skirt.style.position = 'absolute';
    skirt.style.zIndex = 1000;

    function moveTo(x, y) {
        skirt.style.left = x - shiftX + 'px';
        skirt.style.top = y - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveTo(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    skirt.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        skirt.onmouseup = null;
    };
};

// Here we're just overriding the 'ondragstart' event and making it do nothing,
// because otherwise it interferes with what we did above
shirt.ondragstart = function () {
    return false;
}

// This is an ES6 arrow function... sexy right? ;)
skirt.ondragstart = () => false;
