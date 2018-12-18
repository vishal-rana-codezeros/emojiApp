import axios from 'axios';
import { ACTION_TYPE } from '../reducers/reducer.types';
import API from '../config';

const changeAction = string => ({
  	type : ACTION_TYPE,
	action_value: string
});

export const getAllUser = (page, pageSize, sorted, filtered) => {
	console.log("getalluser called")
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getAllUser?page=${page}&size=${pageSize}`);
	}
	
}

export const getAllUserFilter = (page, pageSize, sorted, filtered,filter) => {
	console.log("withfilterAPI called")
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getAllUser?page=${page}&size=${pageSize}&filter=${filter}`);
	}
	
}

export const deleteUser = (page, pageSize, sorted, filtered) => {
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getAllUser?page=${page}&size=${pageSize}`);
    }
}

export const Login = data => {
	return dispatch => {
		console.log(data);
	}
}
