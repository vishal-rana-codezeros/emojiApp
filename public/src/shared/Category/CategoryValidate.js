import { isEmpty, isEmail } from 'validator';
import lodash from 'lodash';

const KeyboardValidate = (data) => {
	
	let errors = {};
	
	let { category } = data;

	
	if(isEmpty(category)) {
		errors.category = "Please Enter Category";
    }
    

	return {
		isValid: lodash.isEmpty(errors),
		errors
	}

}

export default KeyboardValidate;