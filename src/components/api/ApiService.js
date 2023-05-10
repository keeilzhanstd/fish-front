import { apiClient } from './ApiClient'

export const executeBasicAuthService = (token, user) => apiClient.post(`/login`, user, {
    headers: {
        Authorization: token
    }
})

// Products
export const retrieveProducts = () => 
apiClient.get('/api/ecommerce/products')

export const retrieveProductById = (uid) => 
apiClient.get(`/api/ecommerce/products/${uid}`)

export const updateProductById = (uid, product) => 
apiClient.post(`/api/ecommerce/products/edit/${uid}`, product)

export const createProduct = (product) => 
apiClient.post(`/api/ecommerce/products/add`, product)

// Categories
export const retrieveCategories = () => 
apiClient.get('/api/ecommerce/categories')

export const retrieveCategoryById = (uid) => 
apiClient.get(`/api/ecommerce/categories/${uid}`)

export const updateCategoryById = (uid, category) => 
apiClient.put(`/api/ecommerce/categories/edit/${uid}`, category)

export const createCategory = (category) => 
apiClient.post(`/api/ecommerce/categories/add`, category)


// Cart
export const retrieveCart = (username) => 
apiClient.get(`/api/ecommerce/customer/${username}/cart`)

export const updateCartByUsername = (username, cart) => 
apiClient.put(`/api/ecommerce/customer/${username}/cart`, cart)

export const clearCart = (username) => 
apiClient.put(`/api/ecommerce/customer/${username}/cart/clear`)


//Customers
export const deleteCustomerByUsername = (username) => 
apiClient.delete(`/api/ecommerce/customer/${username}`)

export const getCustomerByUsername = (username) => 
apiClient.get(`/api/ecommerce/customer/${username}`)

export const createCustomer = (record) => 
apiClient.post('/register', record)

export const updateCustomerByUsername = (username, record) => 
apiClient.put(`/api/ecommerce/customer/${username}`, record)


// Orders
export const createOrder = (username, order) => 
apiClient.post(`/api/ecommerce/customer/${username}/orders`, order)

export const retrieveOrdersForUsername = (username) => 
apiClient.get(`/api/ecommerce/customer/${username}/orders`)

export const updateOrderByUsername = (username, oid, order) => 
apiClient.put(`/api/ecommerce/customer/${username}/orders/${oid}`, order)


// Payments
export const addPaymentMethod = (username, payment) => 
apiClient.post(`/api/ecommerce/customer/${username}/payments`, payment)

export const getPaymentMethodForUsername = (username) => 
apiClient.get(`/api/ecommerce/customer/${username}/payments`)

export const deletePaymentMethod = (username, oid) => 
apiClient.delete(`/api/ecommerce/customer/${username}/payments/${oid}`)




// MRS

export const retrieveRecords = () => apiClient.get('/api/mrs/records')
export const countRecords = () => apiClient.get('/api/mrs/records/count')
export const retrieveRecordById = (uid) => apiClient.get(`/api/mrs/records/${uid}`)
export const deleteRecordById = (uid) => apiClient.delete(`/api/mrs/records/${uid}`)
export const createTodo = (record) => apiClient.post('/api/mrs/records', record)
export const updateRecordById = (uid, record) => apiClient.put(`/api/mrs/records/${uid}`, record)

export const getAppointmentsById = (uid) => apiClient.get(`/api/mrs/records/${uid}/appointments`)
export const createAppointment = (uid, appointment) => apiClient.post(`/api/mrs/records/${uid}/appointments`, appointment)
export const retrieveAppointmentById = (uid, aid) => apiClient.get(`/api/mrs/records/${uid}/appointments/${aid}`)
export const updateAppointment = (uid, aid, appointment) => apiClient.put(`/api/mrs/records/${uid}/appointments/${aid}`, appointment)