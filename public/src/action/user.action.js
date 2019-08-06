import axios from 'axios';
import { ACTION_TYPE } from '../reducers/reducer.types';
import API from '../config';
import { withAlert } from 'react-alert';
const changeAction = string => ({
	type: ACTION_TYPE,
	action_value: string,
});
var dataa = '';
export const getAllUser = (page, pageSize, filtered = '') => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getAllUser?page=${page}&size=${pageSize}&filter=${filtered}`);
	};
};

export const deleteUser = id => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/setUserActivity/${id}`);
	};
};

export const getOneUser = id => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getOneUser/${id}`);
	};
};

export const updateUser = (id, data) => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/updateUser/${id}`, data);
	};
};
export const activeUser = id => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/setUserActivity/${id}`);
	};
};
export const Login = data => {
	return dispatch => {
		
	};
};
export const getAboutusPage = data => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getcmsPage?page_title=${'about_us'}`);
	};
};
export const addAboutusPage = data => {
	const { _id } = JSON.parse(localStorage.getItem('user'));
	return dispatch => {
		return axios.post(`${API.URL}/admin/addAboutusPage/${_id}`, data);
	};
};

export const updateAboutusPage = data => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/updateAboutusPage/${data.id}`, data);
	};
};

//get keyboards
export const getAllKeyboardDetails = (page, pageSize, filtered = '') => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getAllKeyboardDetails?page=${page}&size=${pageSize}&filter=${filtered}`);
	};
};

//delete keyboard
export const deleteKeyboard = id => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/setKeyboardActivity/${id}`);
	};
};

//active keyboard
export const activeKeyboard = id => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/setKeyboardActivity/${id}`);
	};
};

//get one keyboard

export const getOneKeyboardDetails = id => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getOneKeyboardDetails/${id}`);
	};
};

//update Keyboard
export const updateKeyboardDetails = (id, data) => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/updateKeyboardDetails/${id}`, data);
	};
};
//add keyboard
export const addKeyboard = data => {
	return dispatch => {
		const { _id } = JSON.parse(localStorage.getItem('user'));
		return axios.post(`${API.URL}/admin/addKeyboard/${_id}`, data);
	};
};

//get categories

export const getAllCategory = (page, pageSize) => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getAllCategory?page=${page}&size=${pageSize}`);
	};
};

//addCategory
export const addCategory = data => {
	const { _id } = JSON.parse(localStorage.getItem('user'));
	return dispatch => {
		return axios.post(`${API.URL}/admin/addCategory/${_id}`, data);
	};
};
//delete category
export const deleteCategory = id => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/deleteCategory/${id}`);
	};
};
//active category
export const activeCategory = id => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/activeCategory/${id}`);
	};
};
//getone category getOneCategoryData
export const getOneCategoryData = id => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getOneCategoryData/${id}`);
	};
};
//update category
export const updateCategory = (id, data) => {
	return dispatch => {
		return axios.put(`${API.URL}/admin/updateCategory/${id}`, data);
	};
};
//getActiveCatList
export const getActiveCatList = () => {
	return dispatch => {
		return axios.get(`${API.URL}/admin/getActiveCatList`);
	};
};
