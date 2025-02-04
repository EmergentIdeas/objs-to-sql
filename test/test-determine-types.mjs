import mocha from "mocha"
import {assert} from 'chai'

import Types from "../lib/types.mjs"
import makeString from "../test-utils/make-string.mjs"
import { determineTypes } from "../lib/determine-types.mjs"


describe("determine types tests", function() {
	
	it("sets", function() {
		assert.equal(determineTypes([0]), Types.INT)
		assert.equal(determineTypes([0, 12]), Types.INT)
		assert.equal(determineTypes([0, 12.3]), Types.FLOAT)
		assert.equal(determineTypes([0, 'a']), Types.TEXT)
		assert.equal(determineTypes([null, new Date()]), Types.DATETIME)
		assert.equal(determineTypes([null, new Date(), 'asdf']), Types.TEXT)
		assert.equal(determineTypes([new Date(), 'asdf', {}]), Types.OBJECT)
		assert.equal(determineTypes([new Date(), 'asdf', []]), Types.OBJECT)
		assert.equal(determineTypes([true, false, 'True']), Types.BOOL)
		assert.equal(determineTypes([true, false, 'True', 12]), Types.TEXT)
		assert.equal(determineTypes([true, false, 'True', 12, makeString(100000)]), Types.MEDIUMTEXT)
		assert.equal(determineTypes([true, false, 'True', 12, 'asdf', makeString(100000)]), Types.MEDIUMTEXT)
		assert.equal(determineTypes([true, false, 'True', 12, 'asdf', makeString(100000), {}]), Types.OBJECT)
		assert.equal(determineTypes([{}, true, false, 'True', 12, 'asdf', makeString(100000)]), Types.OBJECT)
	})
})