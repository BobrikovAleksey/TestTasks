const getActiveList = (state) => state.activeDeals.list;

const isLoadingActiveList = (state) => state.activeDeals.loading;

const getCompleteList = (state) => state.completeDeals.list;

const isLoadingCompleteList = (state) => state.completeDeals.loading;

const getLastInsertedId = (state) => state.lastInsertedId;

export default {
    // active list
    getActiveList,
    isLoadingActiveList,
    // complete list
    getCompleteList,
    isLoadingCompleteList,
    // other
    getLastInsertedId,
}
