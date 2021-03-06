import axios from 'axios';
import Config from '../config';
import { AUTHENTICATION_TYPE } from '../reducers/reducer.types';
import requireAuthToken from './requireAuthToken';
require('promise/polyfill-done');

export const setCurrentUser = user => ({
	type: AUTHENTICATION_TYPE,
	user,
});

export const LoginApi = data => {
	return dispatch => {
		return axios.post(`${Config.URL}/user/login`, data).then(
			res => {
				if (res.status === 200) {
					if (res.data.statusCode || res.data.responseCode === 200) {
						const { token, userObj } = res.data;
						localStorage.setItem('token', token);
						localStorage.setItem('user', JSON.stringify(userObj));
						requireAuthToken(token);
						dispatch(setCurrentUser(userObj));
					}
				}
				return res;
			},
			err => {}
		);
	};
};

export const forgotPassword = data => {
	return dispatch => {
		return axios.post(`${Config.URL}/user/forgotPassword`, data);
	};
};

export const recordCount = () => {
	return dispatch => {
		return axios.get(`${Config.URL}/admin/recordCount`);
	};
};

export const logout = () => {
	return dispatch => {
		delete axios.defaults.headers.common['Authorization'];
		localStorage.clear();
		dispatch(setCurrentUser());
	};
};
