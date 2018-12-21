import axios from 'axios';
import { ACTION_TYPE } from '../reducers/reducer.types';
import API from '../config';

const changeAction = string => ({
  	type : ACTION_TYPE,
	action_value: string
});

export const getAllUser = (page, pageSize, filtered="") => {
	// console.log("getalluser called")
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getAllUser?page=${page}&size=${pageSize}&filter=${filtered}`);
	}
	
}

// export const getAllUserFilter = (page, pageSize, sorted, filtered,filter) => {
// 	// console.log("withfilterAPI called")
//     return dispatch => {
//     	return axios.get(`${API.URL}/admin/getAllUser?page=${page}&size=${pageSize}&filter=${filter}`);
// 	}
	
// }

export const deleteUser = (id) => {
    return dispatch => {
    	return axios.put(`${API.URL}/admin/deleteUser/${id}`);
    }
}

export const getOneUser = (id) => {
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getOneUser/${id}`);
    }
}

export const updateUser = (id,data) => {
	// console.log("data in api====>",data)
	// console.log("id in api",id)
    return dispatch => {
    	return axios.put(`${API.URL}/admin/updateUser/${id}`,data);
    }
}
export const activeUser = (id) => {
    return dispatch => {
    	return axios.put(`${API.URL}/admin/activeUser/${id}`);
    }
}
export const Login = data => {
	return dispatch => {
		// console.log(data);
	}
}
