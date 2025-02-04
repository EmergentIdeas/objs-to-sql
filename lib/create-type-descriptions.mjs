import { determineTypes } from "./determine-types.mjs"

/**
 * Create type description objects, one per field, for the the fields
 * of the `objects` objects. 
 * 
 * Type descriptions look like:
 * 
 * ```js
 * { field: 'a', type: 'INT' }
 * ```
 * @param {array[object]} objects 
 */
export default function createTypeDescriptions(objects) {
	if(Array.isArray(objects) === false) {
		throw new Error('argument is not an array')
	}
	
	let descriptions = []

	objects = objects.filter(obj => !!obj)

	let keys = new Set()
	for(let obj of objects) {
		for(let key of Object.keys(obj)) {
			keys.add(key)
		}
	}
	
	for(let key of keys) {
		let values = []
		for(let obj of objects) {
			values.push(obj[key])
		}
		
		let type = determineTypes(values)
		
		let desc = {
			field: key
			, type: type
		}
		descriptions.push(desc)

	}

	return descriptions
}


