/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function chkAssign(id){ //绑定agent
	var assign_val;
	$("input[name="+id+"]").val('');
        $("#checked"+id+"Div").html('');
	$("input[name='pop_"+id+"[]']").each(function(){
		if($(this).attr("checked")) {
			if (assign_val) {assign_val += ','+$(this).val();}
			else {assign_val = $(this).val();}
		}												
	});	
	$("input[name="+id+"]").val(assign_val);
        $("#checked"+id+"Div").html(assign_val);
}


function chkAssignAll(id){ //绑定agent，全选，反选
	$("input[name='pop_"+id+"[]']").each(function(){
		if($(this).attr("checked")) {
			$(this).removeAttr("checked");
		}else{
			$(this).attr("checked","checked");	
		}		
	});		
	chkAssign(id);
}

function choiceAgents(){
    $.ajax({   
        type: "POST",
		   cache:false,
		   url: "?m=callplan&a=agentList",
//		   data: "original_field="+(original_field)+"&original_table="+(original_table)+"&target_field="+(target_field)+"&target_table="+(target_table)+"&task=delUnique",
		   success: function(msg){
                       art.dialog({
                          title:"分配客服",
                          content : msg,
                          lock : true,
                          background: 'white', // 背景色
                          opacity: 0.19 // 透明度
                       });
		   }
    });
}

function choiceCallplans(){
    $.ajax({   
        type: "POST",
		   cache:false,
		   url: "?m=callplan&a=callplanList",
//		   data: "original_field="+(original_field)+"&original_table="+(original_table)+"&target_field="+(target_field)+"&target_table="+(target_table)+"&task=delUnique",
		   success: function(msg){
                       art.dialog({
                          title:"选择呼叫计划",
                          content : msg,
                          lock : true,
                          background: 'white', // 背景色
                          opacity: 0.19 // 透明度
                       });
		   }
    });
}
