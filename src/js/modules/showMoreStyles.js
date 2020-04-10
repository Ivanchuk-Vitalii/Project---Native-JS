import {getResource} from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);
    // 1 способ - более простой
    // cards.forEach(card => {
    //     card.classList.add('animated', 'fadeInUp');
    // });

    // //  при клике отображаем скрытые в верстке блоки
    // btn.addEventListener('click', () => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });

    //     btn.remove(); // удаляем кнопку со страницы
    // });

    // 2 способ - подгружаем элементы с сервера
    btn.addEventListener('click', function() {
        getResource('assets/db.json')
            .then(res => createCards(res.styles))
            .catch(error => console.log(error));
        
        this.remove();
    });

    // создаем карточки и помещаем их на страницу
    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            // наполняем карточку контентом
            card.innerHTML = `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4> 
                    <a href=${link}>Подробнее</a> 
                </div>
            `;

            // помещаем карточку на страницу, wrapper - блок, куда мы будем помещать карточку
            document.querySelector(wrapper).appendChild(card);
        });
    }

    // < div class = "hidden-lg hidden-md hidden-sm hidden-xs styles-2" >
    //     <
    //     div class = styles - block >
    //     <
    //     img src = assets / img / styles - 5. jpg alt >
    //     <
    //     h4 > Пастелью < /h4> <
    //     a href = "#" > Подробнее < /a> <
    //     /div> <
    // /div>

};

export default showMoreStyles;