import { SPINNER } from './reducer.types';
import lodash from 'lodash';


export const Loader = (state = true, action) => {
    switch (action.type) {
        case 'SPINNER':
             return action.status
        default:
            return state;
    }
}