import createInsertStatements from "./lib/create-insert-statements.mjs"
import createTypeDescriptions from "./lib/create-type-descriptions.mjs"
import createTableStatement from "./lib/create-table-statement.mjs"

export default function generateSQL(tableName, data, options = {useIndividualInserts: true}) {


	let descs = createTypeDescriptions(data)
	
	let prefix = ''
	let postfix = ''
	if(options.useIndividualInserts) {
		prefix += 'set autocommit=0;\nstart transaction;\n'
		postfix += '\ncommit;\n'
	}
	
	prefix += 'drop table if exists `' + tableName + '`;\n'

	let create = createTableStatement(descs, Object.assign({}, options, {
		tableName: tableName
	}))
	let insert = createInsertStatements(descs, data, Object.assign({}, options, {
		tableName: tableName
	}))

	return prefix + create + insert + postfix
}