const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    // при скроле скрываем или показываем pageup
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // реализация плавного скрола 
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.15; // скорость прокрутки

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                // узнаем первый ли раз запускается анимация
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    // r - отвечает за количество пикселей на которые нам необходимо пролистать в течении этой анимации и в какую сторону
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    // скролим страницу к определенным координатам
                    document.documentElement.scrollTo(0, r);

                    // условие когда анимция должна остановится
                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                    // функция step будет сама себя рекурсивно запускать пока не выполнится ^ условие
            }
        }); 
    });
};

export default scrolling;