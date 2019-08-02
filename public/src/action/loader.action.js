import { SPINNER } from '../reducers/reducer.types';

export const LoaderAction = (status) => {	
	return dispatch => {
		dispatch({type: 'SPINNER', status})
	}
}