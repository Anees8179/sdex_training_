const tablebody = document.getElementById('tablebody');
const form = document.getElementById('form-1');
const url = "https://mock-api-template-rh6s.onrender.com/users";
const itemsPerPage = 10; 
let currentPage = 1; 
window.addEventListener("load", () => {
    fetchdata();
});

// function dark() {
//     const body = document.body;
//     body.classList.toggle('dark-mode');
// }
function dark() {
    const body = document.body;
    const table = document.getElementById('table');
    const form = document.getElementById('input-container');
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        table.classList.remove('dark-mode');
        form.classList.remove('dark-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        table.classList.add('dark-mode');
        form.classList.add('dark-mode');
    }
}

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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach(element => {
        const newRow = document.createElement("tr");
        const cellUserid = document.createElement("td");
        const cellid = document.createElement("td");
        const celltitle = document.createElement("td");
        const cellcompleted = document.createElement("td");
        const cellDelete = document.createElement("td");
        const cellEdit = document.createElement("td");

        cellUserid.textContent = element.userid;
        cellid.textContent = element.id;
        celltitle.textContent = element.title;
        cellcompleted.textContent = element.completed;

        cellDelete.textContent = "Delete";
        cellDelete.addEventListener("click", async () => {
            let deletedata = confirm("Do you want to delete this element?");
            if (deletedata === true) {
                try {
                    let res = await fetch(url + "/" + element.id, {
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
            populateForm(element);
        });

        newRow.append(cellUserid, cellid, celltitle, cellcompleted, cellDelete, cellEdit);
        tablebody.appendChild(newRow);
    });

 //  pagination controls
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            fetchdata();
        });
        paginationContainer.appendChild(pageButton);
    }
}
function populateForm(element) {
    document.getElementById("userid").value = element.userid;
    document.getElementById("pass").value = element.id;
    document.getElementById("title").value = element.title;
    document.getElementById("completed").checked = element.completed;
    form.setAttribute("data-id", element.id); 
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const userid = document.getElementById("userid").value;
    const id = document.getElementById("pass").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;
    let obj = {
        userid: userid,
        id: id,
        title: title,
        completed: completed
    };
    console.log(obj)
     const dataId = form.getAttribute("data-id");
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
                form.removeAttribute("data-id");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
        alert("Data updated successfully");
     }
      else 
    {
        if(!dataId){
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchdata();
            })
            .catch((error) => {
                console.error("Error creating data:", error);
            });
        alert("Created successfully");
        }
    }
    
});
