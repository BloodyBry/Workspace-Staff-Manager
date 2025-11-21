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

const roomRoleRules = {
    "reception": ["Réceptionniste", "Manager"],
    "server-room": ["Technicien IT", "Manager"],
    "security-room": ["Agent de sécurité", "Manager"],
    "archives": ["Manager"],
    "conference-room": ["Manager", "Nettoyage", "Autre"],
    "staff-room": ["Manager", "Nettoyage", "Autre"]
};


addWorkerBtn.addEventListener("click", () => modal.style.display = "flex");
closeBtn.addEventListener("click", () => modal.style.display = "none");
closeInfoModal.addEventListener("click", () => workerInfoModal.style.display = "none");


window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
    if (e.target === workerInfoModal) workerInfoModal.style.display = "none";
});

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
    const email = document.getElementById("email").value.trim();

    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !role || !email) {
        alert("Please fill all required fields.");
        return;
    }

    if (!nameRegex.test(name)) {
        alert("Veuillez Entrer un nom valide");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Veuillez Entrer un email valide");
        return;
    }

    // Collecter experiences
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
            addWorkerToList(name, role, e.target.result, experiences, email);
        };
        reader.readAsDataURL(file);
    } else {
        addWorkerToList(name, role, photoURL, experiences, email);
    }

    // Renitialiser le form
    modal.style.display = "none";
    document.getElementById("workerForm").reset();
    photoPreview.classList.add("hidden");
    experiencesList.innerHTML = "";
});

//  add worker to list st afficher leur infos//
function addWorkerToList(name, role, photoURL, experiences = [], email) {
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


    workerDiv.addEventListener("click", () => {
        let expHtml = "";
        if (experiences.length > 0) {
            expHtml = "<p><strong>Experiences:</strong></p><ul>";
            experiences.forEach(exp => {
                expHtml += `<li>${exp.company} - ${exp.role} (From ${exp.from} to ${exp.to || "Present"})</li>`;
            });
            expHtml += "</ul>";
        } else {
            expHtml = "<p><strong>Experiences:</strong> None</p>";
        }

        // workerInfoContent.innerHTML = `
        //     <img src="${photoURL}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;">
        //     <p><strong> ${name}</strong> </p>
        //     <p>${role}</p>
        //     ${expHtml}
        // `;

        workerInfoContent.innerHTML = `
            <div class="worker-header">
                <img src="${photoURL}" alt="${name}">
                <div class="worker-details">
                    <p><strong>${name}</strong></p>
                    <p>${role}</p>
                    <p>${email}</p>
                </div>
            </div>
            <div class="worker-experiences">
                ${expHtml}
            </div>
        `;


        workerInfoModal.style.display = "flex";
    });

    staffList.appendChild(workerDiv);
}


function ensureAssignModalExists() {
    let assignModal = document.getElementById('assignModal');
    if (assignModal) return assignModal;

    assignModal = document.createElement('div');
    assignModal.id = 'assignModal';
    assignModal.className = 'modal';
    assignModal.innerHTML = `
        <div class="modal-content">
            <span id="closeAssignModal" class="close">&times;</span>
            <h2 style="color: rgb(44, 139, 223); margin-top:0;">Select a Worker</h2>
            <div id="assignList" style="max-height: 50vh; overflow:auto; margin-top:10px;"></div>
        </div>
    `;
    document.body.appendChild(assignModal);
    return assignModal;
}

const assignModal = ensureAssignModalExists();
const closeAssignModal = document.getElementById('closeAssignModal');
const assignList = document.getElementById('assignList');

document.querySelectorAll('.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const roomId = e.currentTarget.id; 
        openAssignModal(roomId);
    });
});

function openAssignModal(roomId) {
    assignModal.dataset.room = roomId; 
    populateAssignList();
    assignModal.style.display = 'flex';
}


closeAssignModal && closeAssignModal.addEventListener('click', () => assignModal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target === assignModal) assignModal.style.display = 'none';
});

function populateAssignList() {
    assignList.innerHTML = '';

    const cards = staffList.querySelectorAll('.worker-card');
    if (!cards.length) {
        assignList.innerHTML = '<p>No workers available. Add workers first.</p>';
        return;
    }

    cards.forEach(card => {
        const imgEl = card.querySelector('img');
        const nameEl = card.querySelector('strong');
        const roleEl = card.querySelector('small');
        const deleteBtn = card.querySelector('.delete-worker');

        const item = document.createElement('div');
        item.style.cssText = 'display:flex;align-items:center;gap:10px;padding:8px;cursor:pointer;border-bottom:1px solid #eee;';

        const photoSrc = imgEl ? imgEl.src : 'default.png';
        const workerName = nameEl ? nameEl.textContent.trim() : 'Unknown';
        const workerRole = roleEl ? roleEl.textContent.trim() : '';

        item.innerHTML = `
            <img src="${photoSrc}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;">
            <div style="flex:1;">
                <div style="font-weight:600;">${workerName}</div>
                <div style="font-size:12px;color:#666;">${workerRole}</div>
            </div>
        `;

        item.addEventListener('click', () => {
            const roomId = assignModal.dataset.room;
            const allowedRoles = roomRoleRules[roomId] || [];

            if (!allowedRoles.includes(workerRole)) {
                alert(`${workerName} (${workerRole}) cannot be assigned to this room.`);
                return;
            }

            assignWorkerToRoom({ name: workerName, photo: photoSrc });
        });


        assignList.appendChild(item);
    });


}

function assignWorkerToRoom(worker) {
    const roomId = assignModal.dataset.room;
    if (!roomId) return;

    const plusBtn = document.getElementById(roomId);
    if (!plusBtn) return;

    const roomDiv = plusBtn.closest('.room-content');
    if (!roomDiv) return;

    let container = roomDiv.querySelector('.room-workers');
    if (!container) {
        container = document.createElement('div');
        container.className = 'room-workers';
        roomDiv.appendChild(container);
    }


    const wEl = document.createElement('div');
    wEl.className = 'room-worker';
    wEl.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px;border-radius:6px;background:rgba(255,255,255,0.9);margin-top:8px;';

    wEl.innerHTML = `
        <img src="${worker.photo}" style="width:34px;height:34px;border-radius:50%;object-fit:cover;">
        <span style="font-weight:600;">${worker.name}</span>
        <span class="remove-assigned" style="margin-left:auto;cursor:pointer;color:#ff4d4d;font-weight:700;">×</span>
    `;

    wEl.querySelector('.remove-assigned').addEventListener('click', () => {
        wEl.remove();
    });

    container.appendChild(wEl);



    assignModal.style.display = 'none';
}

