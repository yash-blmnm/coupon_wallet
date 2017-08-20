

function showNotification(taburl){
    chrome.storage.sync.get('coupon_list',function(result){
        var coupon_list = result.coupon_list;
        coupon_list.forEach(function(element){
            if(element.provider){
                    var tabURL = taburl;
                    var pattern = new RegExp((element.provider.trim()), "gi");
                    console.log(pattern,tabURL);
                    if(pattern.test(tabURL)){
                        var notif_message = "You have a " + element.provider + " coupon in your list"
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon16.png',
                            title: 'Curent Tab',
                            message: notif_message
                        };
                        chrome.notifications.create(null, notifOptions);
                    }
                // });
            }
            
        });
    });
}

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
showNotification(request.taburl);
    sendResponse({farewell: "goodbye"});
});
