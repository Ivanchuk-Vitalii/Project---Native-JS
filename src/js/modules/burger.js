const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector);

    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        if (menuElem.style.display == "none" && window.screen.availWidth < 993) {
            menuElem.style.display = 'block';
        } else {
            menuElem.style.display = 'none';
        }
    });

    // когда пользователь изменяет размеры экрана, будет скрываться или отображатся иконка бургера и меню
    window.addEventListener('resize', () => {
        if (window.screen.availWidth >= 992) {
            menuElem.style.display = 'none';
            burgerElem.style.display = 'none';
        } else {
            burgerElem.style.display = 'block';
        }
    });
};

export default burger;