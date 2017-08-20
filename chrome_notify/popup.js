
var listCoupons = {
    init : function(){
        var coupon_list = [{ provider: 'UBER', code: 'TATASKY15', info:'', validiy: 'Valid till August 30'},{ provider: 'RedBus', code: 'RIDE20', info:'20% off on bus rides', validiy: 'Valid from 1st September to 6th September'}];
        chrome.storage.sync.set({'coupon_list':coupon_list});
        this.getCoupons();
    },
    getCoupons : function(){
        chrome.storage.sync.get('coupon_list', function(result){
            var html_element = "",
                coupon_list = result.coupon_list;
            coupon_list.forEach(function(element) {
                html_element += '<li class="coupon_item"><h3 class="provider_name" data-name="'+element.provider+'">'+element.provider+'</h3><span class="code">'+element.code+'</span><span class="info">'+element.info+'</span><span class="validity">'+element.validiy+'</span></li>';
            });
            $('.coupon_list').html(html_element);
        })
    } 
}
var getApiKey = {
    
}

function couponNotify(){
    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        $('.provider_name').each(function(value){
            if($(this).attr('data-name').length){
                var pattern = new RegExp($(this).attr('data-name'), "g");
                if(pattern.test(tablink)){
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon16.png',
                        title: 'Curent Tab',
                        message: 'You have a coupon in your list'
                    };
                    chrome.notifications.create('notify', notifOptions);
                }
            }
        })
    });
}
// function createAlarm() {
//     chrome.alarms.create('remindme', {
//     delayInMinutes: 0.1, periodInMinutes: 0.1});
// }
$(function(){
    var user_id = 1;
    if(user_id){
        listCoupons.init();
    }
    // createAlarm()
    // couponNotify();

    // console.log(couponNotify());
    
})