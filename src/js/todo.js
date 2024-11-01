const todoInput = document.querySelector("#todo-input"); // 입력한 할 일 가져오기
const addButton = document.querySelector(".addButton"); // 추가 버튼
const todoList = document.querySelector(".list"); // ul 요소

let date = new Date();
const today = document.querySelector(".today");
const now = `${date.getFullYear()}년 ${
  date.getMonth() + 1
}월 ${date.getDate()}일`;
today.appendChild(document.createTextNode(now));

/* localStorage에 할 일 저장 */
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* localStorage에서 할 일 불러오기 */
function getTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

/* 할 일 삭제 */
function removeTodo(todoText, todoElement) {
  // 저장된 전체 할 일 배열 가져옴
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.text === todoText);

  if (index > -1) {
    todos.splice(index, 1);
    saveTodos(todos);
  }
  todoList.removeChild(todoElement);
}

/* 할 일 체크 상태 토글 함수 */
function toggleTodoCompleted(todoText, checkBox, todoSpan) {
  const todos = getTodos();
  // 전체 할 일 중 사용자가 클릭한 할 일(todoText와 일치하는) 찾음
  // 찾은 할 일의 완료 상태(completed)를 업데이트하고 다시 저장해야 함
  // find()는 객체 자체를 반환
  const todo = todos.find((todo) => todo.text === todoText);

  if (todo) {
    todo.completed = checkBox.checked;
    saveTodos(todos);
  }

  todoSpan.classList.toggle("checked", checkBox.checked);
}

/* UI 요소 생성하는 함수(새로운 할 일 목록 생성) */
function createTodoElement(todoText, isCompleted = false) {
  const newTodoList = document.createElement("li"); // 입력한 할 일을 추가할 li 요소
  const newTodo = document.createElement("span");
  const checkBox = document.createElement("input"); // checkbox
  const removeButton = document.createElement("button"); // 삭제 버튼

  // 기본 속성 설정
  newTodo.className = "new-todo";
  checkBox.type = "checkBox";
  checkBox.checked = isCompleted;
  newTodo.innerText = todoText;
  removeButton.className = "removeButton";
  removeButton.innerText = "X";
  removeButton.setAttribute("aria-label", `${todoText} 삭제`);

  // 초기 상태 설정
  if (isCompleted) {
    newTodo.classList.add("checked");
  }

  // 요소 조립
  newTodoList.appendChild(checkBox);
  newTodoList.appendChild(newTodo);
  newTodoList.appendChild(removeButton);

  // 체크박스 이벤트 리스너
  checkBox.addEventListener("change", () => {
    toggleTodoCompleted(todoText, checkBox, newTodo);
  });

  // 삭제 버튼 이벤트 리스너
  removeButton.addEventListener("click", () => {
    removeTodo(todoText, newTodoList);
  });

  return newTodoList;
}

/* 생성된 할 일 요소를 화면에 표시 */
function appendTodo(todoElement) {
  todoList.appendChild(todoElement);
}

/* 할 일 추가하는 함수 */
function addTodo(todoText, isCompleted = false) {
  const todos = getTodos();
  // 빈 입력 체크
  if (todoInput.value.trim().length === 0) {
    alert("할 일을 작성해주세요.");
    return;
  }
  // 새로운 할 일 추가
  todos.push({
    text: todoText,
    completed: false,
  });
  // localStorage에 저장
  saveTodos(todos);

  // UI에 추가(createTodoElement 함수 사용)
  const newTodoList = createTodoElement(todoText, isCompleted);
  appendTodo(newTodoList);

  // 입력창 비우기
  todoInput.value = "";
}

function renderTodos() {
  const todos = getTodos();

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo.text, todo.completed); // 각 할 일 요소 생성
    appendTodo(todoElement); // 화면에 추가
  });
}

// 이벤트 리스너 연결
addButton.addEventListener("click", () => addTodo(todoInput.value));

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo(todoInput.value);
  }
});
// 페이지 로드 시 할 일 목록 렌더링
document.addEventListener("DOMContentLoaded", renderTodos);
