
        const tablebody = document.getElementById('tablebody');
        const form = document.getElementById('form-1');
        const url = "https://mock-api-template-rh6s.onrender.com/users";

        const itemsPerPage = 10; // Number of items to display per page
        let currentPage = 1; // Current page

        window.addEventListener("load", () => {
            fetchdata();
        });

        async function fetchdata() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                displaydata(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
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

            // Add pagination controls
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

 
