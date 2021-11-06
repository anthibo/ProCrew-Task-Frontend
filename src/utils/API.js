import AxiosProvider from "../AxiosProvider";

export const getUsers = (qs) => {
    return AxiosProvider.get(`users?${qs}`)
}


export const createUser = (data) => {
    return AxiosProvider.post('/register', data)
}
export const deleteUser = (id) => {
    return AxiosProvider.delete(`/users/${id}`)
}
export const getUser = (id) => {
    return AxiosProvider.get(`users/${id}`)
}
export const editUser = (id, data) => {
    return AxiosProvider.patch(`users/${id}`, data)
}
export const login = ({ email, password }) => {
    return AxiosProvider.post('/login', { email, password })
}
export const loginWithGoogle = (email) => {
    return AxiosProvider.post('/login/google', email)
}
export const forgotPassword = (values) => {
    return AxiosProvider.patch('forgotPassword', values)
}