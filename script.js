// Array de datos para almacenar las obras
let projects = [];

// Cargar datos del localStorage al iniciar
function loadProjects() {
    const stored = localStorage.getItem('projects');
    if (stored) {
        projects = JSON.parse(stored);
    } else {
        // Datos de ejemplo iniciales
        projects = [
            {
                id: 1,
                name: 'Obra 1',
                category: 'Puentes',
                link: 'https://docs.google.com/spreadsheets/d/1aggZPBWbjeta0iUmP1OsYZvKzYbIJXMzypJ1RtGDv_w/edit?gid=1011148052#gid=1011148052',
                description: 'Proyecto de construcción del puente viaducto norte'
            },
            {
                id: 2,
                name: 'Obra 2',
                category: 'Edificios',
                link: 'https://docs.google.com/spreadsheets/d/11yYhccN7Y7DawZngFV8X49YNsefALTZQW_AbbbrAPEU/edit?gid=1011148052#gid=1011148052',
                description: 'Proyecto arquitectónico y de ingeniería del nuevo edificio'
            },
            {
                id: 3,
                name: 'Obra 3',
                category: 'Vías',
                link: 'https://docs.google.com/spreadsheets/d/1b7ceR17gvAYjzHGBIrugqhyfe9TPnU1-jlgA0qna6Vk/edit?gid=1998489909#gid=1998489909',
                description: 'Ampliación y mejoramiento de la carretera panamericana'
            },
            {
                id: 4,
                name: 'Sistema de Alcantarillado',
                category: 'Infraestructura',
                link: 'https://docs.google.com',
                description: 'Renovación del sistema de alcantarillado municipal'
            }
        ];
        saveProjects();
    }
    renderProjects();
}

// Guardar datos en localStorage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Renderizar proyectos
function renderProjects(filter = '') {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';

    let filtered = projects.filter(project => 
        project.name.toLowerCase().includes(filter.toLowerCase()) ||
        project.category.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        projectsList.innerHTML = '<div class="empty-message">No se encontraron obras. Agrega una nueva.</div>';
        return;
    }

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.name}</h3>
                <span class="project-category">${project.category}</span>
            </div>
            <p class="project-description">${project.description || 'Sin descripción'}</p>
            <div class="project-actions">
                <a href="${project.link}" target="_blank" class="btn-link">📂 Abrir</a>
                <button class="btn-delete" onclick="deleteProject(${project.id})">🗑️ Eliminar</button>
            </div>
        `;
        projectsList.appendChild(card);
    });
}

// Buscar proyectos
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        renderProjects(e.target.value);
    });
});

// Abrir modal
function openAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'block';
}

// Cerrar modal
function closeAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('addProjectModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Agregar proyecto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addProjectForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const newProject = {
                id: Date.now(),
                name: document.getElementById('projectName').value,
                category: document.getElementById('projectCategory').value,
                link: document.getElementById('projectLink').value,
                description: document.getElementById('projectDescription').value
            };

            projects.push(newProject);
            saveProjects();
            renderProjects();

            // Limpiar formulario y cerrar modal
            form.reset();
            closeAddProjectModal();
        });
    }
});

// Eliminar proyecto
function deleteProject(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta obra?')) {
        projects = projects.filter(p => p.id !== id);
        saveProjects();
        renderProjects();
    }
}