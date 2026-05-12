import api from './api'

const unwrap = (response) => response.data.data

export const petsService = {
    list:() => api.get('/pets').then(unwrap),
    getById:(id) => api.get(`/pets/${id}`).then(unwrap),
    create: (payload) => api.post('/pets',payload).then(unwrap),
    update:(id,payload) => api.put(`/pets/${id}`,payload).then(unwrap),
    remove: (id) => api.delete(`/pets/${id}`).then(unwrap),
};