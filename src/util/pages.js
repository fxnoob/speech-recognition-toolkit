


export class Pages {
    constructor() {}
    openPage(pageName) {
        chrome.tabs.create({'url': "/" + pageName } );
    }
    openOptionPage() {
        const optionsUrl = chrome.extension.getURL('options.html');
        chrome.tabs.query({url: optionsUrl} , (tabs) => {
            if (tabs.length) {
                chrome.tabs.update(tabs[0].id, {active: true});
            }
            else {
                chrome.tabs.create({url: optionsUrl});
            }
        });
    }
    openPinnedOptionPage() {
        chrome.tabs.create({
                "url": "/option.html",
                "pinned": true
            } , (tab) => {
                tab.highlighted = false;
                tab.active = false;
            });
    }
}
