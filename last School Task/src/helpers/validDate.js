export function validDate(date) {
	let year = date.match(/\d{4}/g);
	let monthAndDay = date.match(/(-)\d{2}/g).map((a) => a.replace(/-/g, ''));
	let result = `${monthAndDay[1]}.${monthAndDay[0]}.${year[0]}`;
	return result;
}