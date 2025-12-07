/**
 * Sistema de Gerenciamento de Tarefas (SGT)
 * Script unificado para a Single-Page Application (SPA).
 */
(function () {
    'use strict';

    // --- ELEMENTOS PRINCIPAIS ---
    const appContainer = document.getElementById('app');
    const mainMenu = document.getElementById('menu');

    // --- VARIÁVEIS DE ESTADO ---
    let currentTaskId = null; // Usado para editar, detalhar ou excluir uma tarefa

    // --- UTILITIES E NOTIFICAÇÕES ---
    const showToast = (message, type = 'info', duration = 3000) => {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, duration);
    };

    // --- GERENCIAMENTO DE DADOS (localStorage / sessionStorage) ---
    const db = {
        getUsers: () => JSON.parse(localStorage.getItem('sgt_users') || '[]'),
        saveUsers: (users) => localStorage.setItem('sgt_users', JSON.stringify(users)),
        getSession: () => JSON.parse(sessionStorage.getItem('sgt_session')),
        setSession: (user) => sessionStorage.setItem('sgt_session', JSON.stringify(user)),
        clearSession: () => sessionStorage.removeItem('sgt_session'),
        getTasks: (email) => JSON.parse(localStorage.getItem(`sgt_tasks_${email}`) || '[]'),
        saveTasks: (email, tasks) => localStorage.setItem(`sgt_tasks_${email}`, JSON.stringify(tasks)),
    };

    // --- REGRAS DE VALIDAÇÃO ---
    const validators = {
        fullName: (name) => name.trim().length >= 5 && /\s/.test(name.trim()),
        email: (email) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.com(\.br)?$/.test(email),
        password: (pass) => pass.length >= 8,
        title: (title) => title.trim().length >= 5,
        description: (desc) => !desc.trim() || desc.trim().length >= 3,
    };

    // --- LÓGICA DE RENDERIZAÇÃO E BINDING DE EVENTOS ---

    function bindLoginPage() {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.email.value.trim().toLowerCase();
            const senha = form.senha.value;
            if (!email || !senha) return showToast('Email e Senha são obrigatórios.', 'error');
            
            const users = db.getUsers();
            const user = users.find(u => u.email === email && u.senha === senha);
            if (user) {
                db.setSession(user);
                showToast(`Bem-vindo de volta, ${user.nome.split(' ')[0]}!`, 'success');
                setTimeout(() => showPage('dashboard'), 1000);
            } else {
                showToast('Email ou senha inválidos.', 'error');
            }
        });
    }

    function bindCadastroPage() {
        const form = document.getElementById('cadastroForm');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const nome = form.nome.value;
            const email = form.email.value.toLowerCase();
            const senha = form.senha.value;
            const confirmar = form.confirmar.value;

            if (!validators.fullName(nome)) return showToast('Nome deve ter 5+ caracteres e um espaço.', 'error');
            if (!validators.email(email)) return showToast('Formato de email inválido.', 'error');
            if (!validators.password(senha)) return showToast('Senha deve ter no mínimo 8 caracteres.', 'error');
            if (senha !== confirmar) return showToast('As senhas não coincidem.', 'error');
            
            const users = db.getUsers();
            if (users.some(u => u.email === email)) return showToast('Este email já está cadastrado.', 'error');

            users.push({ nome: nome.trim(), email, senha });
            db.saveUsers(users);
            showToast('Cadastro realizado com sucesso!', 'success');
            setTimeout(() => showPage('login'), 1500);
        });
    }
    
    function bindDashboardPage() {
        const session = db.getSession();
        if (!session) return showPage('login');

        const tasksGrid = document.getElementById('tasksGrid');
        tasksGrid.innerHTML = '';

        const tasks = db.getTasks(session.email);

        if (tasks.length === 0) {
            tasksGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">Nenhuma tarefa encontrada. Clique em "Nova Tarefa" para começar!</p>`;
            return;
        }

        tasks.forEach(task => {
            const statusMap = { pendente: '🔴', em_andamento: '🟡', concluida: '🟢' };
            const card = document.createElement('article');
            card.className = 'task-card';
            card.innerHTML = `
                <div class="task-card-header">
                    <h3>${task.titulo}</h3>
                    <span title="${task.status.replace('_', ' ')}">${statusMap[task.status] || ''}</span>
                </div>
                <div class="task-card-body">
                    <p>${task.descricao || 'Sem descrição.'}</p>
                </div>
                <div class="task-card-footer">
                    <button data-task-id="${task.id}" class="btn btn-secondary btn-details">👁️ Detalhes</button>
                    <button data-task-id="${task.id}" class="btn btn-secondary btn-edit">✏️ Editar</button>
                </div>`;
            
            card.querySelector('.btn-edit').addEventListener('click', (e) => {
                currentTaskId = e.currentTarget.dataset.taskId;
                showPage('editar-tarefa');
            });

            card.querySelector('.btn-details').addEventListener('click', (e) => {
                currentTaskId = e.currentTarget.dataset.taskId;
                showPage('detalhes-tarefa');
            });

            tasksGrid.appendChild(card);
        });
    }

    function bindCriarTarefaPage() {
        const form = document.getElementById('criarTarefaForm');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const session = db.getSession();
            const titulo = form.titulo.value;
            const descricao = form.descricao.value;
            const status = form.status.value;

            if (!validators.title(titulo)) return showToast('Título deve ter 5+ caracteres.', 'error');
            if (!validators.description(descricao)) return showToast('Descrição (se preenchida) deve ter 3+ caracteres.', 'error');

            const tasks = db.getTasks(session.email);
            const newTask = { 
                id: Date.now().toString(), 
                titulo: titulo.trim(), 
                descricao: descricao.trim(), 
                status,
                createdAt: new Date().toISOString()
            };
            tasks.push(newTask);
            db.saveTasks(session.email, tasks);

            showToast('Tarefa criada com sucesso!', 'success');
            setTimeout(() => showPage('dashboard'), 1000);
        });
    }

    function bindEditarTarefaPage() {
        if (!currentTaskId) return showPage('dashboard');

        const session = db.getSession();
        const task = db.getTasks(session.email).find(t => t.id === currentTaskId);
        if (!task) {
            showToast('Tarefa não encontrada.', 'error');
            return showPage('dashboard');
        }

        const form = document.getElementById('editarTarefaForm');
        form.titulo.value = task.titulo;
        form.descricao.value = task.descricao;
        form.status.value = task.status;

        form.addEventListener('submit', e => {
            e.preventDefault();
            const titulo = form.titulo.value;
            const descricao = form.descricao.value;
            const status = form.status.value;
            
            if (!validators.title(titulo)) return showToast('Título deve ter 5+ caracteres.', 'error');
            if (!validators.description(descricao)) return showToast('Descrição (se preenchida) deve ter 3+ caracteres.', 'error');
            
            const tasks = db.getTasks(session.email);
            const taskToUpdate = tasks.find(t => t.id === currentTaskId);
            if (taskToUpdate) {
                taskToUpdate.titulo = titulo.trim();
                taskToUpdate.descricao = descricao.trim();
                taskToUpdate.status = status;
                db.saveTasks(session.email, tasks);
                showToast('Tarefa alterada com sucesso!', 'success');
            }
            
            currentTaskId = null;
            setTimeout(() => showPage('dashboard'), 1000);
        });

        document.getElementById('btn-delete').addEventListener('click', () => {
            showPage('confirmar-exclusao');
        });
    }
    
    function bindDetalhesTarefaPage() {
        if (!currentTaskId) return showPage('dashboard');
        
        const session = db.getSession();
        const task = db.getTasks(session.email).find(t => t.id === currentTaskId);
        if (!task) {
            showToast('Tarefa não encontrada.', 'error');
            return showPage('dashboard');
        }

        const container = document.getElementById('detalhes-container');
        const statusMap = { pendente: 'Pendente', em_andamento: 'Em Andamento', concluida: 'Concluída' };
        
        container.innerHTML = `
            <div class="task-detail-item">
                <div class="label">Título</div>
                <div class="value">${task.titulo}</div>
            </div>
            <div class="task-detail-item">
                <div class="label">Status</div>
                <div class="value">${statusMap[task.status] || 'N/A'}</div>
            </div>
            <div class="task-detail-item">
                <div class="label">Descrição</div>
                <div class="value">${task.descricao || 'Nenhuma descrição fornecida.'}</div>
            </div>
             <div class="task-detail-item">
                <div class="label">Data de Criação</div>
                <div class="value">${new Date(task.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'long', timeZone: 'UTC' })}</div>
            </div>
            <div class="task-actions">
                <button onclick="showPage('dashboard')" class="btn btn-primary">Voltar</button>
            </div>
        `;
    }

    function bindConfirmarExclusaoPage() {
        if (!currentTaskId) return showPage('dashboard');

        const session = db.getSession();
        const task = db.getTasks(session.email).find(t => t.id === currentTaskId);

        const messageEl = document.getElementById('confirm-delete-message');
        if (task && messageEl) {
            messageEl.innerHTML = `Tem certeza que deseja excluir a tarefa "<strong>${task.titulo}</strong>"?`;
        }

        document.getElementById('confirm-delete-btn').addEventListener('click', () => {
            let updatedTasks = db.getTasks(session.email).filter(t => t.id !== currentTaskId);
            db.saveTasks(session.email, updatedTasks);

            showToast('Tarefa excluída com sucesso!', 'success');
            currentTaskId = null;
            setTimeout(() => showPage('dashboard'), 1000);
        });
    }

    // --- FUNÇÕES GLOBAIS DE NAVEGAÇÃO ---

    function showPage(pageId) {
        const template = document.getElementById(pageId);
        if (!template) {
            console.error(`Template com id "${pageId}" não encontrado.`);
            return;
        }

        const session = db.getSession();
        const protectedPages = ['dashboard', 'criar-tarefa', 'editar-tarefa', 'detalhes-tarefa', 'confirmar-exclusao'];

        if (protectedPages.includes(pageId) && !session) {
            showToast('Você precisa estar logado para acessar esta página.', 'error');
            return showPage('login');
        }

        mainMenu.style.display = 'none';
        appContainer.innerHTML = '';
        appContainer.appendChild(template.content.cloneNode(true));

        switch (pageId) {
            case 'login': bindLoginPage(); break;
            case 'cadastro': bindCadastroPage(); break;
            case 'dashboard': bindDashboardPage(); break;
            case 'criar-tarefa': bindCriarTarefaPage(); break;
            case 'editar-tarefa': bindEditarTarefaPage(); break;
            case 'detalhes-tarefa': bindDetalhesTarefaPage(); break;
            case 'confirmar-exclusao': bindConfirmarExclusaoPage(); break;
        }
    }

    function logout() {
        db.clearSession();
        showToast('Você saiu da sua conta.', 'info');
        showMenu();
    }

    function showMenu() {
        appContainer.innerHTML = '';
        mainMenu.style.display = 'block';
    }

    // --- INICIALIZAÇÃO ---
    window.showPage = showPage;
    window.logout = logout;
    window.showMenu = showMenu;

})();