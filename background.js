let stateString = 'ChromeReload';
let url = 'fiverr.com';
let run_status = false;

const urls = [
    'https://www.fiverr.com/users/mosharof_pro/seller_dashboard',
    'https://www.fiverr.com/users/mosharof_pro/manage_orders?source=header_navigation',
    'https://www.fiverr.com/users/mosharof_pro/balance/sales',
    'https://www.fiverr.com/users/mosharof_pro/requests',
    'https://www.fiverr.com/users/mosharof_pro/manage_gigs',
    'https://www.fiverr.com/inbox/yannickpons569',
    'https://www.fiverr.com/inbox/sontechu',
    'https://www.fiverr.com/inbox/gregamaya',
    'https://www.fiverr.com/inbox/exceptionalpt',
    'https://www.fiverr.com/inbox/katism',
    'https://www.fiverr.com/inbox/manousky',
    'https://www.fiverr.com/inbox/anandsat',
    'https://www.fiverr.com/inbox/hmjl77',
    'https://www.fiverr.com/inbox/hello2050'

];


chrome.runtime.onInstalled.addListener(function() {
    jsObj = {};
    jsObj[stateString] = false
    chrome.storage.local.set(jsObj)
});

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        chrome.storage.local.get(stateString, value=>{
            newjsObj = {};
            newjsObj[stateString] = !value[stateString];
            chrome.storage.local.set(newjsObj)
        })
        chrome.storage.local.get(stateString, value=> {
            if(value[stateString]){
                run_status = true;
                myFunction();
            }
            else{
                run_status = false;
            }
        });


    });
})

chrome.browserAction.onClicked.addListener(function () {
    myFunction();
});

function myFunction() {
    if(run_status) {
        var min = 1,
            max = 4,
            decimalPlaces = 2;

        var rand = genRand(min, max, decimalPlaces); //Generate Random number between 5 - 10

        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(tb => {
                if (tb.url.includes(url)) {
                    var nowUrl = urls[Math.floor(Math.random() * urls.length)];
                    chrome.tabs.update(tb.id, {url: nowUrl});
                    console.log(new Date().toLocaleString());
                }
            })
        })

        setTimeout(myFunction, rand * 60 * 1000);
    }
}

function genRand(min, max, decimalPlaces) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}