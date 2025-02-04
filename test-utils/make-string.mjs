
export default function makeString(size) {
	let a = new Array(size)
	a.fill('a')
	return a.join('')
}