const addWorkerBtn = document.getElementById("addWorkerBtn");
const modal = document.getElementById("addWorkerModal");
const closeBtn = document.querySelector(".close");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const experiencesList = document.getElementById("experiencesList");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const saveWorkerBtn = document.getElementById("saveWorkerBtn");
const staffList = document.getElementById("staffList");

const workerInfoModal = document.getElementById("workerInfoModal");
const closeInfoModal = document.getElementById("closeInfoModal");
const workerInfoContent = document.getElementById("workerInfoContent");


addWorkerBtn.addEventListener("click", () => modal.style.display = "flex");
closeBtn.addEventListener("click", () => modal.style.display = "none");
closeInfoModal.addEventListener("click", () => workerInfoModal.style.display = "none");


window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
    if (e.target === workerInfoModal) workerInfoModal.style.display = "none";
});

// Ajouter les experiences //
addExperienceBtn.addEventListener("click", () => {
    const expDiv = document.createElement("div");
    expDiv.classList.add("experience-item");

    expDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Company</label>
            <span class="delete-exp" style="cursor:pointer; font-size:18px; font-weight:bold; color:#ff4d4d;">×</span>
        </div>
        <input type="text" class="exp-company" placeholder="Company name" required>
        <label>Role</label>
        <input type="text" class="exp-role" placeholder="Role" required>
        <label>From</label>
        <input type="date" class="exp-from" required>
        <label>To</label>
        <input type="date" class="exp-to">
    `;

    expDiv.querySelector(".delete-exp").addEventListener("click", () => expDiv.remove());
    experiencesList.appendChild(expDiv);
});


photoInput.addEventListener("change", function() {
    const file = photoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        photoPreview.src = e.target.result;
        photoPreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
});

// Sauvegarder woorker//
saveWorkerBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value;

    if (!name || !role) {
        alert("Please fill all required fields.");
        return;
    }

    // Collect experiences
    const experienceDivs = experiencesList.querySelectorAll(".experience-item");
    const experiences = [];
    experienceDivs.forEach(exp => {
        const company = exp.querySelector(".exp-company").value;
        const roleExp = exp.querySelector(".exp-role").value;
        const from = exp.querySelector(".exp-from").value;
        const to = exp.querySelector(".exp-to").value;
        experiences.push({ company, role: roleExp, from, to });
    });


    const file = photoInput.files[0];
    let photoURL = "default.png"; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addWorkerToList(name, role, e.target.result, experiences);
        };
        reader.readAsDataURL(file);
    } else {
        addWorkerToList(name, role, photoURL, experiences);
    }

    // Renitialiser le form
    modal.style.display = "none";
    document.getElementById("workerForm").reset();
    photoPreview.classList.add("hidden");
    experiencesList.innerHTML = "";
});

//  add worker to list and show their infos//
function addWorkerToList(name, role, photoURL, experiences = []) {
    const workerDiv = document.createElement("div");
    workerDiv.classList.add("worker-card");
    workerDiv.style.cssText = `
        display: flex; align-items: center; gap: 10px;
        padding: 10px; background: #f5f5f5; border-radius: 8px;
        margin-bottom: 10px; cursor: pointer;
    `;
    workerDiv.innerHTML = `
        <img src="${photoURL}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;">
        <div>
            <strong>${name}</strong><br>
            <small>${role}</small>
        </div>
    `;

    // Show info modal
    workerDiv.addEventListener("click", () => {
        let expHtml = "";
        if (experiences.length > 0) {
            expHtml = "<p><strong>Experiences:</strong></p><ul>";
            experiences.forEach(exp => {
                expHtml += `<li>${exp.company} - ${exp.role} (${exp.from} → ${exp.to || "Present"})</li>`;
            });
            expHtml += "</ul>";
        } else {
            expHtml = "<p><strong>Experiences:</strong> None</p>";
        }

        workerInfoContent.innerHTML = `
            <img src="${photoURL}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Role:</strong> ${role}</p>
            ${expHtml}
        `;
        workerInfoModal.style.display = "flex";
    });

    staffList.appendChild(workerDiv);
}
