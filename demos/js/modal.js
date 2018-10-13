import {a,b} from './modal1.js';

const sum = ()=>{
	console.log(a+b);
	return a+b;
}
const show = () =>{
	console.log('我就是show');
	return 34;
}
class Person{
	constructor(name,age){
		this.name = name;
		this.age = age;
	}
	showName(){
		return `这个名字叫${this.name}`
	}
}
export {show,sum,a,b,};
export default {
	Person
}