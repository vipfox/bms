var deviceId;
//弹屏控件井星 *****************
jQuery(document).ready(function(){
    deviceId = $("#deviceId").val()
//    $("#objectDiv").html('<object classid=clsid:2FA7FC61-8B41-44CF-AAF4-D1F2E7DC2BC4 height=1 width=1 id=cccall> </object>');
    loadClient();
});

/*
	初始化座席页面，页面显示时需要加载的东西。
*/

function loadClient(){
    checkActivX();
//    loadActiveX();
//    loadEvent();
//    initalOCX();
}

/*
 *  检测控件是否注册
 *  为注册则提示注册，否则开始加载
 */

function checkActivX(){
    try{
        var comActiveX = new ActiveXObject("CCLAIX.CCLAIxCtrl.1");   
        $("#objectDiv").html('<object classid=clsid:2FA7FC61-8B41-44CF-AAF4-D1F2E7DC2BC4 height=1 width=1 id=cccall> </object>');
    }catch(e){  
        art.dialog({
            content:'您尚未注册相关控件，请点击<a href="Public/bin/井星软电话配置说明.docx" target="_blank">此处下载</a>注册文档进行注册操作'
        }).title('警告');
        return false;
    }  
    loadActiveX();
    loadEvent();
    initalOCX();
}

/*
	加载控件判断!
*/

function loadActiveX(){
    if(!document.all){
        art.dialog({
            content:'当前浏览器非IE浏览器，请切换至IE浏览器，以保证页面功能可以正常使用'
        }).title('警告').time(3);
        return false;
    }else if(cccall.readyState == 4){
//        art.dialog({
//            content:'加载控件成功'
//        }).title('警告').time(2);
        return true;
    } else {
        art.dialog({
            content:'加载控件失败'
        }).title('警告').time(2);
        return false;
    }
}

/*
	初始化控件
*/
var ocxloadtime = 0; 
function initalOCX() { 
//    console.log(ocxloadtime);
    if(ocxloadtime==0) {  
        ocxloadtime++;
        window.setTimeout("initalOCX()",500); 
    } else if(ocxloadtime==1){
        ocxloadtime++;
        var ctiLocalPort = $("#ctiLocalPort").val();
        var ctiServerPort = $("#ctiServerPort").val();
        var ctiServerIP = $("#ctiServerIP").val();
        var ctiServerPort_bak = $("#ctiServerPort_bak").val();
        var ctiServerIP_bak = $("#ctiServerIP_bak").val();
        //初始化和活动CTI服务器及ControlServer的连接
        //        cccall.InitControlServer(ctiLocalPort,ctiServerPort,ctiServerPort_bak,ctiServerIP,ctiServerIP_bak);
        //初始化cti服务器连接
        cccall.InitConnection(ctiLocalPort,ctiServerPort,ctiServerIP);
		
    }
}

/*
	检测分机
*/
function monitor(){
    cccall.SendMonitorDevice(deviceId,49);
}
/*
*	外拨
*	电话外拨规则
*       内线直接拨打
*       外线加拨9
*           外线本地手机或者本地、外地固话直接加拨9
*           外线外地手机加拨90
*/
function  MakeCall(phoneNumber){
    art.dialog({
        content:'请在本窗口消失前摘机，否则外拨失败'
    }).title('警告').time(4);
    /*
     
     */
    if(phoneNumber == '' || typeof(phoneNumber) == undefined)return false;
    phoneNumber = phoneNumber.replace(/\D/gi, "");      //去掉固定电话中的-
    if(phoneNumber.match(/^((\+86)|(86))[0-9]*$/)){     //去掉国家区号
        phoneNumber = phoneNumber.substr(phoneNumber.length-11);
    }
    if(phoneNumber.length <= 6){
        cccall.SendMakeCall(deviceId,phoneNumber,49,"");
    }else{
        $.ajax({
            type:'POST',
            url:'?m=Inbound&a=ajaxphonefrom',
            data:'&phone='+phoneNumber,
            success:function(str){
                if($("#Local_Area").val() == str){
                    phoneNumber = "9" + phoneNumber;
                }else{
                    if(phoneNumber.length == 11){
                        phoneNumber = "90" + phoneNumber;
                    }else{
                        phoneNumber = "9" + phoneNumber;
                    }
                }
                cccall.SendMakeCall(deviceId,phoneNumber,49,"");
                return false;
            }
        });
    }
    return false;
    
}
/*
	座席登录
*/

