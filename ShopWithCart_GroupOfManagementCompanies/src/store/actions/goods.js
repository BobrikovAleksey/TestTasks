import urls from 'Store/urls';

/**
 * Добавляет модификатор в ссылку на изображение
 * @param imageLink
 * @returns {string}
 */
const addModifierToImageLink = (imageLink) => {
    const lastDotIndex = imageLink.lastIndexOf('.');
    return `${imageLink.substring(0, lastDotIndex)}_220x200_1${imageLink.substring(lastDotIndex)}`;
}

/**
 * Подготавливает полученные данные с сервера
 * @param data {{ assocProducts: string, bonusAmount: number, code, description: string, hasAlternateUnit: boolean,
 *                isActive: boolean, modified: string, priceGold: number, priceGoldAlt: number, priceRetail: number,
 *                priceRetailAlt: number, primaryImageUrl: string, productId: string, title: string, unit: string,
 *                unitAlt: string, unitFull: string, unitFullAlt: string, unitRatio: number, unitRatioAlt: number,
 *                weight: number }[]}
 * @returns { *[] }
 */
const prepareData = (data) => {
    return data.map((el) => {
        const code = Number(el.code);
        const smallImageUrl = addModifierToImageLink(el.primaryImageUrl);
        const unitRatioAlt = Math.floor(el.unitRatioAlt * 100) / 100;
        const priceRetail = Math.floor(el.priceRetail * 100) / 100;
        const priceRetailAlt = Math.floor(el.priceRetailAlt * 100) / 100;
        const priceGold = Math.floor(el.priceGold * 100) / 100;
        const priceGoldAlt = Math.floor(el.priceGoldAlt * 100) / 100;
        const modified = new Date(el.modified);

        const priceInPoints = Math.floor((el.priceRetail / 4) * 100) / 100;
        const rating = Math.round(Math.random() * 5);
        const feedbacks = rating > 0 ? Math.round(Math.random() * 99 + 1) : 0;

        return {
            ...el, code, modified, feedbacks, priceGold, priceGoldAlt, priceInPoints, priceRetail, priceRetailAlt,
            rating, smallImageUrl, unitRatioAlt,
        };
    });
}

export const types = {
    FETCH_GOODS: 'FETCH_GOODS',
};

export const fetchGoods = (data = []) => {
    return {
        type: types.FETCH_GOODS,
        payload: data,
    }
};

export function fetchGoodsWithApi() {
    return (dispatch) => {
        fetch(urls.goods)
            .then((response) => response.json())
            .then((data) => {
                dispatch(fetchGoods(prepareData(data)));
            })
            .catch((err) => {
                dispatch(fetchGoods([]));
                console.log(err);
            })
    };
}
