//getting data of todo from storage / creating an empty array
 
let todo = JSON.parse(localStorage.getItem("todos")) || [];

let count = todo.length;
console.log(count);



const todoInput = document.getElementById("tdInput");
const todoList = document.getElementById("todo");
const todoCount = document.getElementById("tdCount");

const addbtn=document.getElementById("addBtn");
const deletebtn=document.getElementById("deleteAll");

const sortbtn=document.getElementById("sort");
const countplace=document.getElementById("count");


//
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

function deleteAllTask(){
    todo=[];
    saveToLocalStrg();
    count=0;
    displayTasks();
}
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

function PinMe(index){
    todo[index].pinned=(todo[index].pinned==1)?2:1;
    displayTasks();

}

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

function displayTasks(){
    let todisplay = todo;

    // Sort for display only
    if (sort) {
        todisplay.reverse();
        sort=!sort;
    }
    todoList.innerHTML="";
    todisplay.forEach((item,index) => {
        if(item.pinned==2){

        
            const p=document.createElement("p");
            p.className="element";
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

function saveToLocalStrg(){
    localStorage.setItem("todos",JSON.stringify(todo));
}

function toggletask(index){
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStrg();
    displayTasks();
}