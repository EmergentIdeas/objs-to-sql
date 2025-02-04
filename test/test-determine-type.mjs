import mocha from "mocha"
import {assert} from 'chai'

import { determineType } from "../lib/determine-type.mjs"
import Types from "../lib/types.mjs"
import makeString from "../test-utils/make-string.mjs"


describe("determine type tests", function() {
	
	it("nulls", function() {
		assert.equal(determineType(null), null)
		assert.equal(determineType(undefined), null)
		assert.equal(determineType(''), Types.TEXT)
		assert.equal(determineType(0), Types.INT)
	})

	it("bools", function() {
		assert.equal(determineType(true), Types.BOOL)
		assert.equal(determineType(false), Types.BOOL)
		assert.equal(determineType('true'), Types.BOOL)
		assert.equal(determineType('false'), Types.BOOL)
		assert.equal(determineType('true '), Types.BOOL)
		assert.equal(determineType(' false'), Types.BOOL)
		assert.equal(determineType('True'), Types.BOOL)
		assert.equal(determineType('FALSE'), Types.BOOL)
	})

	it("ints", function() {
		assert.equal(determineType(0), Types.INT)
		assert.equal(determineType(Number.NaN), null)
		assert.equal(determineType(23), Types.INT)
		assert.equal(determineType(-42), Types.INT)
		assert.equal(determineType('-423'), Types.INT)
		assert.equal(determineType('6423'), Types.INT)
		

		// That what a comma separated number will return, but I don't
		// know if it should
		assert.equal(determineType('6,423'), Types.TEXT)

		// Likewise, this is a float, but should it be?
		assert.equal(determineType('6.3e2'), Types.FLOAT)
	})
	
	it("floats", function() {
		assert.equal(determineType(0), Types.INT)
		assert.equal(determineType(0.3), Types.FLOAT)
		assert.equal(determineType(-0.3), Types.FLOAT)
		assert.equal(determineType(-8.3), Types.FLOAT)
		assert.equal(determineType(8.3), Types.FLOAT)
		assert.equal(determineType('8.3'), Types.FLOAT)
		assert.equal(determineType('-98.3'), Types.FLOAT)
		assert.equal(determineType('-8.3e-1'), Types.FLOAT)
	})
	
	it("dates", function() {
		assert.equal(determineType(new Date()), Types.DATETIME)
		assert.equal(determineType('2025-01-31T20:08:24.581Z'), Types.DATETIME)
		assert.equal(determineType('2024-06-13T17:45:13.880Z'), Types.DATETIME)
		assert.equal(determineType('Fri Jan 31 2025 14:08:02 GMT-0600 (Central Standard Time)'), Types.DATETIME)
	})

	it("objects", function() {
		assert.equal(determineType([]), Types.OBJECT)
		assert.equal(determineType({}), Types.OBJECT)
	})

	it("strings", function() {
		assert.equal(determineType(''), Types.TEXT)
		assert.equal(determineType('abc'), Types.TEXT)
		assert.equal(determineType(makeString(1000)), Types.TEXT)
		assert.equal(determineType(makeString(50000)), Types.TEXT)
		assert.equal(determineType(makeString(100000)), Types.MEDIUMTEXT)
	})
})