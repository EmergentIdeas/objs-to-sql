/**
 * Arranges a list into a keyed object
 * @param {array | iterable} list The list of objects to key
 * @param {*} keyProperty The name of the property to get the key from
 * @returns An object where the key property names are the attributes of the objects
 */
export default function keyed(list, keyProperty) {
	let result = [...list].reduce((acc, opt) => {
		if(typeof keyProperty === 'string') {
			acc[opt[keyProperty]] = opt
		}
		else if(typeof keyProperty === 'function') {
			let key = keyProperty(opt)
			acc[key] = opt
		}
		return acc
	}, {})

	return result
}
