let arrDo = [];
function add() {
    document.getElementById('listContainer').innerHTML="";
    arrDo.unshift(document.getElementById("text").value);
    // document.getElementById('list').innerHTML = arrDo.join("<button onclick=remove()>Delete</button> <br>");
    for(let i=0;i<arrDo.length;i++) {
        document.getElementById('listContainer').innerHTML += `<div id="list" class="toDo-list d-flex justify-content-center mt-5 gap-3">
    <input class="taskList p-3" type="text" id="toDo">
    <button
      onclick="complete()"
      class="align-self-center bg-black text-white p-1 completeButton"
    >
      &#10003;
    </button>
    <button
      onclick="remove()"
      class="align-self-center bg-black text-white p-1 removeButton"
    >
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>`;
    }
   }
function remove() {
    arrDo.splice(index(),1);
}