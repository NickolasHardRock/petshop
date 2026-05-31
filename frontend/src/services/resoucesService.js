import api from './api';

const unwrap = (response) => response.data.data;

export const ownersService = {
    list: () => api.get('/owners').then(unwrap),
    getById: (id) => api.get(`/owners/${id}`).then(unwrap),
    create: (payload) => api.post('/owners', payload).then(unwrap),
    update: (id, payload) => api.put(`/owners/${id}`, payload).then(unwrap),
    remove: (id) => api.delete(`/owners/${id}`).then(unwrap),
};

export const petsService = {
    list:() => api.get('/pets').then(unwrap),
    getById:(id) => api.get(`/pets/${id}`).then(unwrap),
    create: (payload) => api.post('/pets',payload).then(unwrap),
    update:(id,payload) => api.put(`/pets/${id}`,payload).then(unwrap),
    remove: (id) => api.delete(`/pets/${id}`).then(unwrap),
};

export const serviceType = {
    list: () => api.get('/service-types').then(unwrap),
    getById: (id) => api.get(`/service-types/${id}`).then(unwrap),
    create: (payload) => api.post('/service-types', payload).then(unwrap),
    update: (id, payload) => api.put(`/service-types/${id}`, payload).then(unwrap),
    remove: (id) => api.delete(`/service-types/${id}`).then(unwrap),
};

export const serviceRecordsService = {
    list: () => api.get('/services').then(unwrap),
    getById: (id) => api.get(`/services/${id}`).then(unwrap),
    create: (payload) => api.post('/services', payload).then(unwrap),
    update: (id, payload) => api.put(`/services/${id}`, payload).then(unwrap),
    remove: (id) => api.delete(`/services/${id}`).then(unwrap),
};

export const usersService = {
    list: () => api.get('/users').then(unwrap),
    getById: (id) => api.get(`/users/${id}`).then(unwrap),
    update: (id, payload) => api.put(`/users/${id}`, payload).then(unwrap),
    remove: (id) => api.delete(`/users/${id}`).then(unwrap),
};