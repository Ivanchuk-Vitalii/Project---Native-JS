const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1, // текущий слайд, который показывается пользователю
        paused = false; // для того что б остановить autoplay в слайдере
    
        const items = document.querySelectorAll(slides);
    
    // перемещения слайдов вперед/назад
    function showSlides(n) {
        // когда слайды закончились, будет отображатся первый слайд
        if (n > items.length) {
            slideIndex = 1;
        }

        // если слайд отрицательный, будет отображаться последний слайд
        if (n < 1) {
            slideIndex = items.length;
        }

        // перебираем все слайды, показываем определенный слайд и скрываем остальные + добавляем класс анимимации в каждый слайд
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        // показываем нужный слайд, который пользователь хочет увидить
        items[slideIndex - 1].style.display = 'block';
    }

    // при первом открытии страницы пользователю будет показан первый слайд
    showSlides(slideIndex);

    // вызываем когда кликаем на определенные элементы, в n передаем -1 или 1, тоесть прелистываем назад либо вперед
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);
        
        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
    } catch (error) {}

    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function () {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 5000);
        } else {
            paused = setInterval(function () {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 5000);
        }
    }
    activateAnimation();

    // когда пользователь наводит курсор на слайдер, слайдер отключает автоматическое переключение слайдов и включает, когда курсор убирают 
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};

export default sliders;