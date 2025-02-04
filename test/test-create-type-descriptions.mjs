import mocha from "mocha"
import {assert} from 'chai'

import Types from "../lib/types.mjs"
import makeString from "../test-utils/make-string.mjs"
import createTypeDescriptions from "../lib/create-type-descriptions.mjs"
import createTableStatement from "../lib/create-table-statement.mjs"
import keyed from "../lib/keyed.mjs"


describe("determine types tests", function() {
	
	it("object lists", function() {
		
		let descs = createTypeDescriptions([
			{
				a: 1
			}
			, {
				b: 'hello'
			}
		])
		
		let create = createTableStatement(descs)
		assert.equal(create, 'CREATE TABLE `testtable` (`a` INT, `b` TEXT);\n')
		
		create = createTableStatement(descs, {
			tableName: 'test1'
		})
		assert.equal(create, 'CREATE TABLE `test1` (`a` INT, `b` TEXT);\n')

		descs = createTypeDescriptions([
			{
				id: 1
				, name: 'abc'
				, birthdate: new Date()
				, bio: makeString(100000)
				, married: true
				, height: 6.1
				, info: {msg: 'hello'}
			}
		])
		
		create = createTableStatement(descs)
		assert.equal(create, 'CREATE TABLE `testtable` (`id` INT, `name` TEXT, `birthdate` DATETIME, `bio` MEDIUMTEXT, `married` BOOL, `height` FLOAT);\n')

	})
})