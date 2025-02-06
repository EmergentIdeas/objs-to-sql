# Objs-to-sql

Takes an array of data and makes a bunch of statements to create a table and insert the data.
The commands are targetted at MySQL/MariaDB when targeted commands are necessary, 
but they're generally compliant with SQL otherwise.


## Why

I have coworker who is more comfortable working with data when it's in an SQL database, rather
than as JS objects or in MongoDB. This code attempts to create statements that preserve
a lot of the underlying types from the JS objects, offering a big increase in queryability
over a mechnism like dumping to CSV and importing it.

For example, if the code can detect that the values of a given field are always Date objects,
it will make a `create table` statement with that field as an SQL `DATATIME` and insert the
values as dates. The same is true for `INT`s and `FLOAT`s and `BOOL`s


## Install

```bash
npm install objs-to-sql
```

## Usage

```js
import generateSQL from "objs-to-sql"

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

let sql = generateSQL('mytablename', data, {useIndividualInserts: false})
```

As is typical, the test cases show more use of the code.

The parameter `useIndividualInserts` changes whether the code creates one `INSERT` statement for
every object (the default), or tries to insert all the objects as part of one statement. If set to
true, the sql will also include statements to start a new transaction to do the insert. (It's just
painfully slow otherwise.)

Fields which contain arrays or complex objects are skipped.

Fields which contain text are analyzed to see what the "real" data type is. For example, if all the values
across all objects for a field are all text representations of integer numbers, the generated table will use
an `INT` type for that field.

However, if the numbers fall outside the range of the DB's `INT`/`FLOAT`, the column will be converted to TEXT.
That is true whether the numbers started out as text strings or instances of the JS `Number` class.

If any column's text length looks like it will exceed the size of MySQL's `TEXT` type (about 64k), the column
will be a `MEDIUMTEXT` type (about 16m).
