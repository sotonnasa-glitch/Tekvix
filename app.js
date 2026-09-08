const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('[data-route-link]');
const tools = {
  text: { title: 'تبدیل متن', icon: 'T', description: 'متنت را وارد کن تا آماده‌ی کار شود.' },
  image: { title: 'ابزار تصویر', icon: '▧', description: 'در این صفحه به‌زودی ابزارهای تصویر در دسترس خواهند بود.' },
  time: { title: 'زمان و تاریخ', icon: '◷', description: 'در این صفحه به‌زودی ابزارهای زمان و تاریخ در دسترس خواهند بود.' },
  code: { title: 'ابزار کد', icon: '</>', description: 'در این صفحه به‌زودی ابزارهای کد در دسترس خواهند بود.' }
};

function renderRoute() {
  const path = location.hash.slice(2) || 'home';
  const [section, toolName] = path.split('/');
  const page = section === 'tool' ? 'tool' : ['home', 'tools', 'about'].includes(section) ? section : 'home';
  pages.forEach((item) => item.classList.toggle('active', item.dataset.page === page));
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#/${page}`));
  if (page === 'tool') {
    const tool = tools[toolName] || tools.text;
    document.querySelector('#tool-title').textContent = tool.title;
    document.querySelector('#tool-description').textContent = tool.description;
    document.querySelector('#single-icon').textContent = tool.icon;
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', renderRoute);
document.querySelector('#clear-button').addEventListener('click', () => { document.querySelector('#tool-input').value = ''; });
document.querySelector('#copy-button').addEventListener('click', async () => {
  const button = document.querySelector('#copy-button');
  await navigator.clipboard.writeText(document.querySelector('#tool-input').value);
  button.textContent = 'کپی شد ✓';
  setTimeout(() => { button.textContent = 'کپی متن'; }, 1800);
});
renderRoute();
