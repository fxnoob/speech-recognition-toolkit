


export class Pages {
    constructor() {}
    openPage(pageName) {
        chrome.tabs.create({'url': "/" + pageName } );
    }
}
