export default {
    props: {
        title: {
            type: String,
            required: true,
        },

        value: {
            type: String,
            default: 'Некорректные данные',
        },

        type: {
            type: String,
            default: 'dark',
        },
    },


    mounted() {
        const body = this.$el.querySelector('.card-body');

        this.$el.classList.add(`border-${this.type}`);
        body.classList.add(`text-${this.type}`);
    },


    template: `
        <div class="card mb-2">
            <div class="card-header">{{ title }}</div>

            <div class="card-body">
                <h4 class="card-title text-center m-0">{{ value }}</h4>
            </div>
        </div>
    `,
};
