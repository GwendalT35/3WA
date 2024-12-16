// Initialise les tâches depuis le localStorage ou utilise des tâches par défaut
const defaultTasks = [
    { title: "Apprendre mon cours de JavaScript", priority: 1 },
    { title: "Créer mon compte Github", priority: 2 },
    { title: "Répondre à mes emails", priority: 3 },
];
const tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks;

const formDom = document.getElementById("list");
const ul = document.createElement("ul");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
    if (ul.children.length > 0) deleteChildren();
    // Trie les tâches par priorité (1 = haute, 2 = moyenne, 3 = basse)
    const sortedTasks = tasks.sort((a, b) => a.priority - b.priority);

    sortedTasks.forEach(task => {
        // Crée les éléments HTML
        const li = document.createElement("li");
        const label = document.createElement("label");
        const inputCheckbox = document.createElement("input");

        // Configure les éléments
        inputCheckbox.type = "checkbox";
        inputCheckbox.classList.add("taskCheckbox");
        label.innerText = task.title;

        // Ajoute la classe en fonction de la priorité
        const priorityClass = {
            1: "highPriority",
            2: "mediumPriority",
            3: "lowPriority",
        }[task.priority] || ""; // Définit une classe vide si la priorité est inconnue

        label.classList.add(priorityClass);

        // Assemble les éléments
        li.appendChild(inputCheckbox);
        li.appendChild(label);
        ul.appendChild(li);
    });

    // Ajoute la liste à l'élément DOM cible
    formDom.appendChild(ul);
}

function deleteChildren() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function appendTask(event) {
    // Empêche la soumission du formulaire et le rechargement de la page
    event.preventDefault();

    // Récupère les données
    let taskText = document.getElementById("inputTaskText").value.trim();
    let priorityNumber = parseInt(document.getElementById("priority").value, 10);

    // Vérifie que les données sont valides
    if (!taskText) {
        alert("Veuillez entrer une description de tâche.");
        return;
    }

    if (![1, 2, 3].includes(priorityNumber)) {
        alert("Veuillez sélectionner une priorité valide.");
        return;
    }

    // Ajoute la tâche à la liste
    tasks.push({ title: taskText, priority: priorityNumber });

    // Sauvegarde dans le localStorage
    saveTasks();

    // Recharge la liste des tâches
    loadTask();

    // Réinitialise le formulaire
    document.getElementById("inputTaskText").value = "";
    document.getElementById("priority").value = "1";
}

function deleteSelectedTask() {
    // Récupère toutes les cases cochées
    const checkboxes = document.querySelectorAll(".taskCheckbox:checked");

    if (checkboxes.length === 0) {
        alert("Aucune tâche sélectionnée pour suppression.");
        return;
    }

    // Supprime les tâches correspondantes
    checkboxes.forEach(checkbox => {
        const taskTitle = checkbox.nextSibling.textContent;
        const taskIndex = tasks.findIndex(task => task.title === taskTitle);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1); // Supprime la tâche du tableau
        }
    });

    // Sauvegarde dans le localStorage
    saveTasks();

    // Affiche une notification
    createToast(checkboxes.length);

    // Recharge la liste des tâches
    loadTask();
}

function createToast(nbr = 0) {
    let notificationDom = document.getElementById("notification");
    let pDom = document.querySelector("p");
    pDom.innerText = `${nbr} élément(s) supprimé(s)`;
    notificationDom.style.visibility = "";
    notificationDom.style.border =  "1px red solid";
    setTimeout(() => {
        notificationDom.style.visibility = "hidden";
    }, 2000);
}

// Charge les tâches au chargement initial
loadTask();