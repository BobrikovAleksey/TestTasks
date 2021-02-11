const getDirectionsList = (state) => state.directions.list;

const getDirectionsValue = (state) => state.directions.value;

const getMessage = (state) => state.message;

const getMinTime = (state) => state.minTime;

const getPrices = (state) => state.prices;

const getTicketQuantity = (state) => state.ticketQuantity;

const getTravelTime = (state) => state.travelTime;

const getTimetableAList = (state) => state.timetableA.list;

const getTimetableATitle = (state) => state.timetableA.title;

const getTimetableAValue = (state) => state.timetableA.value;

const getTimetableBList = (state) => state.timetableB.list;

const getTimetableBTitle = (state) => state.timetableB.title;

const getTimetableBValue = (state) => state.timetableB.value;

export default {
    getDirectionsList,
    getDirectionsValue,
    getMessage,
    getMinTime,
    getPrices,
    getTicketQuantity,
    getTravelTime,
    getTimetableAList,
    getTimetableATitle,
    getTimetableAValue,
    getTimetableBList,
    getTimetableBTitle,
    getTimetableBValue,
}
