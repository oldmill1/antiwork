document.addEventListener('DOMContentLoaded', function() {
    // Load settings on page load
    loadSettings();
    
    // Settings drawer functionality
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsDrawer = document.getElementById('settingsDrawer');
    const closeSettings = document.getElementById('closeSettings');
    const saveSettings = document.getElementById('saveSettings');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            settingsDrawer.classList.add('open');
        });
    }
    
    if (closeSettings) {
        closeSettings.addEventListener('click', function() {
            settingsDrawer.classList.remove('open');
        });
    }
    
    if (saveSettings) {
        saveSettings.addEventListener('click', function() {
            const slackUrl = document.getElementById('slackUrl').value;
            chrome.storage.sync.set({ slackUrl: slackUrl }, function() {
                console.log('Settings saved');
                settingsDrawer.classList.remove('open');
            });
        });
    }
    
    // Lotus click functionality
    const lotus = document.getElementById('lotus');
    if (lotus) {
        lotus.addEventListener('click', function() {
            // Get the stored Slack URL
            chrome.storage.sync.get(['slackUrl'], function(result) {
                const slackUrl = result.slackUrl;
                
                if (!slackUrl) {
                    console.error('Slack URL not found. Please configure it in settings.');
                    return;
                }
                
                // Check if the tab is already open
                chrome.tabs.query({}, function(tabs) {
                    console.log('All tabs:', tabs.map(tab => ({ id: tab.id, url: tab.url })));
                    const existingTab = tabs.find(tab => tab.url && tab.url.includes(slackUrl));
                    console.log('Found existing tab:', existingTab);
                    
                    if (existingTab) {
                        // Switch to the existing tab and focus it
                        console.log('Switching to existing tab:', existingTab.id);
                        chrome.tabs.update(existingTab.id, { active: true });
                        chrome.windows.update(existingTab.windowId, { focused: true });
                    } else {
                        // Open a new tab
                        console.log('Creating new tab');
                        chrome.tabs.create({ url: slackUrl });
                    }
                });
            });
        });
    }
});

function loadSettings() {
    chrome.storage.sync.get(['slackUrl'], function(result) {
        const slackUrlInput = document.getElementById('slackUrl');
        if (slackUrlInput && result.slackUrl) {
            slackUrlInput.value = result.slackUrl;
        }
    });
}
