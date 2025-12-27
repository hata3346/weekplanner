const calendar = document.getElementById('calendar');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksList = document.getElementById('tasks-list');

let selectedDate = null;
let tasks = {};

// Générer le calendrier du mois courant
function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayWeek = new Date(year, month, 1).getDay(); // 0=Dimanche

    calendar.innerHTML = '';

    // Ajouter des cases vides pour le début du mois
    for (let i = 0; i < firstDayWeek; i++) {
        const emptyDiv = document.createElement('div');
        calendar.appendChild(emptyDiv);
    }

    // Ajouter les jours
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = i;
        dayDiv.dataset.date = `${year}-${String(month + 1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;

        dayDiv.addEventListener('click', () => {
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            dayDiv.classList.add('selected');
            selectedDate = dayDiv.dataset.date;
            showTasks(selectedDate);
        });

        calendar.appendChild(dayDiv);
    }
}

// Afficher les tâches du jour sélectionné
function showTasks(date) {
    tasksList.innerHTML = '';
    if (tasks[date]) {
        tasks[date].forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `<span>${task.matiere}: ${task.name} (${task.duration} min)</span>
                                 <button class="delete-btn">❌</button>`;
            taskDiv.querySelector('.delete-btn').addEventListener('click', () => {
                tasks[date].splice(index, 1);
                showTasks(date);
            });
            tasksList.appendChild(taskDiv);
        });
    }
}

// Ajouter une tâche
addTaskBtn.addEventListener('click', () => {
    if (!selectedDate) {
        alert("Sélectionne d'abord un jour dans le calendrier !");
        return;
    }

    const matiere = document.getElementById('task-matiere').value.trim();
    const name = document.getElementById('task-name').value.trim();
    const duration = document.getElementById('task-duration').value.trim();

    if (!matiere || !name || !duration) {
        alert('Remplis tous les champs !');
        return;
    }

    if (!tasks[selectedDate]) tasks[selectedDate] = [];
    tasks[selectedDate].push({matiere, name, duration});

    showTasks(selectedDate);

    document.getElementById('task-matiere').value = '';
    document.getElementById('task-name').value = '';
    document.getElementById('task-duration').value = '';
});

// Initialisation
generateCalendar();
