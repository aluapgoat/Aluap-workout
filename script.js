
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const STORAGE_KEY = 'aluap-paragraphs';

function loadSavedParagraphs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    document.querySelectorAll('p[data-editable-id]').forEach(p => {
      const id = p.getAttribute('data-editable-id');
      if (saved[id] !== undefined) p.textContent = saved[id];
    });
  } catch (_) {}
}

function saveParagraph(id, text) {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  saved[id] = text;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

loadSavedParagraphs();

document.querySelectorAll('p[data-editable-id]').forEach(p => {
  p.setAttribute('contenteditable', 'true');
  p.classList.add('editable-paragraph');

  p.addEventListener('blur', function () {
    const id = this.getAttribute('data-editable-id');
    saveParagraph(id, this.textContent.trim());
  });
});
