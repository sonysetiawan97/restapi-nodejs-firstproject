import http from '../http-common'

class Login {
    signin(data) {
        return http.post('/user/v1/login', data)
    }
}

export default new Login()