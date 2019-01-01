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
	console.log("description  in addaboutus=====================",data)
	return dispatch => {
		return axios.post(`${API.URL}/admin/addAboutusPage/${_id}`,data);
	}
}

export const updateAboutusPage =(data) => {	
	console.log("data in abtus",data.id)
	console.log("data in update",data)
	return dispatch => {
		return axios.put(`${API.URL}/admin/updateAboutusPage/${data.id}`,data);
	}
}
//get keyboards

export const getAllKeyboardDetails = (page, pageSize, filtered="") => {
	// console.log("pageSize",pageSize)
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getAllKeyboardDetails?page=${page}&size=${pageSize}&filter=${filtered}`);
	}
	
}

//delete keyboard
export const deleteKeyboard = (id) => {
    return dispatch => {
    	return axios.put(`${API.URL}/admin/deleteKeyboard/${id}`);
    }
}

//active keyboard
export const activeKeyboard = (id) => {
    return dispatch => {
    	return axios.put(`${API.URL}/admin/activeKeyboard/${id}`);
    }
}

//get one keyboard

export const getOneKeyboardDetails = (id) => {
    return dispatch => {
    	return axios.get(`${API.URL}/admin/getOneKeyboardDetails/${id}`);
    }
}

//update Keyboard
export const updateKeyboardDetails = (id,data) => {
	console.log("id in update",id)
	console.log("data in update",data)
    return dispatch => {
    	return axios.put(`${API.URL}/admin/updateKeyboardDetails/${id}`,data);
    }
}
//add keyboard
export const addKeyboard =(data) => {	
	console.log("data in add keyboard",data)
	const {_id } = JSON.parse(localStorage.getItem('user'));
	console.log("idddddddddddddddd",_id)
	return dispatch => {
		return axios.post(`${API.URL}/admin/addKeyboard/${_id}`,data);
	}
}