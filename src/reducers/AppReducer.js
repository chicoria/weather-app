const initState = {
    sideMenuOpened: false

}

//actions

const APP_UPDATE_SIDE_MENU_STATE = 'APP_UPDATE_SIDE_MENU_STATE';
export const updateSideMenuStateAction = (sideMenuOpened) => ({
    type: APP_UPDATE_SIDE_MENU_STATE,
    payload: sideMenuOpened
})

export const updateSideMenuState = (sideMenuOpened) => {
    return (dispatch) => {
        dispatch(updateSideMenuStateAction(sideMenuOpened));
    }
}

export default (state = initState, action) => {
    switch (action.type) {

        case APP_UPDATE_SIDE_MENU_STATE:
            return { ...state,
                sideMenuOpened: action.payload
            };
        default:
            return state

    }
}