const table = document.getElementById('tableContainer');
const form = document.getElementById('form-container');
const url = "https://mock-api-template-rh6s.onrender.com/users";
const tablebody = document.getElementById('tablebody');

window.addEventListener("load", () => {
    fetchdata();
});

function fetchdata() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displaydata(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function displaydata(data) {
    tablebody.innerHTML = "";
    data.forEach(element => {
        const newRow = document.createElement("tr");
        const celluserId = document.createElement("td");
        const cellID = document.createElement("td");
        const celltitle = document.createElement("td");
        const cellcompleted = document.createElement("td");
        const cellDelete = document.createElement("td");
        const cellEdit = document.createElement("td");

        celluserId.textContent = element.userId;
        cellID.textContent = element.ID;
        celltitle.textContent = element.title;
        cellcompleted.textContent = element.completed;

        cellDelete.textContent = "Delete";
        cellDelete.addEventListener("click", async () => {
            let deletedata = confirm("Do you want to delete this element?");
            if (deletedata === true) {
                try {
                    let res = await fetch(url + "/" + element.ID, {
                        method: "DELETE"
                    });
                    console.log(res);
                    fetchdata();
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            }
        });

        cellEdit.textContent = "Update";
        cellEdit.addEventListener("click", () => {
            populateForm(element.ID, element.userId, element.title, element.completed);
        });

        newRow.append(celluserId, cellID, celltitle, cellcompleted, cellDelete, cellEdit);
        tablebody.appendChild(newRow);
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const userid = document.getElementById("userId").value;
    const id = document.getElementById("ID").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;
    const dataId = form.getAttribute("data-id");

    let obj = {
        userid: userid,
        id: id,
        title: title,
        completed: completed
    };

    if (dataId) {

        fetch(url + "/" + dataId, {
            method: 'PUT',
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchdata();
                alert("Data updated successfully");
                form.removeAttribute("data-id");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    } else {

        fetch(url, {
            method: 'POST',
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchdata();
                alert("Created successfully");
            })
            .catch((error) => {
                console.error("Error creating data:", error);
            });
    }


    form.reset();
});

function populateForm(id, userid, title, completed) {
    document.getElementById("userId").value = userid;
    document.getElementById("ID").value = id;
    document.getElementById("title").value = title;
    document.getElementById("completed").checked = completed;
    form.setAttribute("data-id", id);
}