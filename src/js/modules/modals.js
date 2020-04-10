// Появление/исчезания модульных окон и появление их через определенное время
const modals = () => {
    let btnPressed = false; // переменная, которая следит за тем, была ли нажата хоть одна кнопка

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        // появление модельного окна
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;
                
                // для значка подарка, который удаляется при клике на него
                if (destroy) {
                    item.remove();
                }
                // перебирает все модельные окна и скрывает их
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        //закрытие модельного окна при нажатии на крестик
        close.addEventListener('click', () => {
            // закрытие всех модельных окон при клике на крестик
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = ``;
        });

        //закрытие модельного окна при нажатии на подложку
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                // закрытие всех модельных окон при клике на подложку
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = ``;
            }
        });
    }

    //появление модельного окна через определенное время
    function showModalByTime(selector, time) {
        setTimeout(function () {
            let display;

            // перебираем все модельные окна и если хотя бы одно окно открыто, записываем в display block, таким образом переменная display будет true
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });
            // если не одно окно не открыто, таким образом display false, то открываем окно через определенное время
            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    // вычисляем и скрываем скролл при открытии модульного окна
    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    // открытие подарка, когда пользователь долистал до конца страницы
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            // вычисляем не нажата ли была какая-нибуть кнопка + ловим скролл в конце страници (сколько пользователь пролистал вниз + контент который видет пользователь >= полной высоты страницы)
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            } 
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');

    // showModalByTime('.popup-consultation', 5000);
};

export default modals;