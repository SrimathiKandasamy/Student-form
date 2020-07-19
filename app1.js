const name=document.getElementById("name");
const doj=document.getElementById("doj");
const age=document.getElementById("age");
const des=document.getElementById("des"); 
const email=document.getElementById("email");
const exp=document.getElementById("exp"); 
const phone=document.getElementById("phone");
const dept=document.getElementById("dept"); 
const table=document.getElementById("response"); 
const addButton=document.getElementById("sub"); 
const editbutton = document.querySelector("#edit");

let result; 
let i=0;

function loadFromLocal(){
	if(localStorage.getItem("data") != undefined && localStorage.getItem("data") !=""){
		result = JSON.parse(localStorage.getItem("data"));
	} else {
		result = [];
	}
}

addButton.addEventListener("click",(e)=>{ 
	var objname=name.value; 
	var objdoj=doj.value; 
	var objage=age.value;
	var objdes=des.value; 
	var objemail=email.value;
	var objexp=exp.value;  
	var objphone=phone.value; 
	var objdept=dept.value; 

	let obj; 
	if(objname!=""&& objdoj!=""&& objage!=""&& objdes!=""&& objemail!=""&& objphone!=""&& objexp!=""&& objdept!=""){
		obj={
			id:i,
			name: objname,
			doj: objdoj,
			age: objage,
			des: objdes,
			email: objemail,
			exp:objexp, 
			phone:objphone, 
			dept:objdept
		}
		result.push(obj); 
		i++;
		name.value=""; 
		doj.value=""; 
		age.value="";
		des.value=""; 
		email.value="";
		exp.value="";  
		phone.value=""; 
		dept.value=""; 
	} else{ 
		console.log("no data"); 
	} 
	LoadData(result);
	console.log(result);
	saveLocal(result);
});

editbutton.addEventListener("click", function(event) {
	event.preventDefault();
	let id = this.value;
	console.log(id);
	let objname = name.value;
	let objdoj = doj.value;
	let objage = age.value;
	let objdes = des.value;
	let objemail = email.value;
	let objexp = exp.value;
	let objphone = phone.value;
	let objdept = dept.value;
	var obj = {
		id:id,
		name:objname,
		doj:objdoj,
		age:objage,
		des:objdes,
		email:objemail,
		exp:objexp,
		phone:objphone,
		dept:objdept
	}

	let temp = [];
	for (value of result){
		if (value.id == id){
			temp.push(obj);
		} else {
			temp.push(value);
		}
	}
	result= temp;
	LoadData(temp);
	editbutton.classList.add("hide");
	addButton.classList.remove("hide");
	saveLocal(result);
});

const LoadData=(values)=>{ 
	table.innerHTML=""; 
	var response=""; 
	for(value of values){ 
		response=response+ `<tr><td>${value.name}</td> 
		<td>${value.doj}</td> 
		<td>${value.age}</td>
		<td>${value.des}</td>
		<td>${value.email}</td>
		<td>${value.exp}</td>
		<td>${value.phone}</td>
		<td>${value.dept}</td>
		<td><button onclick=edit(${value.id})>Edit</button></td>
		<td><button onclick=remove(${value.id})>Delete</button></td></tr>`; 
	} 
	table.innerHTML=response; 
};

function edit(id){
	console.log(id);
	for (value of result){
		if (value.id == id){
			name.value = value.name;
			doj.value = value.doj;
			age.value= value.age;
			des.value =value.des;
			email.value = value.email;
			exp.value = value.exp;
			phone.value = value.phone;
			dept.value = value.dept;
			editbutton.value = value.id;
			editbutton.classList.remove("hide");
			addButton.classList.add("hide");
		}
	}
}

function remove(id){
	console.log(id);
	var arr=[];
	for (value of result){
		if (value.id != id){
			arr.push(value);
		}
	}
	result= arr;
	LoadData(arr);
}

function saveLocal(json){
	localStorage.setItem("data", JSON.stringify(json));
}

loadFromLocal();
LoadData(result);