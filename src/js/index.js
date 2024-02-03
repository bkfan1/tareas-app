document.addEventListener("DOMContentLoaded", cargarTodos);

function crearTodo() {
  var inputTodo = document.getElementById("newTodo");
  var todoText = inputTodo.value.trim();

  if (todoText !== "") {
    var todoList = obtenerTodos();
    var nuevoTodo = {
      id: Date.now(),
      texto: todoText,
      completado: false,
      fecha_creacion: new Date().toLocaleString("VE"),
    };
    todoList.push(nuevoTodo);
    guardarTodos(todoList);
    inputTodo.value = "";
    mostrarTodos();
  }
}

function eliminarTodo(id) {
  var todoList = obtenerTodos();
  var nuevosTodos = todoList.filter(function (todo) {
    return todo.id !== id;
  });
  guardarTodos(nuevosTodos);
  mostrarTodos();
}

function toggleCompletado(id) {
  var todoList = obtenerTodos();
  var modTodos = todoList.map(function (todo) {
    if (todo.id === id) {
      todo.completado = !todo.completado;
    }
    return todo;
  });
  guardarTodos(modTodos);
  mostrarTodos();
}

function obtenerTodos() {
  var todoListString = localStorage.getItem("todos");
  return todoListString ? JSON.parse(todoListString) : [];
}

function guardarTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function mostrarTodos() {
  var todoList = obtenerTodos();
  var listaHTML = document.getElementById("todoList");
  listaHTML.innerHTML = "";

  const emptyContainerStyles = [
    "flex",
    "justify-center",
    "items-center",
    "bg-slate-100",
  ];

  if (todoList.length === 0) {
    listaHTML.classList.add(...emptyContainerStyles);
    listaHTML.innerHTML = `<div class="text-center"><h1 class="text-orange-500 font-semibold">Sin tareas</h1><p class="text-gray-500">Añade una tarea para empezar.</p></div>`;
    return;
  }

  listaHTML.classList.remove(...emptyContainerStyles);

  todoList.forEach(function (todo) {
    var listItem = document.createElement("li");
    listItem.setAttribute("id", `todo_${todo.id}`);

    const listItemStyles = [
      "flex",
      "flex-row",
      "justify-between",
      "items-center",
      "p-2",
      "rounded-sm",
      "hover:bg-slate-100",
      "ease-in-out",
      "duration-75",
    ];

    listItem.classList.add(...listItemStyles);
    listItem.innerHTML = `
          <div class="flex flex-row items-center gap-2">
            <i class="bi ${
              todo.completado ? "bi-check-circle-fill" : "bi-circle"
            } text-xl text-orange-500 " onClick="toggleCompletado(${
      todo.id
    })" title="${todo.completado ? "Desmarcar" : "Marcar"}" ></i>
          <p class="max-w-48 truncate ...">${
            todo.completado ? `<del>${todo.texto}</del>` : `${todo.texto}`
          }</p>
          
            </div>
            <menu class="flex flex-row items-center gap-2">

              <button onclick="eliminarTodo(${
                todo.id
              })" class="p-1 w-10 h-10 rounded-sm bg-red-500 text-white" title="Eliminar tarea" ><i class="bi bi-trash"></i></button>

              <button onclick="mostrarDetalles(${
                todo.id
              })" class="p-1 w-10 h-10 rounded-sm bg-green-500 text-white" title="Detalles de tarea"><i class="bi bi-info-circle"></i></button>
             
              
            </menu>
         
        `;
    listaHTML.appendChild(listItem);
  });
}

function cargarTodos() {
  mostrarTodos();
}

function mostrarDetalles(id) {
  var todoList = obtenerTodos();
  var tarea = todoList.find(function (todo) {
    return todo.id === id;
  });

  if (tarea) {
    var modalTitle = document.getElementById("modalTitle");
    var modalDetails = document.getElementById("modalDetails");
    var modalFecha = document.getElementById("modalFecha");

    modalTitle.textContent = tarea.texto;
    modalDetails.textContent = tarea.completado ? "Completada" : "Pendiente";
    modalFecha.textContent = tarea.fecha_creacion;

    // Mostrar la modal
    document.getElementById("modal").style.display = "flex";
  }
}

// Nueva función para cerrar la modal
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}
