import React, { useReducer, createContext, } from "react";
import { getUsers, deleteUser } from "../utils/API";




const initialState = {
    users: []
}
const actions = {
    RETRIEVE_USERS: "RETRIEVE_USERS",
    REMOVE_USER: "REMOVE_USER",
};

getUsers('').then(
    res => {
        // console.log(res)
        initialState.users = res.data.users
    }
).catch(err => {
    console.log(err.response)
})



const UsersContext = createContext({

    users: initialState.users,
    retreiveUsers: () => { },
    deleteUser: (userData) => { },

})

function usersReducer(state, action) {
    switch (action.type) {
        case actions.REMOVE_USER:
            return {
                ...state,
                users: action.payload
            }
        case actions.RETRIEVE_USERS:
            return {
                ...state,
                users: action.payload
            }


        default:
            return state;
    }
}

function UsersProvider(props) {
    const [state, dispatch] = useReducer(usersReducer, initialState)

    function removeUser(userId) {
        let users = []
        deleteUser(userId).then(
            res => {
                users = res.data.users
                console.log(users)
            }
        ).catch(
            err => {
                console.log(err.response)
            }
        )
        dispatch({
            type: actions.REMOVE_USER,
            payload: users
        })

    }

    function retreiveUsers() {
        getUsers('').then(
            res => {
                const users = res.data.users
                console.log(users)
                dispatch({
                    type: actions.RETRIEVE_USERS,
                    payload: users
                })
            }
        ).catch(err => {
            console.log(err.response)
        })
    }

    return (<UsersContext.Provider
        value={{ users: state.users, removeUser, retreiveUsers }}
        {...props}

    />)
}

export { UsersProvider, UsersContext }