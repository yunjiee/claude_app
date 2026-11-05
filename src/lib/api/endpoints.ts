// 在這裡集中管理所有 API endpoint
// 新增主題時，在對應區塊新增 endpoint 函式即可

import { api } from './client'

// --- Blog ---
export const blogApi = {
  getPosts: () => api.get('/api/blog/posts'),
  getPost: (id: string) => api.get(`/api/blog/posts/${id}`),
}

// --- Portfolio ---
export const portfolioApi = {
  getProjects: () => api.get('/api/portfolio/projects'),
  getProject: (id: string) => api.get(`/api/portfolio/projects/${id}`),
}

// --- Shop ---
export const shopApi = {
  getProducts: () => api.get('/api/shop/products'),
  getProduct: (id: string) => api.get(`/api/shop/products/${id}`),
}
