const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    // формируем массив событий drag&drop и перебираем его
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // индикатор для пользователя, который показывает что они перетаскивают файл над нужной областью
    function highLight(item) {
        item.closest('.file_upload').style.border = "2px solid #c51abb";
        item.closest('.file_upload').style.borderRadius = "50px";
    }

    function unhighLight(item) {
        item.closest('.file_upload').style.border = "none";
    }

    // когда файл появляется над зоной и когда мышкой вводим над полем дроп
    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    // когда курсор мыши выходит за пределы дроп области или файл опускаем в инпут
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    // обробатываем, когда пользователь "кинул" файл в дроп область
    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.'); // для разреления имени картинки
            arr[0].length > 6 ? dots = "..." : dots = ".";
            // формируем имя картинки
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    })
};

export default drop;