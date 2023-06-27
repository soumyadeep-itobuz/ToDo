let arrDo = [];
const arrComp = [];
let arrActive = [];
let ip = document.querySelector("#inputText");

document.querySelector(".listContainer").classList.add("hidden");
document.querySelector(".compContainer").classList.add("hidden");
document.querySelector(".activeContainer").classList.add("hidden");

ip.addEventListener("keydown", function (e) {
  if (e.code === "Enter") add();
});

function add() {
  let temp = 1;
  if (ip.value.trim() == "") {
    temp = -1;
    alert("Empty Task Not Allowed !!");
    ip.value = "";
  }
  else {
    for (let i = 0; i < arrDo.length; i++) {
      if (arrDo[i].text.trim() === ip.value.trim()) {
        temp = 0;
        break;
      }
    }
  }
  if (temp === 1) {
    arrDo.push({ text: ip.value, completed: false });
    showList();
  }
  else if (temp === 0) {
    alert("Task Already Exists");
  }
}

function showList() {
  document.querySelector(".listContainer").classList.remove("hidden");
  document.querySelector(".compContainer").classList.add("hidden");
  document.querySelector(".activeContainer").classList.add("hidden");
  document.querySelector(".listContainer").innerHTML = "";
  document.querySelector(".listContainer").innerHTML += `  <h2 class="text-center mt-3">Today's Tasks:</h2>`;
  for (let i = 0; i < arrDo.length; i++) {
    document.querySelector(".listContainer").innerHTML += `<div class=" do-list mt-5 container mt-5  text-center d-flex border border-dark border-2 rounded-1 ">
      <p id="list" class="align-self-center mt-3 text-head ${arrDo[i].completed === true ? "line-through" : ""}">${arrDo[i].text}
      </p>
      <button class="bg-white border-0 tick" onclick="done('${i}')"><i class="fa-solid fa-check fs-4"></i></button>
      <button class="bg-white border-0" onclick="remove('${i}')"><i class="fa-solid fa-trash fs-4"></i></button>
    </div> `;
  }
  document.querySelector("#inputText").value = "";
}

function remove(i) {
  arrDo.splice(i, 1);
  showList();
}

function done(i) {
  const div = document.querySelectorAll(".text-head");
  div.forEach(element => {
    if (arrDo[i].text === element.innerText) {
      arrDo[i].completed = !arrDo[i].completed
      showList()
    }
  });
  let flag = 1;
  for (let j = 0; j < arrComp.length; j++) {
    if (arrComp[j].text === arrDo[i].text) {
      flag = 0;
      arrComp.splice(j, 1)
      break;
    }
  }
  if (flag === 1) {
    arrComp.push(arrDo[i]);
  }
}

function completed() {
  document.querySelector(".listContainer").classList.add("hidden");
  document.querySelector(".compContainer").classList.remove("hidden");
  document.querySelector(".activeContainer").classList.add("hidden");
  document.querySelector(".compContainer").innerHTML = "";
  document.querySelector(".compContainer").innerHTML += `  <h2 class="text-center mt-3 text-success">Completed Tasks:</h2>`;
  for (let i = 0; i < arrComp.length; i++) {
    document.querySelector(".compContainer").innerHTML += ` <div class=" comp-list mt-5 container mt-5  text-center border border-success border-2 rounded-1 d-flex">
    <p id="completedList" class="p-2 text-success">${arrComp[i].text}</p>
    <button class="bg-white border-0" onclick="compTrash('${i}')"><i class="fa-solid fa-trash fs-4"></i></button>
    </div>`;
  }
}

function allContent() {
  showList();
}

function active() {
  arrActive = arrDo.filter(x => arrComp.indexOf(x) === -1);
  showActive();
}

function showActive() {
  document.querySelector(".listContainer").classList.add("hidden");
  document.querySelector(".compContainer").classList.add("hidden");
  document.querySelector(".activeContainer").classList.remove("hidden");
  document.querySelector(".activeContainer").innerHTML = "";
  document.querySelector(".activeContainer").innerHTML += `  <h2 class="text-center mt-3 text-danger">Active Tasks:</h2>`;
  for (let i = 0; i < arrActive.length; i++) {
    document.querySelector(".activeContainer").innerHTML += `<div class=" comp-list mt-5 container mt-5  text-center border border-danger border-2 rounded-1 d-flex">
  <p id="completedList" class="p-2 text-danger">${arrActive[i].text}</p>
  <button class="bg-white border-0" onclick="activeTrash('${i}')"><i class="fa-solid fa-trash fs-4"></i></button>
  </div>`;
  }
}

function clearComp() {
  arrDo = arrActive;
  arrComp.splice(0, arrComp.length);
  completed();
}

function compTrash(i) {
  for (let j=0; j<arrDo.length; j++){
    if(arrDo[j] ===arrComp[i]){
      arrDo.splice(j,1);
      arrComp.splice(i, 1);
      completed();
    }
}
}

function activeTrash(i) {
  for (let j=0; j<arrDo.length; j++){
    if(arrDo[j] === arrActive[i]){
      arrDo.splice(j,1);
      arrActive.splice(i, 1);
      showActive();
    }
  }
}