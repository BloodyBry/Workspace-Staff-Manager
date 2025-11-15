# WorkSphere – Interactive Staff Management Application

WorkSphere is a web application designed for visual and interactive staff management inside workplace environments.  
It allows administrators to assign, move, and organize employees directly on a floor plan while enforcing role-based access rules.

---

## 🚀 Technologies Used
- **HTML5**
- **CSS3 / Bootstrap**
- **JavaScript**
- **Git / GitHub**
- **SEO Basics**

---

## 🎯 Project Goals
- Enable adding, moving, and removing employees through a visual interface.
- Enforce business rules based on employee roles and authorized zones.
- Display a real-time interactive floor plan with multiple rooms.
- Ensure responsive functionality across all devices.
- Centralize all staff-related data in one platform.

---

## 🗂️ Floor Plan Zones
The application includes **6 work areas**:
1. Conference Room  
2. Reception  
3. Server Room  
4. Security Room  
5. Staff Room  
6. Archive Room  

---

## 📌 Key Features (User Stories)

### 🔧 Front-End Development
- Create the full HTML structure with a sidebar listing **Unassigned Staff** and an **Add New Worker** button.
- Build the employee creation modal including:
  - Name  
  - Role  
  - Photo URL  
  - Email  
  - Phone  
  - Dynamic professional experiences (add multiple entries)  
- Implement image preview inside the modal.
- Display all building zones and their assigned staff on the main interface.
- Apply role-based access restrictions:
  - **Reception → Receptionists only**
  - **Server Room → IT Technicians only**
  - **Security Room → Security Agents only**
  - **Managers → Access everywhere**
  - **Cleaning Staff → Everywhere except Archive Room**
  - **Other roles → No access to restricted zones**
- Add a **remove (X)** button on each employee to return them to *Unassigned*.
- Open a detailed profile on click: large photo, full info, experiences, and current location.
- Add a **+** button in each zone to assign an eligible employee.
- Add an **Edit** button in the *Unassigned* list to modify employee information.
- Set employee limits per zone.
- Highlight empty required zones in light red.
- Make the interface fully responsive.
- Validate HTML and CSS using **W3C Validator**.
- Deploy the project on **GitHub Pages** or **Vercel**.

### 🧭 Scrum Master Tasks
- Organize user stories using Trello, Jira, or GitHub Projects.
- Optionally manage Git branching strategy.
- Present the final project demonstrating all dynamic features.

---

## 👤 Author
**Adnane EL YAZIDI (BloodyBry)**  
Web Developer  
GitHub: *https://github.com/BloodyBry*

