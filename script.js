// Array de datos para almacenar las obras
let projects = [];

// Cargar datos del localStorage al iniciar
function loadProjects() {

    // Limpiar localStorage para aplicar cambios
    localStorage.removeItem('projects');
    
    const stored = localStorage.getItem('projects');
    if (stored) {
        projects = JSON.parse(stored);
    } else {
        // Datos de ejemplo iniciales
        projects = [
            {
                id: 1,
                name: 'B200 F&A',
                category: 'Edificaciones',
                description: 'Proyecto de construcción del puente viaducto norte',
                hasOptions: true,
                options: [
                    {
                        name: 'Registro Diario',
                        links: [
                            { label: 'Formulario', url: 'https://forms.gle/aUuE2mBGoVD58qtf8' },
                            { label: 'Registro Diario B200 F&A', url: ' https://docs.google.com/spreadsheets/d/1aggZPBWbjeta0iUmP1OsYZvKzYbIJXMzypJ1RtGDv_w/edit?gid=1011148052#gid=1011148052' }
                        ]
                    },
                    {
                        name: 'Registro Observaciones',
                        links: [
                            { label: 'Formulario', url: 'https://forms.gle/G1p5AgEyfpYBZuZc9' },
                            { label: 'Registro obs B200 F&A', url: 'https://docs.google.com' }
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: 'PDR SJL',
                category: 'Edificaciones',
                description: 'Proyecto arquitectónico y de ingeniería del nuevo edificio',
                hasOptions: true,
                options: [
                    {
                        name: 'CIMA',
                        hasSubcategories: true,
                        subcategories: [
                            {
                                name: 'Registro Diario',
                                links: [
                                    { label: 'Formulario', url: 'https://forms.gle/aUuE2mBGoVD58qtf8' },
                                    { label: 'Registro Diario PDR SJL', url: 'https://docs.google.com/spreadsheets/d/1vfHDfWHaEDXDPa1O0xoiFgdMoS2uxfrzw-pZjGZd04s/edit?gid=1011148052#gid=1011148052' }
                                ]
                            },
                            {
                                name: 'Registro Observaciones',
                                links: [
                                    { label: 'Formulario', url: 'https://forms.gle/G1p5AgEyfpYBZuZc9' },
                                    { label: 'Registro obs PDR SJL - CIMA', url: 'https://docs.google.com/spreadsheets/d/1Uh55NdhOpsx0CZrKenyXqBO9vbJYiBMa0zC01kHTGd8/edit?gid=0#gid=0' }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'RM',
                        hasSubcategories: true,
                        subcategories: [
                            {
                                name: 'Registro Diario',
                                links: [
                                    { label: 'Formulario', url: 'https://forms.gle/aUuE2mBGoVD58qtf8' },
                                    { label: 'Registro Diario PDR SJL', url: 'https://docs.google.com/spreadsheets/d/1vfHDfWHaEDXDPa1O0xoiFgdMoS2uxfrzw-pZjGZd04s/edit?gid=1011148052#gid=1011148052' }
                                ]
                            },
                            {
                                name: 'Registro Observaciones',
                                links: [
                                    { label: 'Formulario', url: 'https://forms.gle/G1p5AgEyfpYBZuZc9' },
                                    { label: 'Registro obs PDR SJL - RM', url: '#' }
                                ]
                            }
                        ]
                    }
                ]
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
        let actionHTML = '';
        
        if (project.hasOptions) {
            actionHTML = `<button onclick="openProjectOptions(${project.id})" class="btn-link">📂 Abrir</button>`;
        } else {
            actionHTML = `<a href="${project.link}" target="_blank" class="btn-link">📂 Abrir</a>`;
        }
        
        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.name}</h3>
                <span class="project-category">${project.category}</span>
            </div>
            <p class="project-description">${project.description || 'Sin descripción'}</p>
            <div class="project-actions">
                ${actionHTML}
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

// Abrir opciones de proyecto
function openProjectOptions(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.hasOptions) return;
    
    const modal = document.getElementById('projectOptionsModal');
    const optionsContainer = document.getElementById('optionsContainer');
    
    optionsContainer.innerHTML = `
        <h2>${project.name}</h2>
        <div class="options-list">
    `;
    
    project.options.forEach((option, index) => {
        optionsContainer.innerHTML += `<div class="option-item"><button class="option-toggle" onclick="toggleOption(${projectId}, ${index})">▶ ${option.name}</button><div id="option-${projectId}-${index}" class="option-content collapsed">`;
        
        if (option.hasSubcategories) {
            // Mostrar subcategorías dentro del option-content
            optionsContainer.innerHTML += `<div class="subcategories-list">`;
            option.subcategories.forEach((subcategory, subIndex) => {
                optionsContainer.innerHTML += `<button class="subcategory-btn" onclick="selectSubcategory(${projectId}, ${index}, ${subIndex})">${subcategory.name}</button>`;
            });
            optionsContainer.innerHTML += `</div>`;
            
            // Crear divs para cada subcategoría dentro del option-content
            option.subcategories.forEach((subcategory, subIndex) => {
                optionsContainer.innerHTML += `<div id="subcategory-content-${projectId}-${index}-${subIndex}" class="subcategory-content" style="display: none;"><div class="option-links"></div></div>`;
            });
        } else {
            // Mostrar links directamente para opciones sin subcategorías
            optionsContainer.innerHTML += `<div class="option-links">`;
            option.links.forEach(link => {
                optionsContainer.innerHTML += `<a href="${link.url}" target="_blank" class="option-link-btn">${link.label}</a>`;
            });
            optionsContainer.innerHTML += `</div>`;
        }
        
        optionsContainer.innerHTML += `</div></div>`;
    });
    
    optionsContainer.innerHTML += `
        </div>
    `;
    
    modal.style.display = 'block';
}

// Seleccionar subcategoría
function selectSubcategory(projectId, optionIndex, subcategoryIndex) {
    const project = projects.find(p => p.id === projectId);
    const option = project.options[optionIndex];
    const subcategory = option.subcategories[subcategoryIndex];
    
    const contentDiv = document.getElementById(`subcategory-content-${projectId}-${optionIndex}-${subcategoryIndex}`);
    const linksDiv = contentDiv.querySelector('.option-links');
    
    // Toggle: si está visible, ocultarlo; si no, mostrarlo
    if (contentDiv.style.display === 'block') {
        contentDiv.style.display = 'none';
    } else {
        // Ocultar otros subcategorías abiertos
        for (let i = 0; i < option.subcategories.length; i++) {
            const otherDiv = document.getElementById(`subcategory-content-${projectId}-${optionIndex}-${i}`);
            if (otherDiv) {
                otherDiv.style.display = 'none';
            }
        }
        
        // Mostrar el actual
        linksDiv.innerHTML = '';
        subcategory.links.forEach(link => {
            if (link.url === '#') {
                // Si no hay URL, mostrar como botón deshabilitado
                linksDiv.innerHTML += `
                    <button class="option-link-btn" disabled style="opacity: 0.5; cursor: not-allowed;">${link.label} (Por definir)</button>
                `;
            } else {
                linksDiv.innerHTML += `
                    <a href="${link.url}" target="_blank" class="option-link-btn">${link.label}</a>
                `;
            }
        });
        
        contentDiv.style.display = 'block';
    }
}

// Toggle opción desplegable
function toggleOption(projectId, index) {
    const optionContent = document.getElementById(`option-${projectId}-${index}`);
    const button = event.target;
    
    if (optionContent.classList.contains('collapsed')) {
        optionContent.classList.remove('collapsed');
        button.textContent = button.textContent.replace('▶', '▼');
    } else {
        optionContent.classList.add('collapsed');
        button.textContent = button.textContent.replace('▼', '▶');
    }
}

// Cerrar modal de opciones
function closeProjectOptionsModal() {
    document.getElementById('projectOptionsModal').style.display = 'none';
}

// Cerrar modal de opciones al hacer clic fuera
window.onclick = function(event) {
    const addModal = document.getElementById('addProjectModal');
    const optionsModal = document.getElementById('projectOptionsModal');
    
    if (event.target == addModal) {
        addModal.style.display = 'none';
    }
    if (event.target == optionsModal) {
        optionsModal.style.display = 'none';
    }
}