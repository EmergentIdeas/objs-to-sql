import Types from "../lib/types.mjs"


/**
 * Creates a create table sql statement based on a set of field descriptions 
 * @param {array[object]} fieldDescriptions 
 * @param {object} options
 */
export default function createTableStatement(fieldDescriptions, {tableName = 'testtable'} = {}) {
	
	let result = 'CREATE TABLE `' + tableName + '` (' 
	
	let fields = fieldDescriptions.filter(desc => {
		return desc.type === Types.OBJECT ? false : true
	})
	
	fields = fields.map(field => {
		return '`' + field.field + '` ' + field.type
	})
	
	result += fields.join(', ')

	result += ');\n'
	return result
}