const form = document.getElementById('project-form');
const list = document.getElementById('project-list');

let projects = JSON.parse(localStorage.getItem('projects') || '[]');

function save() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function render() {
  list.innerHTML = '';
  projects.forEach((p, idx) => {
    const li = document.createElement('li');

    const header = document.createElement('div');
    header.className = 'project-header';

    const title = document.createElement('div');
    title.textContent = p.name;

    const remove = document.createElement('button');
    remove.textContent = '✕';
    remove.className = 'remove-btn';
    remove.addEventListener('click', () => {
      projects.splice(idx, 1);
      save();
      render();
    });

    header.appendChild(title);
    header.appendChild(remove);
    li.appendChild(header);

    if (p.description) {
      const desc = document.createElement('div');
      desc.textContent = p.description;
      li.appendChild(desc);
    }

    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    const fill = document.createElement('div');
    fill.style.width = `${p.progress}%`;
    bar.appendChild(fill);
    li.appendChild(bar);

    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const progress = parseInt(document.getElementById('progress').value, 10) || 0;

  projects.push({ name, description, progress });
  save();
  render();
  form.reset();
});

render();
