const handlers = {};

export const sendMessage = (msg, data) => {
  const list = handlers[msg] || [];
  list.forEach((v) => {
    v(data);
  });
  if (msg !== "*") {
    sendMessage("*", { ...data, message: msg });
  }
};

export const removeHandler = (msg, callback) => {
  handlers[msg] = handlers[msg].filter((v) => v !== callback);
};

export const onMessage = (msg, callback) => {
  handlers[msg] = [...(handlers[msg] || []), callback];
};
