const { ipcRenderer } = require('electron');

document.getElementById('runButton').addEventListener('click', () => {
  ipcRenderer.send('run-python');
});

ipcRenderer.on('python-result', (event, result) => {
  document.getElementById('output').innerText = result;
});

// 切换页面显示内容
function showPage(pageId) {
  // 获取所有页面元素并隐藏
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // 显示选中的页面
  document.getElementById(pageId).classList.add('active');
}
