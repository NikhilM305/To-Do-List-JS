const formEl=document.querySelector(".form")
const inputEl=document.querySelector(".input")
const ulEl=document.querySelector(".list")
let list = JSON.parse(localStorage.getItem("list"));
console.log(list)

if(list){
    list.forEach((task)=>{
        toDolist(task)
    
    })
     
}



formEl.addEventListener("submit",(event)=>{
    // this will prevent from page getting refreshed
event.preventDefault();
toDolist()
})


function toDolist(task){
       let newTask = inputEl.value;
       if(task){
        newTask = task.name;
       }

       const liEl=document.createElement("li");
       //So that checked line scratch will be still there even after refresh
       if(task && task.checked){
     liEl.classList.add("checked")   
    }
     

    liEl.innerText=newTask;
  ulEl.appendChild(liEl)
inputEl.value=""



   //Here we add checkButton for newly created Tasks
const checkBtnEl = document.createElement("div")
checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
liEl.appendChild(checkBtnEl)

// Here we add trashButton for newly created Tasks
const trashBtnEl = document.createElement("div")
trashBtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`
liEl.appendChild(trashBtnEl)

// Checked mark
checkBtnEl.addEventListener("click",()=>{
 liEl.classList.toggle("checked");
 
 //call localStorage after adding checked
 updateLocalStorage()
})

//Delete Task
trashBtnEl.addEventListener("click",()=>{
    liEl.remove();
      
    //Again call localStorage after removing checked
      updateLocalStorage()
})
updateLocalStorage();
}


function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");
   list = []
    liEls.forEach((liEl)=>{
        list.push({
            name:liEl.innerText,
            checked:liEl.classList.contains("checked")
        })
        
    })
    localStorage.setItem("list",JSON.stringify(list));

}