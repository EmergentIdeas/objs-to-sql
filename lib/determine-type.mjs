
let maxTextFieldSize = 65000
import Types from "./types.mjs"

let maxIntSize = 1000000000
let maxIntLength = 9
/**
 * Determine which SQL type should be use for this value. If no determination
 * can be made, null is returned.
 * 
 * NaN always returns null
 * @param {any} value 
 * @returns Types.TEXT, Types.MEDIUMTEXT, Types.BOOL, Types.INT, Types.FLOAT, 'DATETIME', 'OBJECT', null
 */
export function determineType(value) {
	if(value === null || value === undefined) {
		return null
	}
	
	if(typeof value === 'boolean') {
		return Types.BOOL
	}
	
	if(value instanceof Date) {
		return Types.DATETIME
	}
	
	if(Array.isArray(value)) {
		return Types.OBJECT
	}
	
	if(Number.isInteger(value)) {
		if(value > maxIntSize) {
			// Because it will probably overflow the SQL INT size
			return Types.TEXT
		}
		return Types.INT
	}

	try {
		if(typeof value === 'string') {
			if(
				value.trim().toLowerCase() === 'true'
				|| value.trim().toLowerCase() === 'false'
			) {
				return Types.BOOL
			}
		}
	}
	catch(e) {
		// no problem. Just not a bool
	}
	

	try {
		if(typeof value === 'string') {
			let i = parseInt(value.trim())
			if(
				Number.isNaN(i) === false 
				&& i == value
			) {
				if(value.length > maxIntLength || i > maxIntSize) {
					return Types.TEXT
				}
				return Types.INT
			}
		}
	}
	catch(e) {
		// no problem. Just not an int
	}
	
	if(typeof value === 'number') {
		if(Number.isNaN(value)) {
			return null
		}
		if(value > maxIntSize) {
			return Types.TEXT
		}
		return Types.FLOAT
	}

	try {
		if(typeof value === 'string') {
			let f = parseFloat(value.trim())
			if(
				Number.isNaN(f) === false 
				&& f == value
			) {
				if(value.length > maxIntLength || f > maxIntSize) {
					return Types.TEXT
				}
				return Types.FLOAT
			}
		}
	}
	catch(e) {
		// no problem. Just not an float
	}
	
	
	try {
		if(typeof value === 'string') {
			let d = new Date(value.trim())
			if(
				Number.isNaN(d.getTime()) === false 
				&& ('' + d) !== 'Invalid Date'
			) {
				return Types.DATETIME
			}
		}
	}
	catch(e) {
		// no problem. Just not an date
	}
	
	if(typeof value === 'string') {
		if(value.length < maxTextFieldSize) {
			return Types.TEXT
		}
		else {
			return Types.MEDIUMTEXT
		}
	}
	
	if(typeof value === 'object') {
		return Types.OBJECT
	}
	
	return null

}
