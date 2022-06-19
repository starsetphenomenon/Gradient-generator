let firstColor = document.getElementById('firstColor');
let secondColor = document.getElementById('secondColor');
let gradient = document.getElementById('gradient');
let directions = document.getElementById('directions');
let randomColor = document.getElementById('randomColor');
let getCode = document.getElementById('getCode');
gradient.style.background = `linear-gradient(to top left,#657bec, #ff7300)`;
let linear = document.getElementById('linear');
let radial = document.getElementById('radial');
let heading = document.getElementById('heading');
let arrows = document.getElementsByClassName('arrow_wrapper');
let activeArrow = 'bottom right';
let hex = document.getElementById('hex');
let rgb = document.getElementById('rgb');


const onInputColor = function () {
    if (linear.classList.contains('active')) {
        gradient.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    } else if (radial.classList.contains('active')) {
        gradient.style.background = `radial-gradient(at ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    }
    heading.style.background = `-webkit-linear-gradient(${firstColor.value}, ${secondColor.value})`;
};

const onDirection = function (e) {
    if (e.target.classList.contains('arrow_wrapper')) {
        if (document.querySelector('active-direction') === null) {
            Array.from(arrows).forEach(elem => elem.classList.remove('active-direction'));
        }
        e.target.classList.add('active-direction');
        activeArrow = e.target.getAttribute('name');
        if (linear.classList.contains('active')) {
            gradient.style.background = `linear-gradient(to ${e.target.getAttribute('name')}, ${firstColor.value}, ${secondColor.value})`;
        } else if (radial.classList.contains('active')) {
            gradient.style.background = `radial-gradient(at ${e.target.getAttribute('name')}, ${firstColor.value}, ${secondColor.value})`;
        }
        heading.style.background = `-webkit-linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    }
};

const generateRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const onRandom = function () {
    let randomFirstColor = generateRandomColor();
    let randomSecondColor = generateRandomColor();
    let randomDirection = directions.children[Math.floor(Math.random() * directions.childElementCount)].getAttribute('name');
    if (linear.classList.contains('active')) {
        gradient.style.background = `linear-gradient(to ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;
    } else {
        gradient.style.background = `radial-gradient(at ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;

    }
    heading.style.background = `linear-gradient(to ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;
    firstColor.value = `${randomFirstColor}`;
    secondColor.value = `${randomSecondColor}`;
};

const HexToRgb = function (c) {
    let a = c.split('');
    let r = parseInt(a[1] + a[2], 16);
    let g = parseInt(a[3] + a[4], 16);
    let b = parseInt(a[5] + a[6], 16);
    result = `rgba(${r}, ${g}, ${b}, 1)`;
    return result;
};

const onCopy = function () {
    if (linear.classList.contains('active')) {
        navigator.clipboard.writeText(`
        background: ${
            firstColor.value
        };
        background: ${
            gradient.style.background
        };
        background: -webkit - ${
            gradient.style.background
        };
        background: -moz - ${
            gradient.style.background
        };
        `);
    } else {
        navigator.clipboard.writeText(`
        background: ${
            firstColor.value
        };
        background: ${
            gradient.style.background
        };
        background: -webkit - ${
            gradient.style.background
        };
        background: -moz - ${
            gradient.style.background
        };
        `);
    }
    getCode.innerText = 'COPIED';
    setTimeout(() => {
        getCode.innerText = 'Get CSS';
    }, 1500);
};


const onLinear = function () {
    gradient.style.background = `
        linear - gradient(to $ {
            activeArrow
        }, $ {
            firstColor.value
        }, $ {
            secondColor.value
        })
        `;
    linear.classList.add('active');
    radial.classList.remove('active');
};

const onRadial = function () {
    gradient.style.background = `
        radial - gradient(at $ {
            activeArrow
        }, $ {
            firstColor.value
        }, $ {
            secondColor.value
        })
        `;
    radial.classList.add('active');
    linear.classList.remove('active');
};

const onHex = function () {
    hex.classList.add('active');
    rgb.classList.remove('active');
};

const onRgb = function () {
    rgb.classList.add('active');
    hex.classList.remove('active');
};

hex.addEventListener('click', onHex);
rgb.addEventListener('click', onRgb);
linear.addEventListener('click', onLinear);
radial.addEventListener('click', onRadial);
getCode.addEventListener('click', onCopy);
randomColor.addEventListener('click', onRandom);
directions.addEventListener('click', onDirection);
firstColor.addEventListener('input', onInputColor);
secondColor.addEventListener('input', onInputColor);