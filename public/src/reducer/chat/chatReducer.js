import types from '../../types/types';

const chatReducer = ( state, action ) => {
    switch( action.type ) {
        case types.getUsers:
            return {
                ...state,
                users: action.payload
            };

        case types.getNotifications:
            return {
                ...state,
                notifications: action.payload
            };

        case types.activeChat:
            if( state.uidUserTo === action.payload ) return state;

            return {
                ...state,
                uidUserTo: action.payload,
                messages: []
            };

        case types.loadingMessages:
            return {
                ...state,
                loadingMessages: true
            };

        case types.getMessages:
            return {
                ...state,
                messages: action.payload,
                loadingMessages: false
            };

        case types.addMessage:
            if( state.uidUserTo === action.payload.from || state.uidUserTo === action.payload.to ) {
                return {
                    ...state,
                    messages: [ ...state.messages, action.payload ]
                };
            }

            return state;

        case types.clearChatState:
            return {
                ...state,
                users: [],
                uid: null,
                uidUserTo: null,
                messages: [],
                notifications: [],
                loadingMessages: true
            };

        default:
            return state;
    }
};

export default chatReducer;
