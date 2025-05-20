function updateCount(id, delta) {
    const input = document.getElementById(id);
    let value = parseInt(input.value) || 0;
    value = Math.max(0, value + delta);
    input.value = value;
}

function updateChildren(delta) {
    const input = document.getElementById('children');
    let value = parseInt(input.value) || 0;
    value = Math.max(0, value + delta);
    input.value = value;
    updateChildrenAgeFields(value);
}

function updateChildrenAgeFields(nbChildren) {
    const container = document.getElementById("childrenAgesContainer");
    container.innerHTML = "";
    for (let i = 1; i <= nbChildren; i++) {
        const div = document.createElement("div");
        div.className = "mb-2";
        div.innerHTML = `<input type="number" name="age${i}" class="form-control" placeholder="Âge enfant ${i}" min="0">`;
        container.appendChild(div);
    }
    document.getElementById("ageRow").style.display = nbChildren > 0 ? 'table-row' : 'none';
}

function resetForm() {
    updateChildrenAgeFields(0);
    document.getElementById("confirmation").classList.add("d-none");
}

document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;
    const rooms = document.getElementById("rooms").value;
    const workTrip = document.getElementById("workTrip").checked ? "Oui" : "Non";
    const arrival = document.getElementById("arrival").value;
    const departure = document.getElementById("departure").value;

    let childrenAges = "";
    for (let i = 1; i <= children; i++) {
        const age = document.querySelector(`[name="age${i}"]`)?.value || "-";
        childrenAges += `<li>Enfant ${i} : ${age} ans</li>`;
    }

    const confirmation = `
      <h5 class="text-primary">Confirmation de réservation</h5>
      <p><strong>Arrivée :</strong> ${arrival}</p>
      <p><strong>Départ :</strong> ${departure}</p>
      <p><strong>Adultes :</strong> ${adults}</p>
      <p><strong>Enfants :</strong> ${children}</p>
      ${children > 0 ? `<ul>${childrenAges}</ul>` : ""}
      <p><strong>Chambres :</strong> ${rooms}</p>
      <p><strong>Voyage pro :</strong> ${workTrip}</p>
    `;

    const confDiv = document.getElementById("confirmation");
    confDiv.innerHTML = confirmation;
    confDiv.classList.remove("d-none");
});

document.addEventListener("DOMContentLoaded", () => {
    const initial = parseInt(document.getElementById("children").value) || 0;
    updateChildrenAgeFields(initial);
});

function resetForm() {
    updateChildrenAgeFields(0);
    document.getElementById("confirmation").innerHTML = `
        <h5 class="text-primary">Confirmation de réservation</h5>
        <p>Aucune réservation en cours.</p>
    `;
}