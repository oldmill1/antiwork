document.getElementById('settingsBtn').addEventListener('click', function() {
  console.log('Button clicked!');
  try {
    chrome.tabs.create({
      url: chrome.runtime.getURL('settings.html')
    }, function(tab) {
      console.log('Tab created:', tab);
    });
  } catch (error) {
    console.error('Error creating tab:', error);
  }
});
