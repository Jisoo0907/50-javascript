const todoInput = document.querySelector("#todo-input"); // 입력한 할 일 가져오기
const addButton = document.querySelector(".addButton"); // 추가 버튼
const todoList = document.querySelector(".list"); // ul 요소

/* localStorage에 할 일 저장 */
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* localStorage에서 할 일 불러오기 */
function getTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

/* UI 요소 생성하는 함수 */
function createTodoElement(todoText) {
  const newTodoList = document.createElement("li"); // 입력한 할 일을 추가할 li 요소
  const newTodo = document.createElement("span");
  const checkBox = document.createElement("input"); // checkbox
  const removeButton = document.createElement("button"); // 삭제 버튼

  // 기본 속성 설정
  newTodo.className = "new-todo";
  checkBox.type = "checkBox";
  newTodo.innerText = todoText;
  removeButton.className = "remove-button";
  removeButton.innerText = "삭제";

  // 요소 조립
  newTodoList.appendChild(checkBox);
  newTodoList.appendChild(newTodo);
  newTodoList.appendChild(removeButton);

  // 삭제 기능
  removeButton.addEventListener("click", () => {
    const todos = getTodos();
    const index = todos.findIndex((todo) => todo.text === todoText);

    if (index > -1) {
      todos.splice(index, 1);
      saveTodos(todos);
    }
    todoList.removeChild(newTodoList);
  });

  // 체크박스 체크 시 할 일 완료 됐다는 표시
  todoList.addEventListener("click", () => {
    if (checkBox.checked) {
      newTodo.classList.add("checked");
    } else {
      newTodo.classList.remove("checked");
    }
  });

  return newTodoList;
}

/* 할 일 추가하는 함수 */
function addTodo() {
  // 빈 입력 체크
  if (todoInput.value.trim().length === 0) {
    alert("할 일을 작성해주세요.");
    return;
  }

  // 기존 할 일 목록 가져오기
  const todos = getTodos();

  // 새로운 할 일 추가
  todos.push({
    text: todoInput.value,
    completed: false,
  });

  // localStorage에 저장
  saveTodos(todos);

  // UI에 추가(createTodoElement 함수 사용)
  const newTodoList = createTodoElement(todoInput.value);
  todoList.appendChild(newTodoList);

  // 입력창 비우기
  todoInput.value = "";
}

function renderTodos() {
  const todos = getTodos(); // localStorage에서 할 일 목록 가져오기
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo.text); // 각 할 일 요소 생성
    todoList.appendChild(todoElement); // 화면에 추가
  });
}

// 이벤트 리스너 연결
addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});
// 페이지 로드 시 할 일 목록 렌더링
document.addEventListener("DOMContentLoaded", renderTodos);
