/* 
 * do.js 模块配置文件
 * @Ted
 */
//日期插件
Do.add('WdatePicker', {
    path:'Public/Js/calendar/WdatePicker.js',
    type:'js'
});
//地区选择插件
Do.add('areaopt', {
    path:'Public/Js/jquery/areaopt/jquery.areaopt.js',
    type:'js', 
    requires: [
    'Public/Js/jquery/areaopt/areaopt.data.js', 
    'Public/Js/jquery/areaopt/theme/jquery.areaopt.css'
    ]
});
Do.add('cookie.pack', {
    path:'Public/Js/jquery/cookies/jquery.cookie.pack.js',
    type:'js'
});

Do.add('datagrid', {
    path:'Public/Js/jquery/jquery-easyui/themes/icon.css',
    type:'css', 
    requires: ['jquery-easyui']
});

Do.add('colResizable', {
    path:'Public/Js/jquery/jquery-ui/colResizable-1.3.min.js',
    type:'js', 
    requires: ['Public/Js/jquery/jquery-ui/css/colResizable.css']
    });

//table排序
//Do.add('tablesorter-css',{
//    path:'Public/Css/tablesorter.css',
//    type:'css'
//});
Do.add('tablesorter',{
    path:'Public/Js/jquery/jquery-tablesorter/jquery.tablesorter.min.js',
    type:'js'
//    requires: ['tablesorter-css']
});

//jquery-form
Do.add('jquery-form',{
    path:'Public/Js/jquery/jquery.form.js',
    type:'js'
});
//jquery-validate
Do.add('jquery-validate',{
    path:'Public/Js/jquery/jquery.metadata.js',
    type:'js',
    requires: ['Public/Js/jquery/jquery.validate.js']
});

Do.add('choiceAgents-css',{
    path:'Public/Css/choiceAgent.css',
    type:'css'
});

Do.add('choiceAgents',{
    path:'Public/Js/agentDialog.js',
    type:'js',
    requires:['choiceAgents-css']
});

Do.add('validationEngine-css',{
    path:'Public/js/formValidator/validationEngine.jquery.css',
    type:'css'
});

Do.add('validationEngine-lang',{
    path:'Public/js/formValidator/languages/jquery.validationEngine-zh_CN.js',
    type:'js'
});

Do.add('validationEngine',{
    path:'Public/js/formValidator/jquery.validationEngine.js',
    type:'js',
    requires: ['validationEngine-css','validationEngine-lang']
});