function agentLogin(){
        
}


/******************************控件相关事件合集**********************************/
/*
 *  动态建立控件事件
 */
function loadEvent(){
    var wilcom_cc = new Object();
    wilcom_cc.ctrlID = 'cccall';
    wilcom_cc.bindEvent = function(eventName,eventFunction){
        var script = document.createElement('script');
        script.language = "javascript";
        script.htmlFor = this.ctrlID;
        script.event = eventName;
        script.text = eventFunction;
        document.body.appendChild(script);
    };
    wilcom_cc.bindEvent('OnIncomingCallEvt(deviceID,callID,DNIS,ANI,CallType,UUI)','ccOnIncomingCallEvt(deviceID,callID,DNIS,ANI,CallType,UUI);');
    wilcom_cc.bindEvent('OnCallConnectEvt(deviceID,callID,callingDeviceID,calledDeviceID,trunkGrp,trunkMem)','ccOnCallConnectEvt(deviceID,callID,callingDeviceID,calledDeviceID,trunkGrp,trunkMem);');
    wilcom_cc.bindEvent('OnCallDisconnectEvt(deviceID,callID,callingDeviceID,calledDeviceID)','ccOnCallDisconnectEvt(deviceID,callID,callingDeviceID,calledDeviceID);');
    wilcom_cc.bindEvent('OnSeizedEvt(callID,deviceID)','ccOnSeizedEvt(callID,deviceID);');
    wilcom_cc.bindEvent('OnAlertingEvt(deviceID,callID,callingDeviceID,calledDeviceID)','ccOnAlertingEvt(deviceID,callID,callingDeviceID,calledDeviceID);');
    wilcom_cc.bindEvent('OnCallFailureEvt(deviceID,callID,Cause)','ccOnCallFailureEvt(deviceID,callID,Cause);');
    wilcom_cc.bindEvent('OnAgentStateChangeEvt(deviceID,agentID,agentMode)','ccOnAgentStateChangeEvt(deviceID,agentID,agentMode);');
    wilcom_cc.bindEvent('OnAgentStateChangeEvtV2(deviceID,agentID,agentMode,ReasonCode,Reserve1,Reserve2,AgentName)','ccOnAgentStateChangeEvtV2(deviceID,agentID,agentMode,ReasonCode,Reserve1,Reserve2,AgentName);');
    wilcom_cc.bindEvent('OnOriginatedCallEvt(deviceID,callID,DNIS)','ccOnOriginatedCallEvt(deviceID,callID,DNIS);');
    wilcom_cc.bindEvent('OnHoldCallEvt(deviceID,callID,activingDeviceID,activedDeviceID)','ccOnHoldCallEvt(deviceID,callID,activingDeviceID,activedDeviceID);');
    wilcom_cc.bindEvent('OnConferenceCallEvt(deviceID,callID,oldPriCallID,oldSecCallID,deviceList)','ccOnConferenceCallEvt(deviceID,callID,oldPriCallID,oldSecCallID,deviceList);');
    wilcom_cc.bindEvent('OnConferenceCallEvtV3(deviceID,callID,oldPriCallID,oldSecCallID,deviceList,sTrunkGroup,sTrunkMem,UUI)','ccOnConferenceCallEvtV3(deviceID,callID,oldPriCallID,oldSecCallID,deviceList,sTrunkGroup,sTrunkMem,UUI);');
    wilcom_cc.bindEvent('OnTransferCallEvt(deviceID,callID,oldPriCallID,oldSecCallID,callingDeviceID,transferingDeviceID,transferedDeviceID)','ccOnTransferCallEvt(deviceID,callID,oldPriCallID,oldSecCallID,callingDeviceID,transferingDeviceID,transferedDeviceID);');
    wilcom_cc.bindEvent('OnTransferCallEvtV3(deviceID,callID,oldPriCallID,oldSecCallID,callingDeviceID,transferingDeviceID,transferedDeviceID,sTrunkGroup,sTrunkMem,UUI)','ccOnTransferCallEvtV3(deviceID,callID,oldPriCallID,oldSecCallID,callingDeviceID,transferingDeviceID,transferedDeviceID,sTrunkGroup,sTrunkMem,UUI);');
    wilcom_cc.bindEvent('OnRetrieveCallEvt(deviceID,callID,callingDeviceID,calledDeviceID)','ccOnRetrieveCallEvt(deviceID,callID,callingDeviceID,calledDeviceID);');
    wilcom_cc.bindEvent('OnPickupCallEvt(deviceID,callID,callingDeviceID,calledDeviceID)','ccOnPickupCallEvt(deviceID,callID,callingDeviceID,calledDeviceID);');
    wilcom_cc.bindEvent('OnMonitorDeviceRespond(bSuccess)','ccOnMonitorDeviceRespond(bSuccess);');
    wilcom_cc.bindEvent('OnQueryQueueInfoRespond(totalCall,queueedCall,alertingCall,answeredCall)','ccOnQueryQueueInfoRespond(totalCall,queueedCall,alertingCall,answeredCall);');
    wilcom_cc.bindEvent('OnQueryGroupInfoV2Respond(sGroupID,GroupDec,sAvailableAgents,sCallsInQueue,sAgentsLoggedIn,Reserve1,Reserve2)','ccOnQueryGroupInfoV2Respond(sGroupID,GroupDec,sAvailableAgents,sCallsInQueue,sAgentsLoggedIn,Reserve1,Reserve2);');
    wilcom_cc.bindEvent('OnQueryAgentStateV2Respond(sDeviceID,sLoginAgentID,sAgentName,sAgentGroupList,OperatorType,cAgentState,sReasonCode,sLoginDeviceID,sIPAddres,sPort,agentDeviceState,Reserve1,Reserve2)','ccOnQueryAgentStateV2Respond(sDeviceID,sLoginAgentID,sAgentName,sAgentGroupList,OperatorType,cAgentState,sReasonCode,sLoginDeviceID,sIPAddres,sPort,agentDeviceState,Reserve1,Reserve2);');
    wilcom_cc.bindEvent('OnHeartBeatV2Respond(sDeviceID,sState,Reserve1)','ccOnHeartBeatV2Respond(sDeviceID,sState,Reserve1);');
    wilcom_cc.bindEvent('OnQueryTrunkGroupInfoV2Respond(sDeviceID,TrunkGroupDec,sIdleTrunks,sUsedTrunks,Reserve1,Reserve2)','ccOnQueryTrunkGroupInfoV2Respond(sDeviceID,TrunkGroupDec,sIdleTrunks,sUsedTrunks,Reserve1,Reserve2);');
    wilcom_cc.bindEvent('OnQueryReasonCodeInfoV2Respond(sDeviceID,sReasonCodeList,Reserve1)','ccOnQueryReasonCodeInfoV2Respond(sDeviceID,sReasonCodeList,Reserve1);');
    wilcom_cc.bindEvent('OnMakePredictiveCallRespond(deviceID,callID)','ccOnMakePredictiveCallRespond(deviceID,callID);');
    wilcom_cc.bindEvent('OnCCLinkChangeEvt(Ip,Port,isActive)','ccOnCCLinkChangeEvt(Ip,Port,isActive);');
    wilcom_cc.bindEvent('OnCCLinkSwitchEvt(Ip,Port)','ccOnCCLinkSwitchEvt(Ip,Port);');
    wilcom_cc.bindEvent('OnCCLinkUnavailableEvt(mainIp,backIp,mainPort,backPort)','ccOnCCLinkUnavailableEvt(mainIp,backIp,mainPort,backPort);');
    wilcom_cc.bindEvent('OnRequestFailureRespond(deviceID,OpType,code)','ccOnRequestFailureRespond(deviceID,OpType,code);');
}

