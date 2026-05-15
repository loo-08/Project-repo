import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
});

// 상품 목록 조회 (GET)
export const getItems = async (type = "clothes", params = {}) => {
    const res = await api.get(`/${type}`, { params });
    return res.data;
};

// 새 상품 등록 (POST)
export const addItem = async (type, itemData) => {
    const res = await api.post(`/${type}`, itemData);
    return res.data;
};

// 특정 상품 상세 조회 (GET with ID)
export const getItemDetail = async (type, id) => {
    const res = await api.get(`/${type}/${id}`);
    return res.data;
};

// 상품 전체 수정 (PUT)
export const updateItem = async (type, id, itemData) => {
    const res = await api.put(`/${type}/${id}`, itemData);
    return res.data;
};

// 상품 부분 수정 (PATCH)
export const patchItem = async (type, id, itemData) => {
    const res = await api.patch(`/${type}/${id}`, itemData);
    return res.data;
};

// 상품 삭제 (DELETE)
export const deleteItem = async (type, id) => {
    const res = await api.delete(`/${type}/${id}`);
    return res.data;
};