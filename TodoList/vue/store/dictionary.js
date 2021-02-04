export const Colors = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'danger',
    warning: 'warning',
    info: 'info',
    light: 'light',
    dark: 'dark',
    white: 'white',
};

export const ListNames = {
    active: 'active',
    complete: 'complete',
};

export const Directions = {
    up: 'up',
    down: 'down',
    ...ListNames
};

export const MutationTypes = {
    // actions for lists
    ADD: 'ADD',
    MOVE: 'MOVE',
    MOVE_SELF: 'MOVE_SELF',
    REMOVE: 'REMOVE',
    UPDATE: 'UPDATE',
    // active list
    SET_ACTIVE_LIST: 'SET_ACTIVE_LIST',
    SET_ACTIVE_LIST_LOADING: 'SET_ACTIVE_LIST_LOADING',
    // complete list
    SET_COMPLETE_LIST: 'SET_COMPLETE_LIST',
    SET_COMPLETE_LIST_LOADING: 'SET_COMPLETE_LIST_LOADING',
}

export default {
    Colors,
    Directions,
    ListNames,
    MutationTypes,
};
