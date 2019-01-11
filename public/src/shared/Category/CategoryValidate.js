import { isEmpty, isEmail } from 'validator';
import lodash from 'lodash';

const KeyboardValidate = (data) => {
	
	let errors = {};
	
	let { categoryName } = data;

	
	if(isEmpty(categoryName)) {
		errors.categoryName = "Please Enter Category";
    }
    

	return {
		isValid: lodash.isEmpty(errors),
		errors
	}

}

export default KeyboardValidate;