const todoInput = document.querySelector("#todo-input"); // 입력한 할 일 가져오기
const addButton = document.querySelector(".addButton");
const todoList = document.querySelector(".list");

/* 새 할 일 생성하기 */
addButton.addEventListener("click", () => {
  // 버튼 클릭 시 추가하는 로직
  const checkBox = document.createElement("input");
  const newTodo = document.createElement("label");
  const newTodoList = document.createElement("li");
  const removeButton = document.createElement("button");

  newTodo.className = "new-todo";
  checkBox.type = "checkBox";
  newTodo.innerText = todoInput.value;
  removeButton.className = "remove-button";
  removeButton.innerText = "삭제";

  newTodoList.appendChild(checkBox);
  newTodoList.appendChild(newTodo);
  newTodoList.appendChild(removeButton);
  todoList.appendChild(newTodoList);
  todoInput.value = ""; // 리스트에 추가 후 input 비우기
});
