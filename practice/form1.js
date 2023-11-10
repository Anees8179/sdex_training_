const form = document.getElementById("task-form");
const table = document.querySelector("table");
var userId;
function formInsertion(userId, id, title, completed, action) {
  var newRow = table.insertRow();
  var row = document.createElement("tr");
  var cell0 = document.createElement("td");
  var cell0Text = document.createTextNode(userId);
  cell0.appendChild(cell0Text);
  row.appendChild(cell0);
  var cell1 = document.createElement("td");
  var cell1Text = document.createTextNode(id);
  cell1.appendChild(cell1Text);
  row.appendChild(cell1);
  var cell2 = document.createElement("td");
  var cell2Text = document.createTextNode(title);
  cell2.appendChild(cell2Text);
  row.appendChild(cell2);
  var cell3 = document.createElement("td");
  var cell3Text = document.createTextNode("completed");
  cell3.appendChild(cell3Text);
  row.appendChild(cell3);
  var cell4 = document.createElement("td");
  var cell4Text = document.createTextNode("action");
  cell4.appendChild(action);
  row.appendChild(cell4);
  table.appendChild(row);
  form.reset();
}
function updateRow(row) {
  var userId1 = prompt("enter userId value: ");
  var existingUser = false;
  fetch("https://mock-api-template-rh6s.onrender.com/users")
      .then((response) => {
          if (response.ok) {
              return response.json();
          }
          throw new Error("Something went wrong");
      })
      .then((data) => {
          for (let i = 0; i < data.length; i++) {
              if (data[i].userid === userId1) {
                  existingUser = true;
                  break;
              }
          }
          if (existingUser) {
              alert("User already exists!");
          } else {
            formInsertion(
              data[i].userid,
              data[i].id,
              data[i].title,
              data[i].completed,
              actiondiv
            );
          }
      })
      .catch(myError);
}


form.addEventListener("submit", function (event) {
   userId = document.getElementById("userId").value;
  var id = document.getElementById("ID").value;
  var title = document.getElementById("title").value;
  var completed = document.getElementById("completed").checked;
  event.preventDefault();
  //formInsertion(userId, id, title, completed, "Actions");
});
function generateTable(data) {
  for (let i = 0; i < data.length; i++) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>
      deleteRow(deleteButton.parentNode.parentNode)
    );
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => updateRow(updateButton.row));
    const actiondiv = document.createElement("div");
    actiondiv.appendChild(deleteButton);
    actiondiv.appendChild(updateButton);

    formInsertion(
      data[i].userid,
      data[i].id,
      data[i].title,
      data[i].completed,
      actiondiv
    );
  }
}
fetch("https://mock-api-template-rh6s.onrender.com/users")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Something went wrong");
  })
  .then((data) => generateTable(data))
  .catch(myError);
function myError(error) {
  console.log(error);
}

function deleteRow(row) {
  row.parentNode.remove();
}
fetch("https://mock-api-template-rh6s.onrender.com/users")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to delete data from the backend.");
    }
  })
  .then((row) => deleteRow(row))
  .catch(myError);
function myError(error) {
  console.log(error);
}