/*
*   电话振铃事件
*   deviceID ：[out] 分机号码
*   callID ：[out] 电话的CallID
*   DNIS ：[out] 被叫号码
*   ANI ：[out] 主叫号码
*   CallType ：[out] 呼叫类型
*   UUI ：[out] UUI 一般用于传递一些其它的参数
 */
ccOnIncomingCallEvt = function(deviceID,callID,DNIS,ANI,CallType,UUI){
//    art.dialog({
//            content:'电话振铃:分机号'+deviceID+'callID'+callID+'被叫号码'+DNIS+'主叫号码'+ANI+'呼叫类型'+CallType
//        }).title('警告').time(2);
    }

/*
*   电话接通事件
*   deviceID ：[out] 分机号码
*   callID ：[out] 呼叫的CallID
*   callingDeviceID ：[out] 主叫号码
*   calledDeviceID ：[out] 被叫号码
*   trunkGrp ：[out] 中继组号
*   trunkMem ：[out] 中继的通道号
*/
ccOnCallConnectEvt = function(deviceID,callID,callingDeviceID,calledDeviceID,trunkGrp,trunkMem){
    /*art.dialog({
            content:'电话接通:分机号'+deviceID+'callID'+callID+'被叫号码'+calledDeviceID+'主叫号码'+callingDeviceID+'中继组号'+trunkGrp+'中继通道号'+trunkMem
        }).title('警告').time(2);*/
    $("#CallRefID").val(callID);
    $("#DNIS").val(calledDeviceID);
    }
    
