import React, { useReducer, createContext, } from "react";




const initialState = {
    user: null
}

if (localStorage.getItem('token')) {
    const token = (localStorage.getItem('token'));
    initialState.user = token
    console.log(initialState)
}



const AuthContext = createContext({

    user: null,
    login: (userData) => { },
    logout: () => { }
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    function login(userData) {
        const token = userData.token
        localStorage.setItem("token", token)
        localStorage.setItem('email', userData.email)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
        console.log(userData)
    }
    function logout() {

        localStorage.removeItem('token')
        localStorage.removeItem('email')
        dispatch({
            type: 'LOGOUT'
        })
    }
    return (<AuthContext.Provider
        value={{ user: state.user, login, logout }}
        {...props}

    />)
}

export { AuthContext, AuthProvider }