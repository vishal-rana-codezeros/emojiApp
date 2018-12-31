import { isEmpty, isEmail } from 'validator';
import lodash from 'lodash';

const validation = (data) => {

    let errors = {};

    let { description } = data;

    if (isEmpty(description)) {
        errors.description = "Please enter description";
    }
   
    
    return {
        isValid: lodash.isEmpty(errors),
        errors
    }

}

export default validation;