/*
 *  电话挂断事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 呼叫的CallID
 *  callingDeviceID ：[out] 主叫号码
 *  calledDeviceID ：[out] 被叫号码  
 */
ccOnCallDisconnectEvt = function(deviceID,callID,callingDeviceID,calledDeviceID){
//    art.dialog({
//            content:'电话挂断:分机号'+deviceID+'callID'+callID+'被叫号码'+calledDeviceID+'主叫号码'+callingDeviceID
//        }).title('警告').time(2);
//    $("#CallRefID").val() = callID;
    }
  
/*
 *  摘机事件
 *  callID ：[out] 呼叫的CallID
 *  deviceID ：[out] 分机号码
 */
ccOnSeizedEvt = function(callID,deviceID){
//    art.dialog({
//            content:'电话摘机:分机号'+deviceID+'callID'+callID
//        }).title('警告').time(2);
    }

/*
 *  对方振铃事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 呼叫的CallID
 *  callingDeviceID ：[out] 主叫号码
 *  calledDeviceID ：[out] 被叫号码
 */
ccOnAlertingEvt = function(deviceID,callID,callingDeviceID,calledDeviceID){
//    art.dialog({
//            content:'对方振铃事件:分机号'+deviceID+'callID'+callID+'主叫号码'+callingDeviceID+'被叫号码'+calledDeviceID
//        }).title('警告').time(2);
    }

/*
 *  呼叫失败事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 呼叫的CallID
 */
ccOnCallFailureEvt = function(deviceID,callID,Cause){
//    art.dialog({
//            content:'呼叫失败事件:分机号'+deviceID+'callID'+callID
//        }).title('警告').time(2);
    }

/*
 *  座席状态改变事件
 *  deviceID ：[out] 分机号码
 *  agentID ：[out] 座席号码
 *  agentMode ：[out] 座席状态
 *  说明:   agentMode 48 表示 登录 49 表示 退出 50 表示 暂停 51 表示 工作 52 表示 话后处理
 */
ccOnAgentStateChangeEvt = function(deviceID,agentID,agentMode){
//    art.dialog({
//            content:'座席状态改变事件:分机号'+deviceID+'agentID'+agentID+'座席状态'+agentMode
//        }).title('警告').time(2);
    }

/*
 *  座席状态改变事件
 *  deviceID ：[out] 分机号码
 *  agentID ：[out] 座席号码
 *  agentMode ：[out] 座席状态
 *  ReasonCode:[out] 原因码
 *  Reserve1: [out] 保留参数1
 *  Reserve2: [out]保留参数2
 *  AgentName : [out]坐席姓名
 *  说明： agentMode 48 表示 登录 49 表示 退出 50 表示 暂停 51 表示 工作 52 表示 话后处理
 *  备注：该事件特殊于，当其他地方修改某坐席状态时，如果该坐席登录状态会同步。如：监控系统中强制某坐席就绪，软电话上该坐席状态会变成就绪
 */
ccOnAgentStateChangeEvtV2 = function(deviceID,agentID,agentMode,ReasonCode,Reserve1,Reserve2,AgentName){
//    art.dialog({
//            content:'座席状态改变事件:分机号'+deviceID+'agentID'+agentID+'座席状态'+agentMode
//        }).title('警告').time(2);
    }

/*
 *  电话外拨事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 呼叫的CallID
 *  DNIS ：[out] 被叫号码
 */
ccOnOriginatedCallEvt = function(deviceID,callID,DNIS){
//    art.dialog({
//            content:'外拨电话中:分机号'+deviceID+'callID'+callID+'被叫号码'+DNIS
//        }).title('警告').time(2);
    }

/*
 *  电话保持事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 呼叫的CallID
 *  activingDeviceID ：[out] 主叫号码
 *  activedDeviceID ：[out] 被叫号码
 */
