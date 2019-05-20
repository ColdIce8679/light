let timer = null;
let timer2 = null;
window.onload = () => {
    const HEIGHT = window.innerHeight / 2;
    const WIDTH = window.innerWidth;

    const h_count = Math.floor(HEIGHT / 150);
    const w_count = Math.floor(WIDTH / 200) + 1;

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

    const c = [];
    let key = 0;
    clearInterval(timer);
    clearInterval(timer2);
    let in_c = [];
    timer = setInterval(function() {
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
            if (c.length !== 0) test = c[Math.floor(Math.random() * (c.length))];

            if (online.indexOf(test.toString()) === -1) {
                circleDIV.innerHTML = test;
                break;
            } else {
                if (online.length === c.length) break;
            }
        }

        if (first) {
            if (circleDIV.innerHTML !== '') {
                modalDiv.appendChild(circleDIV);
                online.unshift(circleDIV.innerHTML);
                first = false;
            }
        } else {
            if (circleDIV.innerHTML !== '') {
                if (x === 4) {
                    modalDiv.removeChild(modalDiv.lastChild);
                    online.pop();
                } else {
                    x += 1;
                }
                online.unshift(circleDIV.innerHTML);
                modalDiv.insertBefore(circleDIV, modalDiv.childNodes[0]);
            }
        }
    }, 10000);

    let check = '';
    let str_data = '';
    window.addEventListener("keydown", (e) => {
        if (check === '') {
            // first  
            check = e.key;
        } else {
            // 塞資訊
            if (e.key !== 'Shift' && e.key !== 'Clear' && e.key !== ' ' && e.key !== 'Enter') {
                str_data += e.key;
            }

            if (check === 'Clear' && e.key === 'Clear') {
                console.log(str_data, c.indexOf(str_data))
                if (c.indexOf(str_data) === -1) {
                    c.push(str_data);
                } else {
                    const circleDIV = document.createElement('div');
                    circleDIV.className = 'child';
                    circleDIV.innerHTML = str_data;
                    if (online.indexOf(str_data) == -1) {
                        if (first) {
                            if (circleDIV.innerHTML !== '') {
                                modalDiv.appendChild(circleDIV);
                                online.unshift(circleDIV.innerHTML);
                                first = false;
                            }
                        } else {
                            if (circleDIV.innerHTML !== '') {
                                if (x === 4) {
                                    modalDiv.removeChild(modalDiv.lastChild);
                                    online.pop();
                                } else {
                                    x += 1;
                                }
                                online.unshift(circleDIV.innerHTML);
                                modalDiv.insertBefore(circleDIV, modalDiv.childNodes[0]);
                            }
                        }
                    }
                }
                str_data = '';
                check = '';
            } else if (check >= 0 && check <= 9 && e.key === 'Enter') {
                console.log(`${check}${str_data}`, c.indexOf(`${check}${str_data}`))
                if (c.indexOf(`${check}${str_data}`) === -1) {
                    c.push(`${check}${str_data}`);
                } else {
                    const circleDIV = document.createElement('div');
                    circleDIV.className = 'child';
                    circleDIV.innerHTML = `${check}${str_data}`;
                    if (online.indexOf(`${check}${str_data}`) == -1) {
                        if (first) {
                            if (circleDIV.innerHTML !== '') {
                                modalDiv.appendChild(circleDIV);
                                online.unshift(circleDIV.innerHTML);
                                first = false;
                            }
                        } else {
                            if (circleDIV.innerHTML !== '') {
                                if (x === 4) {
                                    modalDiv.removeChild(modalDiv.lastChild);
                                    online.pop();
                                } else {
                                    x += 1;
                                }
                                online.unshift(circleDIV.innerHTML);
                                modalDiv.insertBefore(circleDIV, modalDiv.childNodes[0]);
                            }
                        }
                    }
                }
                str_data = '';
                check = '';
            }
        }
    });
}