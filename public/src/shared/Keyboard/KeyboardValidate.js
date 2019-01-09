import { isEmpty, isEmail } from 'validator';
import lodash from 'lodash';

const KeyboardValidate = (data) => {
	
	let errors = {};
	
	let { keyboardName, categoryName, cost, keyboardType } = data;

	if(isEmpty(keyboardName)) {
		errors.keyboardName = "Please enter Name";
	}
	
	if(isEmpty(categoryName)) {
		errors.categoryName = "Please Enter Category";
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