const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        // проверяем на соответсвие с помощью регулярных выражений, что б пользователь мог вводить только на укр или рус раскладке
        input.addEventListener('keypress', function(e) {
            if (e.key.match(/[^а-яёіїє 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });
};

export default checkTextInputs;