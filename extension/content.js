let video;
let isMuted = false;
let autoSkip = false;
let autoMute = true;

// Load preference setting from storage
chrome.storage.sync.get(['autoSkip', 'autoMute'], (result) => {
  autoSkip = result.autoSkip ?? false;
  autoMute = result.autoMute ?? true;
});

// Listen for changes to the setting in real time
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && 'autoSkip' in changes) {
    autoSkip = changes.autoSkip.newValue;
  }
  if (area == 'sync' && 'autoMute' in changes) {
    autoMute = changes.autoMute.newValue;
  }
});

function checkAd() {
  video = document.querySelector("video");
  if (!video) return;

  const adContainer = document.querySelector('.ad-showing');
  if (adContainer && (autoMute || autoSkip)) {
    // mute if video is unmuted
    if (!video.muted && autoMute) {
      video.muted = true;
      isMuted = true;
      console.log("ad detected, muted");
    }

    // skip if skippable
    if (autoSkip) {
      const skipBtn = document.querySelector('.ytp-skip-ad-button');
      if (skipBtn && skipBtn.offsetParent !== null) {
        // not work if isTrusted is tested
        skipBtn.click();
        console.log("skip btn show, ad skip");
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