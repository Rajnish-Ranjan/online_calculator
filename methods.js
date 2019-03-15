var ans;
var myexpression;
var val;

if (!myexpression) {
	myexpression="0";
}

var exp="";

function addtostring(a){
	if (myexpression=="0") {
		myexpression=String(a);
	}
	else
		myexpression=myexpression+a;
	document.getElementById("out").value = myexpression;
}

function getAns(){
	document.getElementById("out").value = ans;
}

class Stack{
	constructor(){
		this.items=[];
	}
	push(element) 
	{ 
		this.items.push(element); 
	} 
	pop() 
	{ 
    	if (this.items.length == 0) 
        	return "Underflow"; 
    	return this.items.pop(); 
	}
	top(){
		return this.items[this.items.length - 1];
	}
	isEmpty() 
	{ 
		return this.items.length == 0; 
	}
}

function beck(){
	var n=myexpression.length;
	myexpression = myexpression.substring(0, n-1);
	document.getElementById("out").value = myexpression;
}

function find(num1,num2,op){
	
	switch (op) { 
            case '+': 
            return num1+num2;
  
            case '-': 
            	return num1-num2;
  
            case '/': 
            	return num1/num2;
  
            case 'x': 
            	return num1*num2;
            
            case '%':
            	return num1%num2;
            case '^':
            	return num1**num2;
            }
}


function infixEvaluation(exp1){
	var priority=new Map();
	priority.set('(',0);
	priority.set('-',1);
	priority.set('+',2);
	priority.set('%',4);
	priority.set('/',5);
	priority.set('x',6);
	priority.set('^',7);
	var operands_stack=new Stack();
	var operation_stack=new Stack();
	var token,temp_operand;
	var operand1,operand2,operation;
	var i=0,n=exp1.length;
	while(i<n){
		token=exp1[i];
		if (isNaN(token)) {
			if(token=='('){
				operation_stack.push(token);
			}
			else if(token==')'){
				while(!operation_stack.isEmpty()&&operation_stack.top()!='('){
					operand2=operands_stack.top();
					operands_stack.pop();
					operand1=operands_stack.top();
					operands_stack.pop();
					operation=operation_stack.top();
					operation_stack.pop();
					temp_operand=find(operand1,operand2,operation);
					operands_stack.push(temp_operand);
				}
				operation_stack.pop();
			}
			else{
				if (!operation_stack.isEmpty()) {
					temp=operation_stack.top();
					if (priority.get(temp)>=priority.get(token)) {
						operation_stack.pop();
						operand1=operands_stack.top();
						operands_stack.pop();
						operand2=operands_stack.top();
						operands_stack.pop();
						temp_operand=find(operand1,operand2,temp);
						operation_stack.push(token);
						operands_stack.push(temp_operand);
					}
					else{
						operation_stack.push(token);
					}
				}
				else{
					operation_stack.push(token);
				}
			}
		}
		else{
			operands_stack.push(token);
		}
		//console.log(operands_stack.top()+"\n"+operation_stack.top()+"\n");
		i++;
	}
	while(!operation_stack.isEmpty()){
		temp=operation_stack.top();
		operation_stack.pop();
		operand2=operands_stack.top();
		operands_stack.pop();
		operand1=operands_stack.top();
		operands_stack.pop();
		temp_operand=find(operand1,operand2,temp);
		operands_stack.push(temp_operand);
	}
	var v=operands_stack.top();
	return v;

}

function signing(val,sign){
	if(sign=='-'){
		val=-val;
	}
	return val;
}

function trim(exp1){
	var n=exp1.length;
	var ex=new Array();
	var temp;
	var i=0,j=0,k=1,l=0,m=1;
	var c;
	while(i<n){
		if (!isNaN(exp1[i])) {

			ex.push(m*exp1[i]);
			m=1;
			j++;
			i++;
		}
		else if (exp1[i]=='('||exp1[i]==')') {
			ex.push(exp1[i]);
			i++;
			while(i<n&&isNaN(exp1[i])){
				if(exp1[i]=='('){
					ex.push('(');
				}
				if (exp1[i]=='-') {
					m=-1*m;
				}
				i++;
			}
		}
		else{
			if(i){
				ex.push(exp1[i]);
				i++;
			}
			l=0;
			while(i<n&&isNaN(exp1[i])){
				if(exp1[i]=='('){
					ex.push('(');
				}
				if (exp1[i]=='-') {
					m=-1*m;
				}
				i++;
			}
		}
	}
	console.log(ex);
	return ex;
}

function evalate(){
	myexpression=document.getElementById("out").value;
	var n=myexpression.length;
	//var arr[];
	var exp1=new Array();
	var st="";
	var char;
	var j;
	for (var i = 0; i < n; ) {
		j=i;
		while(i<n){
			char=myexpression.charAt(i);
			if (char=='e') {
				exp1.push(Math.E);
				break;
			}
			else if (char=='p') {
				i++;
				if (i<n&&myexpression.charAt(i)=='i') {
					exp1.push(Math.PI);
				}
				break;
			}
			else if ((char>='0'&&char<='9')||char=='.') {
				exp=exp+char;
			}
			else{
				if(j<i){
					val=Number(exp);
					exp1.push(val);
				}
				exp1.push(char);
				break;
			}
			i++;
		}
		if(i<n){
			i++;
		}
		else{
			val=Number(exp);
			exp1.push(val);
		}
		exp="";
	}
	exp1=trim(exp1);
	val=infixEvaluation(exp1);
	ans =String(val);
	myexpression=String(val);
	if(!myexpression){
		myexpression="0";
		document.getElementById("out").value = myexpression;
	}
	else{
		document.getElementById("out").value = myexpression;
	}
}

function cleer(){
	myexpression="";
	document.getElementById("out").value = "";	
}
