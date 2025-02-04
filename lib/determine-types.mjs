import commonTypeReducer from "./common-type-reducer.mjs"

/**
 * Determine the SQL type which should be used for these values. Nulls will
 * be ignored. 
 * @param {array} values 
 */
export function determineTypes(values) {
	
	if(!values) {
		return null
	}
	if(Array.isArray(values) === false) {
		return null
	}
	
	return values.reduce(commonTypeReducer, null)


}