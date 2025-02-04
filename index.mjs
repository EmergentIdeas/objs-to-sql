import createInsertStatements from "./lib/create-insert-statements.mjs"
import createTypeDescriptions from "./lib/create-type-descriptions.mjs"
import createTableStatement from "./lib/create-table-statement.mjs"

export default function generateSQL(tableName, data) {

	let descs = createTypeDescriptions(data)

	let create = createTableStatement(descs, {
		tableName: tableName
	})
	let insert = createInsertStatements(descs, data, {
		tableName: tableName
	})

	return create + insert
}