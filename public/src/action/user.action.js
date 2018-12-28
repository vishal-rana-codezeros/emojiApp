import axios from 'axios';
import { ACTION_TYPE } from '../reducers/reducer.types';
import API from '../config';

const changeAction = string => ({
  	type : ACTION_TYPE,
	action_value: string
});
var dataa=""
export const getAllUser = (page, pageSize, filtered="") => {
	// console.log("getalluser called")
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getAllUser?page=${page}&size=${pageSize}&filter=${filtered}`);
	}
	
}



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
export const getAboutusPage= (data) => {	
	return dispatch => {
		return axios.get(`${API.URL}/admin/getAboutusPage`);
	}
}
export const addAboutusPage =(data) => {	
	console.log("data in abtus",data)
	const {_id } = JSON.parse(localStorage.getItem('user'));
	console.log("description  in addaboutus=====================s",data.editorState)
	//  dataa:{
	// 	let title=data.title;
	// 	let description=JSON.stringify(data.editorState)
	// }
	// console.log("data in about us",dataa)
	return dispatch => {
		return axios.post(`${API.URL}/admin/addAboutusPage/${_id}`,data);
	}
}

export const updateAboutusPage =(data) => {	
	console.log("data in abtus",data)
	
	return dispatch => {
		return axios.put(`${API.URL}/admin/updateAboutusPage/${data.id}`,data);
	}
}