let timer = null;
let timer2 = null;
window.onload = () => {
    const HEIGHT = window.innerHeight / 2;
    const WIDTH = window.innerWidth;

    const h_count = Math.floor(HEIGHT / 100);
    const w_count = Math.floor(WIDTH / 110) + 1;

    let ball_key = 0;
    let fixW = (WIDTH - (w_count * 100)) / (w_count + 1);
    let fixH = (HEIGHT - (h_count * 100)) / (h_count + 1);
    for (let i = 0; i < h_count; i += 1) {
        for (let j = 0; j <= w_count; j += 1) {
            const circleDIV = document.createElement('div');
            circleDIV.className = 'circle';
            circleDIV.id = ball_key;
            ball_key += 1;
            circleDIV.style.left = j * 100 + fixW * j + 'px';
            circleDIV.style.top = i * 100 + HEIGHT + fixH * (i + 1) + 'px';
            document.querySelector('.light').appendChild(circleDIV);
        }
    }

    const data = 'a b c d e f g h i j k l';
    var c = data.split(' ');
    var key = 0;
    clearInterval(timer);
    clearInterval(timer2);
    let in_c = [];
    timer = setInterval(function () {
        var speed = 0.5;
        const odiv = document.querySelectorAll('.circle');

        for (let i = 0; i < odiv.length; i += 1) {
            if (odiv[i].offsetLeft >= window.innerWidth) {
                odiv[i].style.left = '-100px';

                if (odiv[i].innerHTML !== '') {
                    in_c.pop();
                    odiv[i].innerHTML = '';
                }

                if (c.length !== key) {
                    if (in_c.indexOf(c[key]) === -1) {
                        odiv[i].innerHTML = c[key];
                        in_c.unshift(c[key])
                    }
                    key += 1
                } else {
                    key = 0
                }
            } else {
                odiv[i].style.left = odiv[i].offsetLeft + speed + 'px';
            }
        }
    }, 25);

    let first = true;
    const modalDiv = document.querySelector('.modal');
    let x = 0;
    const online = [];
    timer2 = setInterval(() => {
        const circleDIV = document.createElement('div');
        circleDIV.className = 'child';
        let test = '';
        while (true) {
            test = c[Math.floor(Math.random() * (c.length)) + 1];
            if (online.indexOf(test.toString()) === -1) {
                circleDIV.innerHTML = test;
                break;
            } else {
                if (online.length >= c.length) {
                    circleDIV.innerHTML = '';
                    break;
                }
            }
        }

        if (first) {
            modalDiv.appendChild(circleDIV);
            online.unshift(circleDIV.innerHTML);
            first = false;
        } else {
            if (x === 4) {
                modalDiv.removeChild(modalDiv.lastChild);
                online.pop();
            } else {
                x += 1;
            }
            online.unshift(circleDIV.innerHTML);
            modalDiv.insertBefore(circleDIV, modalDiv.childNodes[0]);
        }
    }, 10000);

    var key_pressed = {};
    window.addEventListener("keyup", (e) => {
        key_pressed[e.key] = false;
    });
    window.addEventListener("keydown", (e) => {
        key_pressed[e.key] = true;
    });

    // setInterval(() => {
    //     let check = false;
    //     for (var key in key_pressed) {
    //         if(key_pressed[key] === 'space'){
    //             check = true;
    //         }
    //         if (key_pressed[key]) {
    //             console.log(key + " is down");
    //         }
    //     }
    // }, 50);
}