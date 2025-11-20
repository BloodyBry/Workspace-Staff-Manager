const addWorkerBtn = document.getElementById("addWorkerBtn");
const modal = document.getElementById("addWorkerModal");
const closeBtn = document.querySelector(".close");


addWorkerBtn.addEventListener("click", () => {
    modal.style.display = "flex";   
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none"; 
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


const addExperienceBtn = document.getElementById("addExperienceBtn");
const experiencesList = document.getElementById("experiencesList");

addExperienceBtn.addEventListener("click", () => {
    const expDiv = document.createElement("div");
    expDiv.classList.add("experience-item");

    expDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Company</label>
            <span class="delete-exp"
                style="
                    cursor:pointer;
                    font-size:18px;
                    font-weight:bold;
                    color:#ff4d4d;
                    margin-left:10px;
                ">
                ×
            </span>
        </div>

        <input type="text" class="exp-company" placeholder="Company name" required>

        <label>Role</label>
        <input type="text" class="exp-role" placeholder="Role" required>

        <label>From</label>
        <input type="date" class="exp-from" required>

        <label>To</label>
        <input type="date" class="exp-to">
    `;

    expDiv.querySelector(".delete-exp").addEventListener("click", () => {
        expDiv.remove();
    });

    experiencesList.appendChild(expDiv);
});




const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");

photoInput.addEventListener("change", function () {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        photoPreview.src = e.target.result;
        photoPreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
});



const saveWorkerBtn = document.getElementById("saveWorkerBtn");
const staffList = document.getElementById("staffList");

saveWorkerBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value;
    const file = photoInput.files[0];

    if (!name || !role) {
        alert("Please fill all required fields.");
        return;
    }

    let photoURL = "default.png"; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoURL = e.target.result;
            addWorkerToList(name, role, photoURL);
        };
        reader.readAsDataURL(file);
    } else {
        addWorkerToList(name, role, photoURL);
    }

    modal.style.display = "none";
    document.getElementById("workerForm").reset();
    photoPreview.classList.add("hidden");
    experiencesList.innerHTML = "";
});




function addWorkerToList(name, role, photoURL) {

    const workerDiv = document.createElement("div");
    workerDiv.classList.add("worker-card");

    workerDiv.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 8px;
        margin-bottom: 10px;
    `;

    workerDiv.innerHTML = `
        <img src="${photoURL}" 
             style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
        
        <div>
            <strong>${name}</strong><br>
            <small>${role}</small>
        </div>
    `;

    staffList.appendChild(workerDiv);
}