ccOnHoldCallEvt = function(deviceID,callID,activingDeviceID,activedDeviceID){
    
    }

/*
 *  电话会议事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 新的呼叫CallID
 *  oldPriCallID ：[out] 原来的第一个CallID
 *  oldSecCallID ：[out] 原来的第二个CallID
 *  deviceList ：[out] 会议的分机列表
 */
ccOnConferenceCallEvt = function(deviceID,callID,oldPriCallID,oldSecCallID,deviceList){
    
    }

/*
 *  电话会议事件V3
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 新的呼叫CallID
 *  oldPriCallID ：[out] 原来的第一个CallID
 *  oldSecCallID ：[out] 原来的第二个CallID
 *  deviceList ：[out] 会议的分机列表
 *  sTrunkGroup ：[out] 中继组号
 *  sTrunkMem ：[out] 中继序列号
 *  UUI ：[out] 原始主叫与VDN号码
 */
ccOnConferenceCallEvtV3 = function(deviceID,callID,oldPriCallID,oldSecCallID,deviceList,sTrunkGroup,sTrunkMem,UUI){
    
    }

/*
 *  电话转移事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 新的呼叫的CallID
 *  oldPriCallID ：[out] 原来的第一个CallID
 *  oldSecCallID ：[out] 原来的第二个CallID
 *  callingDeviceID ：[out] 被转移方
 *  transferingDevice ：[out] 转移方，发起转移操作那方
 *  transferedDevic ：[out] 转移到方，即第三方
 */
ccOnTransferCallEvt = function(deviceID,callID,oldPriCallID,oldSecCallID,callingDeviceID,transferingDeviceID,transferedDeviceID){
    
    }
    
/*
 *  电话转移事件V3
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 新的呼叫的CallID.
 *  oldPriCallID ：[out] 原来的第一个CallID
 *  oldSecCallID ：[out] 原来的第二个CallID
 *  callingDeviceID ：[out] 转移方
 *  transferingDevice ：[out] 转移到方
 *  transferedDevic ：[out] 被转移方
 *  sTrunkGroup ：[out] 中继号
 *  sTrunkMem ：[out] 中继序列号
 *  UUI ：[out] 原始主叫与VDN 号码
 */
ccOnTransferCallEvtV3 = function(deviceID,callID,oldPriCallID,oldSecCallID,callingDeviceID,transferingDeviceID,transferedDeviceID,sTrunkGroup,sTrunkMem,UUI){
    
}

/*
 *  电话取消保持事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 呼叫的CallID
 *  callingDeviceID ：[out] 主叫号码
 *  calledDeviceID ：[out] 被叫号码
 */
ccOnRetrieveCallEvt = function(deviceID,callID,callingDeviceID,calledDeviceID){
    
}

/*
 *  电话代接事件
 *  deviceID ：[out] 分机号码
 *  callID ：[out] 呼叫的CallID
 *  callingDeviceID ：[out] 主叫号码
 *  calledDeviceID ：[out] 被叫号码
 */
ccOnPickupCallEvt = function(deviceID,callID,callingDeviceID,calledDeviceID){
    
}

/*
 *  电话监听返回
 *  bSuccess ：[out] 电话监听返回值
 */
ccOnMonitorDeviceRespond = function(bSuccess){
    art.dialog({
            content:'监控分机成功'+bSuccess
        }).title('警告').time(2);
	if(bSuccess){
		document.title += "--分机" + bSuccess + "监控成功";
	}else{
		document.title += "--分机监控失败";
	}
}

/*
 *  查询排队信息返回
 *  totalCall ：[out] 总共的电话数
 *  queueedCall ：[out] 排队数
 *  alertingCall ：[out] 振铃数
 *  answeredCall ：[out] 电话应答数
 */
ccOnQueryQueueInfoRespond = function(totalCall,queueedCall,alertingCall,answeredCall){
    
}

/*
 *  查询组信息返回
 *  sGroupID ：[out] 组名
 *  GroupDec ：[out] 组描述
 *  sAvailableAgents ：[out] 组内可用数
 *  sCallsInQueue ：[out] 组内排队数
 *  sAgentsLoggedIn ：[out] 组内登录数
 *  Reserve1 ：[out] 保留参数
 *  Reserve2 ：[out] 保留参数
 */
