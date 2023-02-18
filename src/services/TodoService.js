import http from "../http-common";

export default {
    index() {
        return http.get('/todo')
    },

    show(id) {
        return http.get(`/todo/${id}`)
    },
    
    store(data) {
        return http.post('/todo', data)
    },

    update(id, data) {
        return http.put(`/todo/${id}`, data)
    },

    destroy(id) {
        return http.delete(`/todo/${id}`)
    }
}