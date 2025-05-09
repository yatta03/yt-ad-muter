const checkbox = document.getElementById('skipToggle');

// load saved value
chrome.storage.sync.get(['autoSkip'], (result) => {
  checkbox.checked = result.autoSkip ?? false;
})

// save toggle state
checkbox.addEventListener('change', () => {
  chrome.storage.sync.set({ autoSkip: checkbox.checked });
})