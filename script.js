let arrDo = [];
const arrComp = [];
let arrActive = [];
document.querySelector(".listContainer").classList.add("hidden");
document.querySelector(".compContainer").classList.add("hidden");
document.querySelector(".activeContainer").classList.add("hidden");
let ip = document.querySelector("#inputText");
ip.addEventListener("keydown", function (e) {
  if (e.code === "Enter") add();
});
function add() {
  let temp = 1;
  if (ip.value.trim() == "") {
    temp = -1;
  }
  else {
    for (let i = 0; i < arrDo.length; i++) {
      if (arrDo[i] === ip.value) {
        temp = 0;
        break;
      }
    }
  }
  if (temp === 1) {
    arrDo.push({
      text:ip.value,
      completed:false
    });
    showList();
  }
  else if (temp === 0) {
    alert("Task Already Exists");
  }
  else {
    alert("Empty Task Not Allowed !!");
    document.querySelector("#inputText").value = "";
  }
}
function showList() {
  document.querySelector(".listContainer").classList.remove("hidden");
  document.querySelector(".compContainer").classList.add("hidden");
  document.querySelector(".activeContainer").classList.add("hidden");
  document.querySelector(".listContainer").innerHTML = "";
  document.querySelector(
    ".listContainer"
  ).innerHTML += `  <h2 class="text-center mt-3">Today's Tasks:</h2>`;
  for (let i = 0; i < arrDo.length; i++) {
    // if(document.querySelector(".done")){
      document.querySelector(
        ".listContainer"
      ).innerHTML += `<div class=" do-list mt-5 container mt-5  text-center d-flex border border-dark border-2 rounded-1 ">
      <p id="list" class="align-self-center mt-3 text-head ${arrDo[i].completed===true?"line-through":""}">${arrDo[i].text}
      </p>
      <button class="bg-white border-0 tick" onclick="done('${i}')"><i class="fa-solid fa-check fs-4"></i></button>
      <button class="bg-white border-0" onclick="remove('${i}')"><i class="fa-solid fa-trash fs-4"></i></button>
    </div> `;
    }
    // else{
    //   document.querySelector(
    //     ".listContainer"
    //   ).innerHTML += `<div class="do-list mt-5 container mt-5  text-center d-flex border border-dark border-2 rounded-1 ">
    //   <p id="list" class="align-self-center mt-3 text-head">${arrDo[i]}
    //   </p>
    //   <button class="bg-white border-0 tick" onclick="done('${i}')"><i class="fa-solid fa-check fs-4"></i></button>
    //   <button class="bg-white border-0" onclick="remove('${i}')"><i class="fa-solid fa-trash fs-4"></i></button>
    // </div> `;
    // }
  document.querySelector("#inputText").value = "";

  }

function remove(i) {
  arrDo.splice(i, 1);
  showList(); 
}
function done(i) {
  console.log(arrDo[i].text);
  const div = document.querySelectorAll(".text-head");
 
  div.forEach(element => {
    console.log(element.innerText);
    if (arrDo[i].text === element.innerText) {
      console.log("hii");
      // element.classList.add("line-through");
      // element.classList.add("done");
      arrDo[i].completed=!arrDo[i].completed
      showList()
    }
  });
  console.log(arrDo);
  let flag = 1;
  for (let j = 0; j < arrComp.length; j++) {
    if (arrComp[j] === arrDo[i]) {
      flag = 0;
      break;
    }
  }
  if (flag === 1) {
    arrComp.push(arrDo[i]);
  }
  else
    arrComp.pop(arrDo[i]);
}
function completed() {
  document.querySelector(".listContainer").classList.add("hidden");
  document.querySelector(".compContainer").classList.remove("hidden");
  document.querySelector(".activeContainer").classList.add("hidden");
  document.querySelector(".compContainer").innerHTML = "";
  document.querySelector(
    ".compContainer"
  ).innerHTML += `  <h2 class="text-center mt-3 text-success">Completed Tasks:</h2>`;
  for (let i = 0; i < arrComp.length; i++) {
    document.querySelector(
      ".compContainer"
    ).innerHTML += `<div class=" comp-list mt-5 container mt-5  text-center border border-success border-2 rounded-1 p-3 ${arrComp[i].completed===true?"line-through":""}">
  ${arrComp[i].text}
  </div>`;
  }
}
function allContent() {
  showList();
}
function active() {
  arrActive = arrDo.filter(x => arrComp.indexOf(x) === -1);
  document.querySelector(".listContainer").classList.add("hidden");
  document.querySelector(".compContainer").classList.add("hidden");
  document.querySelector(".activeContainer").classList.remove("hidden");
  document.querySelector(".activeContainer").innerHTML = "";
  document.querySelector(
    ".activeContainer"
  ).innerHTML += `  <h2 class="text-center mt-3 text-danger">Active Tasks:</h2>`;
  for (let i = 0; i < arrActive.length; i++) {
    document.querySelector(
      ".activeContainer"
    ).innerHTML += `<div class=" comp-list mt-5 container mt-5  text-center border border-danger border-2 rounded-1 p-3">
  ${arrActive[i].text} `;
  }
}
function clearComp() {
  arrDo = arrActive;
  arrComp.splice(0, arrComp.length);
  completed();
}