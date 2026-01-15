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
                description: 'Proyecto de implementación de oficinas corporativas',
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
                        name: 'Registro de Observaciones',
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
                description: 'Supervisión integral de infraestructura para servicios funerarios',
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
                category: 'General',
                link: 'Por definir',
                description: 'Por definir'
            },
            {
                id: 4,
                name: 'Obra 4',
                category: 'General',
                link: 'Por definir',
                description: 'Por definir'
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
            actionHTML = `<button onclick="openProjectOptions(${project.id})" class="btn-link">📥 Ingresar</button>`;
        } else {
            actionHTML = `<a href="${project.link}" target="_blank" class="btn-link">📥 Ingresar</a>`;
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

// Función principal para abrir opciones de CUALQUIER proyecto
function openProjectOptions(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.hasOptions) return;
    
    const modal = document.getElementById('projectOptionsModal');
    const optionsContainer = document.getElementById('optionsContainer');
    
    optionsContainer.innerHTML = `<h2>${project.name}</h2><div class="options-list"></div>`;
    const list = optionsContainer.querySelector('.options-list');
    
    project.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';

        // NIVEL 2: Categorías principales (CIMA, RM, Registro Diario en B200, etc.)
        let innerHTML = `
            <button class="option-toggle" onclick="toggleOption(${projectId}, ${index})">
                ▶ ${option.name}
            </button>
            <div id="option-${projectId}-${index}" class="option-content collapsed">
        `;

        // Si tiene subcategorías (NIVEL 3), creamos más desplegables
        if (option.hasSubcategories && option.subcategories) {
            option.subcategories.forEach((subcategory, subIndex) => {
                const subId = `sub-${projectId}-${index}-${subIndex}`;
                innerHTML += `
                    <div class="subcategory-wrapper">
                        <button class="subcategory-btn" onclick="toggleSubcategory('${subId}')">
                            ▶ ${subcategory.name}
                        </button>
                        <div id="${subId}" class="subcategory-content collapsed">
                            <div class="option-links">
                                ${generateLinksHTML(subcategory.links)}
                            </div>
                        </div>
                    </div>`;
            });
        } else if (option.links) {
            // Si NO tiene subcategorías, pero tiene links directos (como en B200 F&A)
            innerHTML += `<div class="option-links">${generateLinksHTML(option.links)}</div>`;
        }

        innerHTML += `</div>`; 
        optionItem.innerHTML = innerHTML;
        list.appendChild(optionItem);
    });
    
    modal.style.display = 'block';
}

// Función auxiliar para generar los botones de links
function generateLinksHTML(links) {
    if (!links) return '';
    return links.map(link => `
        <a href="${link.url}" target="_blank" class="option-link-btn">
            ${link.label}
        </a>
    `).join('');
}

// Maneja el despliegue del Nivel 3 (Subcategorías)
function toggleSubcategory(subId) {
    const content = document.getElementById(subId);
    const btn = event.currentTarget;
    
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        btn.innerHTML = btn.innerHTML.replace('▶', '▼');
    } else {
        content.classList.add('collapsed');
        btn.innerHTML = btn.innerHTML.replace('▼', '▶');
    }
}

// Maneja el despliegue del Nivel 2 (Categorías principales)
function toggleOption(projectId, index) {
    const optionContent = document.getElementById(`option-${projectId}-${index}`);
    const btn = event.currentTarget;
    
    if (optionContent.classList.contains('collapsed')) {
        optionContent.classList.remove('collapsed');
        btn.innerHTML = btn.innerHTML.replace('▶', '▼');
    } else {
        optionContent.classList.add('collapsed');
        btn.innerHTML = btn.innerHTML.replace('▼', '▶');
    }
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