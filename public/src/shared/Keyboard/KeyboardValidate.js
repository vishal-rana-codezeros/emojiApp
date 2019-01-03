import { isEmpty, isEmail } from 'validator';
import lodash from 'lodash';

const KeyboardValidate = (data) => {
	
	let errors = {};
	
	let { keyboardName, category, cost, keyboardType } = data;

	if(isEmpty(keyboardName)) {
		errors.keyboardName = "Please enter Name";
	}
	
	if(isEmpty(category)) {
		errors.category = "Please Enter Category";
    }
    
    if(isEmpty(keyboardType)) {
		errors.keyboardType = "Please Enter Type";
    }
    
  if(keyboardType=="paid")
  {
    if(!cost) {
		errors.cost = "Please Enter Cost";
    }
  }

	return {
		isValid: lodash.isEmpty(errors),
		errors
	}

}

export default KeyboardValidate;