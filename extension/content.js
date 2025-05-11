let video;
let isMuted = false;
let autoSkip = false;

// Load skip preference from storage
chrome.storage.sync.get(['autoSkip'], (result) => {
  autoSkip = result.autoSkip ?? false;
});

// Listen for changes to the setting in real time
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && 'autoSkip' in changes) {
    autoSkip = changes.autoSkip.newValue;
  }
});

function checkAd() {
  video = document.querySelector("video");
  if (!video) return;

  const adContainer = document.querySelector('.ad-showing');
  if (adContainer) {
    // mute if video is unmuted
    if (!video.muted) {
      video.muted = true;
      isMuted = true;
      console.log("ad detected, muted");
    }

    // skip if skippable
    if (autoSkip) {
      const skipBtn = document.querySelector('.ytp-skip-ad-button');
      if (skipBtn) {
        skipBtn.click();
        console.log("ad skip");
      }
    }

  } else if (isMuted) {
    video.muted = false;
    isMuted = false;
    console.log("ad end, unmuted");
  }
}

const observer = new MutationObserver(checkAd);
observer.observe(document.body, { childList: true, subtree: true });

setInterval(checkAd, 1000);