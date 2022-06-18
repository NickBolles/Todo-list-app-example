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
const eventsSection = document.getElementById("plainJSEventsRecieved");

// Implementation, dump out info about the todos to content.innerHtml
content.innerHTML =
  "no access to todos, react.useState is not accessible outside of react";

//-------------------------------------
// End Setup
//-------------------------------------

// Plain JS consumption of the store
import * as messageAggregator from "./messageAggregator";

const localTodos = [];
const reRenderLocalTodos = () => {
  content.innerHTML = JSON.stringify(localTodos, null, 2);
};
reRenderLocalTodos();

//-------------------------------------
// Sync things to local JS from app
messageAggregator.onMessage("todo:toggle", (data) => {
  const index = localTodos.findIndex((v) => v.text === data.text);
  if (!localTodos[index]) {
    alert(
      "todo with text '" +
        JSON.stringify(data) +
        "' does not exist in localTodos, current todos are " +
        JSON.stringify(localTodos, null, 2)
    );
    return;
  }
  localTodos[index].complete = !localTodos[index].complete;
  reRenderLocalTodos();
});

messageAggregator.onMessage("todo:remove", (data) => {
  const index = localTodos.findIndex((v) => (v.text = data.text));
  delete localTodos[index];
  reRenderLocalTodos();
});
messageAggregator.onMessage("todo:add", (data) => {
  localTodos.push(data);
  reRenderLocalTodos();
});

//-------------------------------------
// dump all logs to
messageAggregator.onMessage("*", (data) => {
  const el = document.createElement("li");
  el.textContent = JSON.stringify(data);
  eventsSection.appendChild(el);
});

//-------------------------------------
// Dispatch an event back to the store
sendMsgButton.onclick = () =>
  messageAggregator.sendMessage("todo:toggleAll", {});
