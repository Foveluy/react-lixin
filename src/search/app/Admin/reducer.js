

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATE':
            const newState = { ...state, ...action.state }
            return newState
        default:
            return state
    }

}
