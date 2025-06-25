//getting data of todo from localstorage / creating an empty array
 
let todo = JSON.parse(localStorage.getItem("todos")) || [];

let count = todo.length;
console.log(count);


//variables needed
const todoInput = document.getElementById("tdInput");
const todoList = document.getElementById("todo");
const todoCount = document.getElementById("tdCount");

const addbtn=document.getElementById("addBtn");
const deletebtn=document.getElementById("deleteAll");

const sortbtn=document.getElementById("sort");
const countplace=document.getElementById("count");

let sort =false;//increasing true=>decreasing



document.addEventListener("DOMContentLoaded",
    function(){
        addbtn.addEventListener("click" ,addTask);
        todoInput.addEventListener('keydown',
            function(event){
                if(event.key=="Enter"){
                    event.preventDefault()
                    addTask();
                }
            }
        );
        deletebtn.addEventListener("click",deleteAllTask);
        displayTasks();

    }
);

//adding a new task 
function addTask(){
    const date = new Date();
    const newTask= todoInput.value.trim();
    if(newTask !==""){
        todo.push({
            text:newTask, disabled:false ,pinned:1});
        saveToLocalStrg();
        todoInput.value="";
        count++;
        displayTasks();
        
    }
    
}

//deleting all tasks
function deleteAllTask(){
    todo=[];
    saveToLocalStrg();
    count=0;
    displayTasks();
}

//edit task
function editTask(index){
    console.log("hi");
    const todoitem=document.getElementById(`todo-${index}`);
    const existingtext = todo[index].text;
    const inputElement =document.createElement("input");
    inputElement.value=existingtext;
    todoitem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur",function(){
        const updatedText = inputElement.value.trim();
        if(updatedText){
            todo[index].text=updatedText;
            saveToLocalStrg();
            
        }
        displayTasks();

    }
    );

}

//pin a task
function PinMe(index){
    todo[index].pinned=(todo[index].pinned==1)?2:1;
    displayTasks();

}

//fn to alter sort button
function sortit(){
    sort=!sort;
    if(sort){
        sortbtn.textContent="Sort By Date ▼";
    }
    else{
        sortbtn.textContent="Sort By Date ▲";
    }
    displayTasks();
}

//display tasks fn 
function displayTasks(){
    let todisplay =Array.from(todo);

    //if sort == true then revers the array and display 
    if (sortbtn.textContent=="Sort By Date ▼") {
        todisplay.reverse();
    }
    todoList.innerHTML="";
    todisplay.forEach((item,index) => {
        if(item.pinned==2){

        
            const p=document.createElement("p");
            p.className="element";
         //creating a <p> elemrnt to display the tasks
            p.innerHTML = `
                
                <div class="todos">
                    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ?"checked":""}>
                <p id="todo-${index}" class="${item.disabled ?"disabled" : "dummy"}" onclick='editTask(${index})'>
                    ${item.text}
                </p>
                </div>
                <button class="Pin" onclick="PinMe(${index})"><img src="imgs/pinned-${item.pinned}.png" heigth=25 width=25></button>
            `;
            p.querySelector(".todo-checkbox").addEventListener("change" ,()=>{
                toggletask(index);
            });

            todoList.appendChild(p);
        
        }
        
    });
    todisplay.forEach((item,index) => {
        if(item.pinned!=2){
            const p=document.createElement("p");
            p.className="element";
            p.innerHTML = `
                
                <div class="todos">
                    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ?"checked":""}>
                <p id="todo-${index}" class="${item.disabled ?"disabled" : "dummy"}" onclick='editTask(${index})'>
                    ${item.text}
                </p>
                </div>
                <button id="pinbtn-${index}" class="Pin" onclick="PinMe(${index})"><img src="imgs/pinned-${item.pinned}.png" heigth=25 width=25></button>
            `;
            p.querySelector(".todo-checkbox").addEventListener("change" ,()=>{
                toggletask(index);
            });

            todoList.appendChild(p);
        }
        
    });
 //to alter the tasks behaviour when hovered on them
    const elements=document.querySelectorAll(".element");
    elements.forEach(element=>{
        element.addEventListener("mouseenter",()=>{
            element.querySelector(".Pin").style.display="inline-block";
        });
        element.addEventListener("mouseleave",()=>{
            element.querySelector(".Pin").style.display="none";
        });


    });
    countplace.textContent=`${count}`;
    
}

//fn to save the tasks to local storage 
function saveToLocalStrg(){
    localStorage.setItem("todos",JSON.stringify(todo));
}

//function to toggle checkbox
function toggletask(index){
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStrg();
    displayTasks();
}
