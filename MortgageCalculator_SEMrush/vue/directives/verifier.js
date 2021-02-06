export default {
    bind (el, binding) {
        el.addEventListener('keydown', (e) => {
            const specialKeys = [
                8, // Backspace
                9, // Tab
                13, // Enter
                27, // Escape
                33, // PageUp
                34, // PageDown
                37, // ArrowLeft,
                38, // ArrowUp
                39, // ArrowRight
                40, // ArrowDown
                46, // Delete
            ];

            // noinspection RegExpRedundantEscape
            const symbols = {
                decimal: /^[\.\,]+$/,
                numbers: /^[0-9]+$/,
                eng: /^[a-zA-Z]+$/,
                rus: /^[а-яёА-ЯЁ]+$/,
                punctuation: /^[\!\"\;\:\?\(\)\-\_\[\]\{\}\'\,\.\ ]+$/,
                special: /^[\@\#\$\№\%\^\&\*\+\=\\\|\/\<\>]+$/,
            };

            if ((e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+A
                (e.keyCode === 67 && e.ctrlKey === true) || // Ctrl+C
                (e.keyCode === 88 && e.ctrlKey === true) || // Ctrl+X
                (specialKeys.indexOf(e.keyCode) > -1)) {
                return;
            }

            if ((binding.modifiers['decimal']) && (symbols.decimal.test(e.key))) {
                return;
            }

            if ((binding.modifiers['number']) && (symbols.numbers.test(e.key))) {
                return;
            }

            if ((binding.modifiers['eng'] || binding.modifiers['alpha']) && (symbols.eng.test(e.key))) {
                return;
            }

            if ((binding.modifiers['rus'] || binding.modifiers['alpha']) && (symbols.rus.test(e.key))) {
                return;
            }

            if ((binding.modifiers['punctuation']) && (symbols.punctuation.test(e.key))) {
                return;
            }

            if ((binding.modifiers['special']) && (symbols.special.test(e.key))) {
                return;
            }

            e.preventDefault();
        });
    },
};
