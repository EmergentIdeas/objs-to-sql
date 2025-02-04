import mocha from "mocha"
import { assert } from 'chai'

import createTypeDescriptions from "../lib/create-type-descriptions.mjs"
import createTableStatement from "../lib/create-table-statement.mjs"
import createInsertStatements from "../lib/create-insert-statements.mjs"


describe("create inserts code", function () {

	it("create inserts", function () {

		let data = [{
			id: 1
			, name: 'abc'
			, birthdate: new Date(1738706896000)
			// , bio: 'hello \' ` " % $ 	\n \\ ?  _ \0 \Z \r abc\b'
			, bio2: 'hello \' ` " % $ 	\\ ?  _  abc'
			, married: true
			, height: 6.1
			, info: { msg: 'hello' }
		}]

		let descs = createTypeDescriptions(data)

		let create = createTableStatement(descs, {
			tableName: 'test1'
		})
		// console.log(create)
		assert.equal(create, 'CREATE TABLE `test1` (`id` INT, `name` TEXT, `birthdate` DATETIME, `bio2` TEXT, `married` BOOL, `height` FLOAT);\n')

		let insert = createInsertStatements(descs, data, {
			tableName: 'test1'
		})
		// console.log(insert)
		assert.equal(insert, 'INSERT INTO `test1` (`id`, `name`, `birthdate`, `bio2`, `married`, `height`) VALUES (1, \'abc\', FROM_UNIXTIME(1738706896), \'hello \'\' ` \\" % $ \\t\\\\ ?  _  abc\', true, 6.1);\n')
		


	})
})