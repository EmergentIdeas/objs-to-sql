import Types from "./types.mjs"
import escapeSQLText from "./escape-sql-text.mjs"

let nul = 'NULL'


function createValuesForObj(fields, value) {
	let valueSections = []
	for (let field of fields) {
		let dat = value[field.field]
		if (dat === null || dat === undefined) {
			valueSections.push(nul)
			continue
		}
		if (field.type === Types.INT) {
			try {
				valueSections.push(parseInt(dat))
			}
			catch (e) {
				valueSections.push(nul)
			}
			continue
		}
		if (field.type === Types.FLOAT) {
			try {
				valueSections.push(parseFloat(dat))
			}
			catch (e) {
				valueSections.push(nul)
			}
			continue
		}
		if (field.type === Types.DATETIME) {
			let seconds
			try {
				if (dat instanceof Date) {
					seconds = dat.getTime() / 1000
				}
				else {
					seconds = new Date(dat).getTime() / 1000
				}
				valueSections.push(`FROM_UNIXTIME(${seconds})`)
			}
			catch (e) {
				valueSections.push(nul)
			}
			continue
		}
		if (field.type === Types.BOOL) {
			valueSections.push(!!dat ? 'true' : 'false')
			continue
		}
		valueSections.push('\'' + escapeSQLText('' + dat) + '\'')
	}
	
	return '(' + valueSections.join(', ') + ')'
}

/**
 * Creates a create table sql statement based on a set of field descriptions 
 * @param {array[object]} fieldDescriptions 
 * @param {array[object]} data
 * @param {object} options
 */
export default function createInsertStatements(fieldDescriptions, data, { tableName = 'testtable', useIndividualInserts = true} = {}) {

	let insertStarter = 'INSERT INTO `' + tableName + '` ('

	let fields = fieldDescriptions
		.filter(desc => desc.type === Types.OBJECT ? false : true)
	let fieldSpec = fields
		.map(field => '`' + field.field + '`')
		.join(', ')

	insertStarter += fieldSpec + ') VALUES '
	
	let result = ''

	let valuesStatements = []
	for (let value of data) {
		valuesStatements.push(createValuesForObj(fields, value))
	}

	if(useIndividualInserts) {
		for (let stmt of valuesStatements) {
			result += insertStarter + stmt + ';\n'
		}
	}
	else {
		result += insertStarter
		result += valuesStatements.join(', ')
		result += ';\n'
	}

	return result
}