ccOnQueryGroupInfoV2Respond = function(sGroupID,GroupDec,sAvailableAgents,sCallsInQueue,sAgentsLoggedIn,Reserve1,Reserve2){
    
}

/*
 *  查询坐席状态返回
 *  sDeviceID ：[out] 分机号
 *  sLoginAgentID ：[out] 登录工号
 *  sAgentName ：[out] 登录人姓名
 *  cAgentState ：[out] 坐席状态
 *  sLoginDeviceID ：[out] 登录分机号
 *  agentDeviceState ：[out] 分机状态
 *  Reserve1 ：[out] 最早登陆时间
 *  说明： sLoginDeviceID 为工号登陆到的分机号 cAgentState 坐席状态 48 登陆 49 未登陆 50 离席 51 工作 52 后处理 agentDeviceState 登陆到的分机状态 48 空闲 49 摘机
 */
ccOnQueryAgentStateV2Respond = function(sDeviceID,sLoginAgentID,sAgentName,sAgentGroupList,OperatorType,cAgentState,sReasonCode,sLoginDeviceID,sIPAddres,sPort,agentDeviceState,Reserve1,Reserve2){
//    alert(sDeviceID+'-'+sLoginAgentID+'-'+sAgentName+'-'+sAgentGroupList+'-'+OperatorType+'-'+cAgentState+'-'+sReasonCode+'-'+sLoginDeviceID+'-'+sIPAddres+'-'+sPort+'-'+agentDeviceState+'-'+Reserve1+'-'+Reserve2);
}

/*
 *  心跳检测返回
 *  sDeviceID ：[out] 分机号码
 *  sState ：[out] 状态
 *  Reserve1 ：[out] 保留参数
 */
ccOnHeartBeatV2Respond = function(sDeviceID,sState,Reserve1){
    
}

/*
 *  查询中继组信息返回
 *  sDeviceID ：[out] 中继组号码
 *  TrunkGroupDec ：[out] 中继组描述
 *  sIdleTrunks ：[out] 空闲的中继数
 *  sUsedTrunks ：[out] 在用的中继数
 *  Reserve1 ：[out] 保留参数
 *  Reserve2 ：[out] 保留参数
 */
ccOnQueryTrunkGroupInfoV2Respond = function(sDeviceID,TrunkGroupDec,sIdleTrunks,sUsedTrunks,Reserve1,Reserve2){
    
}

/*
 *  查询原因码返回
 *  sDeviceID ：[out] 分机号码
 *  sReasonCodeList ：[out] 原因码列表
 *  Reserve1 ：[out] 保留参数
 */
ccOnQueryReasonCodeInfoV2Respond = function(sDeviceID,sReasonCodeList,Reserve1){
    
}

/*
 *  预拨返回
 *  callID ：[out] 预拨呼叫的CallID
 *  deviceID ：[out] 分机号码
 */
ccOnMakePredictiveCallRespond = function(deviceID,callID){
    
}

/*
 *  初始化注册时返回事件
 *  Ip ： 服务IP地址
 *  Port ： 服务器端口号
 *  isActive：表示服务器是否正常(1表示正常,0表示不可用)
 *  说明： 如果使用InitControlServer注册 则会收到两次该事件
 */
ccOnCCLinkChangeEvt = function(Ip,Port,isActive){
    if(isActive == 1){
        document.title = "软电话已连接";
    }else{
        document.title = "软电话连接已断开";
    }
    monitor();
}

/*
 *  表示主备切换完成返回事件
 *  Ip ： 服务IP地址
 *  Port ： 服务器端口号
 *  说明： 主服务器宕机后，备用起来，切换完成会收到该事件，此时需要从新发送monitor分机请求
 */
ccOnCCLinkSwitchEvt = function(Ip,Port){
    
}

/*
 *  收到该事件表示当前没有可用服务器
 *  mainIp ： 主服务IP地址
 *  mainPort ： 主服务器端口号
 *  backIp：备Ip地址
 *  backPort：备端口
 */
ccOnCCLinkUnavailableEvt = function(mainIp,backIp,mainPort,backPort){
    
}

/*
 *  请求失败返回事件
 *  deviceID ： 分机号
 *  code ： 错误代码，详见3.4返回异常说明
 *  OpType ： 目前没有使用该参数
 */
ccOnRequestFailureRespond = function(deviceID,OpType,code){
    
}
/*******************************************************************************/
