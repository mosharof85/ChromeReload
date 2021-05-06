var port = chrome.extension.connect({
    name: "Sample Communication"
});


window.addEventListener('DOMContentLoaded',()=>{
    let chkStatus = document.querySelector('#chkStatus');
    chrome.storage.local.get('RandomReloadFiverr', value=>{
        chkStatus.checked = value.RandomReloadFiverr;
    })

    chkStatus.addEventListener('click',()=>{
        if(chkStatus.checked){
            chrome.storage.local.set({'RandomReloadFiverr' : true})
        }
        else{
            chrome.storage.local.set({'RandomReloadFiverr' : false})
        }

        chrome.storage.local.get('RandomReloadFiverr', value=>{
            port.postMessage('');
        })
    })
})