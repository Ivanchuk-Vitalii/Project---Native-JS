const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    // показываем картинки в блоках при наведении при помощи метода slice и скрываем всю информацию внутри блока
    function showImg (block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    }

    // скрываем картинки когда пользователь убирает курсор с блока и показываем всю информацию внутри блока
    function hideImg(block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
    }

    // перебираем все блоки и навешиваем обработчик при наведении на блок и когда пользователь убирает курсор с блока
    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        });

        block.addEventListener('mouseout', () => {
            hideImg(block);
        });
    });
};

export default pictureSize;