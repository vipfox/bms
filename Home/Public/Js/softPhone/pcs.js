//弹屏控件PCS *****************
jQuery(document).ready(function(){
    $("#objectDiv").html('<object id="lv_obj" codebase="{$Think.config.PUBLIC_URL}/bin/pcsPhoneClient.dll" classid="CLSID:30A92485-94D2-4CBA-AC32-EF276B7F777B"></object>');
    LoadObject();
});
//加载弹屏控件
function LoadObject(){
    if(!document.all){
        art.dialog({content:'当前浏览器非IE浏览器，请切换至IE浏览器，以保证页面功能可以正常使用'}).title('警告').time(3);
        return false;
    }else if(typeof(document.all.lv_obj) == 'undefined'){
	art.dialog({content:'当前浏览器设置下不能正常使用软电话，请重新配置'}).title('警告').time(3);
        return false;
    }
    try {
        document.all.lv_obj.Init("PCS_Test");			//初始化PCS弹屏控件
    } catch (err) {
        window.alert("错误信息: " + err.message);
    }
    document.all.lv_obj.AttachWeb(window);
    if (document.all.lv_obj.IsConnected) {
        document.title = "软电话已连接";
    }
    else {
        document.title = "软电话连接已断开";
    }
}

/*
 *  函数作用：触发外拨事件前预处理，根据被叫号码判断拨打类型
 */
function MakeCall(phoneNumber) {
    if(!document.all){
        art.dialog({content:'当前浏览器非IE浏览器，请切换至IE浏览器，以保证页面功能可以正常使用'}).title('警告').time(3);
        return false;
    }
    var CALLSCALE_NATIONAL = 0;
    if(phoneNumber == '' || typeof(phoneNumber) == undefined)return false;
    phoneNumber = phoneNumber.replace(/\D/gi, "");      //去掉固定电话中的-
    if(phoneNumber.match(/^((\+86)|(86))[0-9]*$/)){     //去掉国家区号
        phoneNumber = phoneNumber.substr(phoneNumber.length-11);
    }
    if(phoneNumber.length <= 6){
        CALLSCALE_NATIONAL = 1;
        MakeCallOut(CALLSCALE_NATIONAL, phoneNumber);
    }else{
        $.ajax({
            type:'POST',
            url:'?m=Inbound&a=ajaxphonefrom',
            data:'&phone='+phoneNumber,
            success:function(str){
                if($("#Local_Area").val() == str){
                    CALLSCALE_NATIONAL = 2;
                }else{
                    CALLSCALE_NATIONAL = 3;
                    if(phoneNumber.length == 11 && phoneNumber.substr(3) != '021' && phoneNumber.substr(3) != '021' && phoneNumber.substr(3) != '022' && phoneNumber.substr(3) != '023'){
                        phoneNumber = "0" + phoneNumber;
                    }
                }
                MakeCallOut(CALLSCALE_NATIONAL, phoneNumber);
                return false;
            }
        });
    }
    return false;
}

//PCS呼出
/*
 *  param  
 *  CALLSCALE_NATIONAL 呼叫类型 0 未知    1 内线      2 市话      3 国内长途      4 国际长途
 *  phone  被叫号码
 */
function MakeCallOut(CALLSCALE_NATIONAL, DNIS){
    art.dialog({
        content:'请在本窗口消失前摘机，否则外拨失败'
    }).title('警告').time(4);
    if(DNIS == '' || typeof(phone) == undefined)return false;
    if(CALLSCALE_NATIONAL == 0){}
    try {
        document.all.lv_obj.MakeCall(CALLSCALE_NATIONAL, DNIS);
    } catch (err) {
        window.alert("错误信息: " + err.message);
    }
    return true;
}
	
/*
 *  PCS状态改变事件回调函数，PCS自动触发
 *  param   lv_evtType	呼叫状态类型    lv_evtValue	呼叫记录标志位      lv_evtData	相关号码        lv_usrData（无用）	操作用户
 */
