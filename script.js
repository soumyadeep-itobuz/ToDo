const arrDo = [];
function add() {
  arrDo.push(document.getElementById("text").value);
  showList();
  console.log(arrDo);  
}

function showList(){
  document.getElementById('listContainer').innerHTML = ""; //empty the array
  console.log(arrDo.length);
  for (let i = 0; i < arrDo.length; i++) {
    document.getElementById('listContainer').innerHTML += ` <div class="d-flex border w-75 align-self-center justify-content-around gap-0 id="list"">
        <input class="taskList p-3 border-0" type="text" id="toDo" value="${arrDo[i]}"/>
        <button
          onclick="complete('${i}')"
          class="align-self-center bg-black text-white p-1 completeButton">&#10003;
        </button>
        <button
          onclick="remove('${i}')"
          class="align-self-center bg-black text-white p-1" id = "removeButton">
          <i class="fa-solid fa-trash-can"></i>
        </button>
    </div> `
  }
  document.querySelector("#text").value = "";
}

function remove(i) {
  arrDo.splice(i, 1);
  showList()
  console.log(arrDo);
}

