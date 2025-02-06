
import mocha from "mocha"
import { assert } from 'chai'

import makeString from "../test-utils/make-string.mjs"
import createTypeDescriptions from "../lib/create-type-descriptions.mjs"
import createTableStatement from "../lib/create-table-statement.mjs"
import generateSQL from "../index.mjs"


describe("test top level code", function () {

	it("create sql", function () {
		let data = [
			{
				id: 1
				, name: 'abc'
				, birthdate: new Date(1738706896000)
				, bio: 'hello \' ` " % $ 	\\ ?  _  abc'
				, married: true
				, height: 6.1
				, info: { msg: 'hello' }
			}
			, {
				id: 2
				, name: 'abc'
				, birthdate: new Date(1738706896000)
				, bio: 'hello \' ` " % $ 	\\ ?  _  abc'
				, married: true
				, height: 6.1
				, info: { msg: 'hello' }
			}

		]

		let code = generateSQL('test2', data, {useIndividualInserts: false})
		let target = 'drop table if exists `test2`;\nCREATE TABLE `test2` (`id` INT, `name` TEXT, `birthdate` DATETIME, `bio` TEXT, `married` BOOL, `height` FLOAT);\n' +
			'INSERT INTO `test2` (`id`, `name`, `birthdate`, `bio`, `married`, `height`) VALUES (1, \'abc\', FROM_UNIXTIME(1738706896), \'hello \'\' ` \\" % $ \\t\\\\ ?  _  abc\', true, 6.1)' + 
		', (2, \'abc\', FROM_UNIXTIME(1738706896), \'hello \'\' ` \\" % $ \\t\\\\ ?  _  abc\', true, 6.1);\n'

		assert.equal(code, target)

		code = generateSQL('test2', data)

		console.log(code)

		target = 'set autocommit=0;\nstart transaction;\ndrop table if exists `test2`;\nCREATE TABLE `test2` (`id` INT, `name` TEXT, `birthdate` DATETIME, `bio` TEXT, `married` BOOL, `height` FLOAT);\n' +
'INSERT INTO `test2` (`id`, `name`, `birthdate`, `bio`, `married`, `height`) VALUES (1, \'abc\', FROM_UNIXTIME(1738706896), \'hello \'\' ` \\" % $ \\t\\\\ ?  _  abc\', true, 6.1);\n' + 
'INSERT INTO `test2` (`id`, `name`, `birthdate`, `bio`, `married`, `height`) VALUES (2, \'abc\', FROM_UNIXTIME(1738706896), \'hello \'\' ` \\" % $ \\t\\\\ ?  _  abc\', true, 6.1);\n' + 
'\ncommit;\n'

		assert.equal(code, target)
	})
})