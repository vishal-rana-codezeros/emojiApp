import { isEmpty, isEmail } from 'validator';
import lodash from 'lodash';

const validation = (data) => {

    let errors = {};

    let { title, description } = data;

    if (isEmpty(title)) {
        errors.title = "Please enter title";
    }
    // if (isEmpty(description)) {
    //     errors.description = "Please Enter description";
    // }
    
    return {
        isValid: lodash.isEmpty(errors),
        errors
    }

}

export default validation;