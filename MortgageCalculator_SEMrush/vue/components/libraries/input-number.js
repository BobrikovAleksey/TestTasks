const inputNumber = {
    /**
     * Возвращает позицию курсора (справа-налево с учетом только цифр)
     * @returns {number}
     */
    getPosition() {
        const value = this.field.value;
        const position = this.field.selectionStart;

        let cursor = 0;
        for (let i = value.length; i >= position; i--) {
            if (/^[0-9]$/.test(value[i])) cursor++;
        }

        return cursor;
    },

    /**
     * Устанавливает новую позицию курсора (справа-налево с учетом только цифр)
     * @param position number
     */
    setPosition(position) {
        const value = this.field.value;

        position =  position + Math.floor(position / 3);
        position = position > value.length ? value.length : position;

        this.field.selectionStart = this.field.selectionEnd = value.length - position;
    },

    keyDown(event) {
        const input = event.target;
        const value = event.target.value;

        if (input.selectionStart === input.selectionEnd) {
            if (event.keyCode === 8 && value[input.selectionStart - 1] === ' ') { // Backspace
                input.selectionStart = input.selectionEnd = input.selectionStart - 1;
            } else if (event.keyCode === 46 && value[input.selectionStart] === ' ') { // Delete
                input.selectionStart = input.selectionEnd = input.selectionEnd + 1;
            }
        }
    },
};

export default inputNumber;
