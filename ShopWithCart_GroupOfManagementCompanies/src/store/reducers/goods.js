import { types } from 'Store/actions/goods';

const addModifierToImageLink = (imageLink) => {
    const lastDotIndex = imageLink.lastIndexOf('.');
    return `${imageLink.substring(0, lastDotIndex)}_220x200_1${imageLink.substring(lastDotIndex)}`;
}

const fetchData = () => {
    const data = [
        {
            productId: '8b051a82-e051-11e4-afe5-00259036a192',
            code: '00000142709',
            title: 'Плитка облицовочная Сан-Ремо 7 200х200х7 мм белая (26 шт=1.04 кв.м)',
            description: 'Предназначена для облицовки стен внутри жилых (кухня, ванная комната, туалет и пр.) и коммерческих (магазины, кафе, отели и пр.) помещений.\n\nТон (оттенок) может отличаться от партии к партии.\n\nСостав: огнеупорная глина, пылевой шпат, кварцевый песок, каолин, красители, фритта.\n\nСтепень блеска: глянцевый.\nКоличество на поддоне: 96 коробок.\nПроизводитель: ОАО «Керамин», Беларусь.\n\nСопутствующие: клей для плитки, крестики, затирка для швов, плиткорез.\n',
            primaryImageUrl: '//tdp.ru/images/p/cd9/3ef76-fbad-11e4-afe5-00259036a192.jpg',
            assocProducts: 'клей для плитки;\nкрестики;\nзатирка для швов;\nплиткорез;',
            weight: 13600,
            unit: 'упак.',
            unitFull: 'упаковка',
            unitRatio: 1,
            unitAlt: 'м. кв.',
            unitRatioAlt: 0.9615,
            unitFullAlt: 'метр квадратный',
            priceRetail: 593,
            priceRetailAlt: 570.1695,
            priceGold: 576,
            priceGoldAlt: 553.824,
            bonusAmount: 0,
            hasAlternateUnit: true,
            isActive: true,
            modified: '2016-10-27 09:58:16'
        },
        {
            productId: 'dded02e3-135e-11e5-b9a9-00259036a192',
            code: '00000145471',
            title: 'Керамогранит Zula 600х600х10 мм бежевый травертин полированный (4 шт= 1.44 кв.м)',
            description: 'Предназначен для укладки внутри помещений, в том числе с  высокой проходимостью, а так же для наружных работ, для облицовки фасадов и др. \n\nТон (оттенок) и калибр (точность размеров по длине и ширине) может отличаться от партии к партии.\n\nСостав: огнеупорная глина, кварцевый песок, пигменты.\n\nСтепень блеска: матовый.\nКоличество на поддоне: 40 коробок.\nПроизводитель: Китай.\n\nСопутствующие: клей для керамогранита; крестики; затирка для швов; плиткорез; крестики для плитки; затирка для швов; плиткорез;\n\n',
            primaryImageUrl: '//tdp.ru/images/p/dc8/f086d-3073-11e5-b9a9-00259036a192.jpg',
            assocProducts: 'клей для керамогранита; крестики; затирка для швов; плиткорез;; крестики для плитки; затирка для швов; плиткорез;',
            weight: 33000,
            unit: 'упак.',
            unitFull: 'упаковка',
            unitRatio: 1,
            unitAlt: "м. кв.",
            unitRatioAlt: 0.69444,
            unitFullAlt: 'метр квадратный',
            priceRetail: 1336,
            priceRetailAlt: 927.7718,
            priceGold: 1283,
            priceGoldAlt: 890.9665,
            bonusAmount: 0,
            hasAlternateUnit: true,
            isActive: true,
            modified: '2016-11-02 12:57:00'
        },
    ];

    data.forEach((el) => {
        el.code = Number(el.code);
        el.smallImageUrl = addModifierToImageLink(el.primaryImageUrl);
        el.unitRatioAlt = Math.floor(el.unitRatioAlt * 100) / 100;
        el.priceRetail = Math.floor(el.priceRetail * 100) / 100;
        el.priceRetailAlt = Math.floor(el.priceRetailAlt * 100) / 100;
        el.priceGold = Math.floor(el.priceGold * 100) / 100;
        el.priceGoldAlt = Math.floor(el.priceGoldAlt * 100) / 100;
        el.priceInPoints = Math.floor((el.priceRetail / 4) * 100) / 100;
        el.rating = Math.round(Math.random() * 5);
        el.feedbacks = el.rating > 0 ? Math.round(Math.random() * 99 + 1) : 0;
        el.modified = new Date(el.modified);
        return el;
    });
    return data;
}

const initialState = {
    entries: [],
    loading: false,
};

export const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_GOODS: return {
            ...state,
            entries: fetchData(),
        };
        default: return state;
    }
}
