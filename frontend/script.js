async function fetchNailPolishes(city) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/nailpolishes?city=${city}`
    );
    const data = await response.json();
    const location = document.getElementById("city");
    const exclusiveTableBody = document.getElementById(
      "exclusivenailpolishList"
    );
    const gelTableBody = document.getElementById("gelnailpolishList");
    const regularTableBody = document.getElementById("regularnailpolishList");
    const transparentTableBody = document.getElementById(
      "transparentnailpolishList"
    );
    location.innerHTML = "";
    exclusiveTableBody.innerHTML = "";
    gelTableBody.innerHTML = "";
    regularTableBody.innerHTML = "";
    transparentTableBody.innerHTML = "";

    // Function to add rows to the table
    const addRowsToTable = (tableBody, polishes) => {
      polishes.forEach((polish) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${polish.id}</td>
          <td>${polish.name}</td>
          <td>${polish.color}</td>
          <td>${polish.price}</td>
          <td>${polish.amount}</td>
        `;
        tableBody.appendChild(row);
      });
    };
    location.innerHTML = city;
    addRowsToTable(exclusiveTableBody, data.exclusivenailpolish);
    addRowsToTable(gelTableBody, data.gelnailpolish);
    addRowsToTable(regularTableBody, data.regularnailpolish);
    addRowsToTable(transparentTableBody, data.transparentnailpolish);
  } catch (err) {
    console.error("Error fetching nail polish data:", err);
  }
}

document.getElementById("lahtiBtn").addEventListener("click", () => {
  fetchNailPolishes("Lahti");
});

document.getElementById("lappeenrantaBtn").addEventListener("click", () => {
  fetchNailPolishes("Lappeenranta");
});

document.getElementById("jyvaskylaBtn").addEventListener("click", () => {
  fetchNailPolishes("Jyvaskyla");
});
