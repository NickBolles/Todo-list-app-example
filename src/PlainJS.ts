const html = `
  <div class="section">
    <h3>Plain JS access to todos</h3>
    <div id="plainJSContent"></div>
    <br />
    <button id="plainJSSendMessage">Send toggle all Message</button>
    <br />
    <pre id="plainJSEventsRecieved">
    </pre>
  </div>
`;
const container = document.createElement("div");
container.innerHTML = html;
document.body.appendChild(container);
const content = document.getElementById("plainJSContent");
const sendMsgButton = document.getElementById("plainJSSendMessage");
// const eventsSection = document.getElementById("plainJSEventsRecieved");

// Implementation, dump out info about the todos to content.innerHtml
content.innerHTML =
  "no access to todos, react.useState is not accessible outside of react";

//-------------------------------------
// End Setup
//-------------------------------------

// Plain JS consumption of the store
import { RootState, store } from "./store";
import { toggleAllTodos } from "./store/todos/TodosSlice";

let localTodos = store.getState().todos;
const reRenderLocalTodos = () => {
  content.innerHTML = JSON.stringify(localTodos, null, 2);
};
reRenderLocalTodos();

const printRefComparisonsForStore = (state: RootState) => {
  console.log(
    "state updated, todos === ?",
    state.todos.entities === localTodos.entities
  );
  if (state.todos && localTodos) {
    const entities = state.todos.entities;
    for (const id in entities) {
      console.log(
        `state updated for todo ${id}, todos === ?`,
        entities[id] === localTodos.entities[id]
      );
    }
  }
};
store.subscribe(() => {
  const state = store.getState();
  printRefComparisonsForStore(state);
  localTodos = state.todos;
  reRenderLocalTodos();
});

//-------------------------------------
// dump all logs to dom
// Removed - there are no more messages

//-------------------------------------
// Dispatch an event back to the store
sendMsgButton.onclick = () => {
  store.dispatch(toggleAllTodos());
};
