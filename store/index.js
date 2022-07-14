export const state = () => ({
    status: "",
    token: "",
    user: {},
});
export const mutations = {
    get_token(state, token){
        state.token = token
    },
    userDetail(state, user) {
        state.status = 'success'
        state.user = user
    },
    logout(state) {
        state.status = null
        state.token = null
        state.user = {}
        localStorage.setItem('status', null)
        localStorage.setItem('token', null)
        localStorage.setItem('user', {})
    },
};