function OnDataRecievedCallBack(lv_evtType,lv_evtValue, lv_evtData, lv_usrData) {
    DoDataRecieved(lv_evtType,lv_evtValue, lv_evtData, lv_usrData);
}
	
/*
 *  函数作用，根据PCS事件的不同状态，进行不同操作
 *  枚举类型 lv_evtType
//      lv_evtType value          
//      evtError = 0;
//      evtConnect = 1;
//      evtDisconnect = 2;
//      evtLogon = 3;
//      evtLogoff = 4;
//      evtStateChange = 5;
//      evtStateQuery = 6;
//      evtReady = 7;
//      evtNotReady = 8;
//      evtDNStateQuery = 9;
//      evtAgentStateQuery = 10;
//      evtCallIn = 50;
//      evtCallOut = 51;
//      evtCallClear = 52;
//      evtCallAnswer = 53;
//      evtTransfer = 60;
//      evtConsultTran = 61;
//      evtSingleStepTran = 62;
//      evtConference = 70;
//      evtConsultConf = 71;
//      evtGetUserData = 100;
//      evtSetUserData = 101;
//      evtDestSeized = 120;
//      evtDestBusy = 121;
//      evtDestInvalid = 122;
//      evtUnknown = 255;
 */
function DoDataRecieved(lv_evtType,lv_evtValue,lv_evtData,lv_usrData) {
    var lv_strShow;     //呼叫过程日志
    if (lv_evtData=="") {
        lv_evtData = "(null)";
    }
    
    if (lv_usrData=="") {
        lv_usrData = "(null)";
    }
    switch (lv_evtType) {
        case 1: //evtConnect
            document.title = "软电话已连接";
            break;
                
        case 2: //evtDisconnect
            document.title = "软电话连接已断开";
            break;
                
        case 50: //evtCallIn    呼入
            lv_strShow = "Call In [ID:" + lv_evtValue + ", EventData:" + lv_evtData + ", UserData:" + lv_usrData + ", TimeStamp:" + document.all.lv_obj.strCallInTime + "]";
            try{
                //alert(lv_strShow);
                document.all.phone.value=lv_evtData; //呼入号码
                var phone = $("#phone").val();
                get_phone_from(phone);
            }catch(e){
                alert('错误！');
            }
            break;	
                
        case 51: //evtCallOut   呼出    无效
            lv_strShow = "Call In [ID:" + lv_evtValue + ", EventData:" + lv_evtData + ", UserData:" + lv_usrData + ", TimeStamp:" + document.all.lv_obj.strCallInTime + "]";
            //                alert(lv_strShow);
            try{
                document.all.CallRefID.value=lv_evtValue;
                document.all.AliasName.value=lv_usrData;
                document.all.CallInTime.value=document.all.lv_obj.strCallInTime;
            }catch(e){
                alert('错误！');
            }
            break;
                
        case 52: //evtCallClear     挂断   
            lv_strShow = "Call In [ID:" + lv_evtValue + ", EventData:" + lv_evtData + ", UserData:" + lv_usrData + ", TimeStamp:" + document.all.lv_obj.strCallInTime + "]";
            //alert(lv_strShow);
            if($("#CallRefID").val() == '')
                document.all.CallRefID.value=lv_evtValue;
            if($("#CallInTime").val() == '')
                document.all.CallInTime.value=document.all.lv_obj.strCallInTime;
            if($("#DNIS").val() == '')
                document.all.DNIS.value=lv_evtData;
            break;
                
        case 53: //evtCallAnswer    应答    无效
            lv_strShow = "Call Answered [ID:" + lv_evtValue + "]";
            alert("应答"+lv_strShow);
                
            window.alert("53_evtCallAnswer");
            window.alert("CallID="+lv_evtValue);
            window.alert("CallInTime="+document.all.lv_obj.strCallInTime);   
            break;
    }

    lv_evtType = parseInt(lv_evtType);
    if(lv_evtType!=1)
    {
        if(lv_evtType!=2)
        {
            if(lv_evtType!=100)
            {
                if(lv_evtType!=5)
                {
			            
                }
            }
        }
    }

}