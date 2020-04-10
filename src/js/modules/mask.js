const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        // устанавливаем фокус на елементе и в опреденной позиции с помощью setSelectionRange
        elem.focus(); 

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) { // полифил для IE
            let range = elem.createTextRange();

            // обьеденяет граничные точки диапазона
            range.collapse(true); 
            // говорим коду, где будет конечная точка выделения
            range.moveEnd('charaster', pos); 
            // говорим коду, где будет начальная точка выделения
            range.moveStart('charaster', pos); 
            // установим курсор и выделем то значение которое сформировалось при помощи moveEnd moveStart
            range.select(); 
        }  

    };

    function createMask(event) {
        let matrix = '+38 (___) ___ __ __',
            i = 0,
            // получаем все не цифры и заменяем их на пустое поле
            def = matrix.replace(/\D/g, ''), // стат. значение, работает на основе матрици
            val = this.value.replace(/\D/g, '');// динамическое значение, работает на основе того что ввел пользователь
        
        if (def.length >= val.length) {
            val = def;
        }

        // заменям нижние подчеркивания в матрице значениями, которые ввел пользователь
        this.value = matrix.replace(/./g, function(a) {
            //формируем ту строке, которую покажем пользователю, проверяем являеться ли данный символ елементом, который входит в определенный диапазон
            // а - каждый символ, который перебирается внутри матрици
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        // если пользователь убрал фокус с инпута и ничего не ввел в поле, то скрываем маску, в ином случае нам нужно установить курсор куда нам нужно
        if (event.type == 'blur') {
            if (this.value.length == 3) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }   
    
    // получаем елементы, на которые нужно установить маску
    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

};

export default mask;