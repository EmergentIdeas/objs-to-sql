import Types from "./types.mjs"
import { determineType } from "./determine-type.mjs"

export default function commonTypeReducer(current, next) {

	if(current === Types.OBJECT) {
		// This is the most general type, so just keep returning it
		return current
	}

	let type = determineType(next)
	if(type === null) {
		return current
	}
	
	if(type === Types.OBJECT) {
		return Types.OBJECT
	}
	

	if(
		type === Types.DATETIME
		&& current === null
	) {
		return Types.DATETIME
	}
	else if(
		type === Types.DATETIME
		&& current !== Types.DATETIME
	) {
		if(current === Types.MEDIUMTEXT) {
			return current
		}
		else {
			return Types.TEXT
		}
	}

	if(
		type === Types.INT
		&& current === null
	) {
		return Types.INT
	}
	else if(
		type === Types.INT
		&& current !== Types.INT
	) {
		if(current === Types.FLOAT) {
			return current
		}
		else if(current === Types.MEDIUMTEXT) {
			return current
		}
		else {
			return Types.TEXT
		}
	}
	

	if(
		type === Types.FLOAT
		&& current === null
	) {
		return Types.FLOAT
	}
	else if(
		type === Types.FLOAT
		&& current !== Types.FLOAT
	) {
		if(current === Types.INT) {
			return Types.FLOAT
		}
		else if(current === Types.MEDIUMTEXT) {
			return current
		}
		else {
			return Types.TEXT
		}
	}
	
	if(
		type === Types.BOOL
		&& current === null
	) {
		return Types.BOOL
	}
	else if(
		type === Types.BOOL
		&& current !== Types.BOOL
	) {
		if(current === Types.MEDIUMTEXT) {
			return current
		}
		else {
			return Types.TEXT
		}
	}
	
	if(
		type === Types.TEXT
		&& current === null
	) {
		return Types.TEXT
	}
	else if(
		type === Types.TEXT
		&& current !== Types.TEXT
	) {
		if(current === Types.MEDIUMTEXT) {
			return current
		}
		else {
			return Types.TEXT
		}
	}

	
	if(
		type === Types.MEDIUMTEXT
		&& current === null
	) {
		return Types.MEDIUMTEXT
	}
	else if(
		type === Types.MEDIUMTEXT
		&& current !== Types.MEDIUMTEXT
	) {
		return Types.MEDIUMTEXT
	}

	return current
}