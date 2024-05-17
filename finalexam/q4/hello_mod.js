import { getToday } from './date_mod.js';

export function sayHiWithDate() {
	return `Hello, Guest. Today's date is ${getToday()}.`;
}