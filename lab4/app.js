"use strict";
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        // Matching the exact IDs from your HTML
        this.inputEl = document.getElementById('taskInput');
        this.addBtnEl = document.getElementById('addButton');
        this.listEl = document.getElementById('taskList');
        this.itemsLeftEl = document.getElementById('itemsLeft');
        this.clearCompletedEl = document.getElementById('clearCompleted');
        this.clearAllEl = document.getElementById('clearAll');
        this.initListeners();
    }
    initListeners() {
        this.addBtnEl.addEventListener('click', () => this.addTodo());
        this.inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        this.clearCompletedEl.addEventListener('click', () => {
            this.todos = this.todos.filter(t => !t.completed);
            this.render();
        });
        this.clearAllEl.addEventListener('click', () => {
            this.todos = [];
            this.render();
        });
        // Filter buttons listener
        const filterButtons = document.querySelectorAll('.filters button');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                this.currentFilter = target.getAttribute('data-filter') || 'all';
                this.render();
            });
        });
    }
    addTodo() {
        const text = this.inputEl.value.trim();
        if (text === '')
            return;
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        this.todos.push(newTodo);
        this.inputEl.value = '';
        this.render();
    }
    render() {
        this.listEl.innerHTML = '';
        // Filter todos based on active filter button
        const filteredTodos = this.todos.filter(todo => {
            if (this.currentFilter === 'active')
                return !todo.completed;
            if (this.currentFilter === 'completed')
                return todo.completed;
            return true;
        });
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            if (todo.completed) {
                li.classList.add('completed');
            }
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
                this.render();
            });
            const span = document.createElement('span');
            span.textContent = todo.text;
            // Double-click to edit
            span.addEventListener('dblclick', () => {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.className = 'editInput';
                editInput.value = todo.text;
                li.replaceChild(editInput, span);
                editInput.focus();
                editInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const newText = editInput.value.trim();
                        if (newText !== '') {
                            todo.text = newText;
                        }
                        this.render();
                    }
                });
                editInput.addEventListener('blur', () => {
                    this.render();
                });
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑';
            deleteBtn.className = 'deleteButton';
            deleteBtn.addEventListener('click', () => {
                this.todos = this.todos.filter(t => t.id !== todo.id);
                this.render();
            });
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            this.listEl.appendChild(li);
        });
        const activeCount = this.todos.filter(t => !t.completed).length;
        this.itemsLeftEl.textContent = `${activeCount} items left`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
