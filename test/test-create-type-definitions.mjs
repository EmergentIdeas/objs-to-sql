import mocha from "mocha"
import {assert} from 'chai'

import Types from "../lib/types.mjs"
import createTypeDescriptions from "../lib/create-type-descriptions.mjs"
import keyed from "../lib/keyed.mjs"


describe("type definitions tests", function() {
	
	it("object lists", function() {
		
		let descs = createTypeDescriptions([
			{
				a: 1
			}
			, {
				b: 'hello'
			}
		])
		
		let kd = keyed(descs, 'field')
		assert.equal(kd.a.type, Types.INT)
		assert.equal(kd.b.type, Types.TEXT)
		
		
		descs = createTypeDescriptions([
			{
				a: 1
			}
			, {
				b: 'hello'
			}
			, {
				a: 'hello'
			}
		])
		
		kd = keyed(descs, 'field')
		assert.equal(kd.a.type, Types.TEXT)
		assert.equal(kd.b.type, Types.TEXT)

	})
})