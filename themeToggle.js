document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = "🌙";
    }
  });
});
