const { ipcRenderer } = require('electron');

document.getElementById('runButton').addEventListener('click', () => {
  ipcRenderer.send('run-python');
});

ipcRenderer.on('python-result', (event, result) => {
  document.getElementById('output').innerText = result;
});
