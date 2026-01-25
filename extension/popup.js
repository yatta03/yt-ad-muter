const checkbox = document.getElementById('skipToggle');
const muteCheckbox = document.getElementById('muteToggle');

// load saved value
chrome.storage.sync.get(['autoSkip', 'autoMute'], (result) => {
  checkbox.checked = result.autoSkip ?? false;
  muteCheckbox.checked = result.autoMute ?? true;
})

// save toggle state
checkbox.addEventListener('change', () => {
  chrome.storage.sync.set({ autoSkip: checkbox.checked });
})
muteCheckbox.addEventListener('change', () => {
  chrome.storage.sync.set({ autoMute: muteCheckbox.checked });
})