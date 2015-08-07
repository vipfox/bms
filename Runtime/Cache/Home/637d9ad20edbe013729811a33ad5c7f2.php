<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Realm - Forms</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Bluth Company">
    <link rel="shortcut icon" href="<?php echo (C("PUBLIC_URL")); ?>assets/ico/favicon.html">
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/theme.css" rel="stylesheet">
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/alertify.css" rel="stylesheet">
    <link rel="Favicon Icon" href="favicon.ico">
    <link href="http://fonts.useso.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/colorpicker.css" rel="stylesheet">
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/datepicker.css" rel="stylesheet">
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/timepicker.css" rel="stylesheet">
    <link href="<?php echo (C("PUBLIC_URL")); ?>assets/css/select2.css" rel="stylesheet">
  </head>
  <body>
  <div id="wrap">
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <div class="logo">
            <img src="<?php echo (C("PUBLIC_URL")); ?>assets/img/logo.png" alt="Realm Admin Template">
          </div>
           <a class="btn btn-navbar visible-phone" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
           <a class="btn btn-navbar slide_menu_left visible-tablet">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>

          <div class="top-menu visible-desktop">
            <ul class="pull-left">
              <li><a id="messages" data-notification="2" href="#"><i class="icon-envelope"></i> Messages</a></li>
              <li><a id="notifications" data-notification="3" href="#"><i class="icon-globe"></i> Notifications</a></li>
            </ul>
            <ul class="pull-right">  
              <li><a href="login.html"><i class="icon-user"></i> Account</a></li>  
              <li><a href="login.html"><i class="icon-off"></i> Logout</a></li>
             
            </ul>
          </div>

          <div class="top-menu visible-phone visible-tablet">
            <ul class="pull-right">  
              <li><a title="link to View all Messages page, no popover in phone view or tablet" href="#"><i class="icon-envelope"></i></a></li>
              <li><a title="link to View all Notifications page, no popover in phone view or tablet" href="#"><i class="icon-globe"></i></a></li>
              <li><a href="login.html"><i class="icon-off"></i></a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <div class="container-fluid">
     
      <!-- Side menu -->  
      <div class="sidebar-nav nav-collapse collapse">
        <div class="user_side clearfix">
          <img src="<?php echo (C("PUBLIC_URL")); ?>assets/img/odinn.jpg" alt="Odinn god of Thunder">
          <h5>Odinn</h5>
          <a href="#"><i class="icon-cog"></i> Settings</a>        
        </div>
        <div class="accordion" id="accordion2">
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle b_F79999" href="index-2.html"><i class="icon-dashboard"></i> <span>Dashboard</span></a>
            </div>
          </div>
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle b_C3F7A7" data-toggle="collapse" data-parent="#accordion2" href="#collapse1"><i class="icon-magic"></i> <span>Features</span></a>
            </div>
            <div id="collapse1" class="accordion-body in collapse" style="height:auto">
              <div class="accordion-inner">
                <a class="accordion-toggle" href="ui_features.html"><i class="icon-star"></i> UI Features</a>
                <a class="accordion-toggle active" href="forms.html"><i class="icon-list-alt"></i> Forms</a>
                <a class="accordion-toggle" href="tables.html"><i class="icon-table"></i> Tables</a>
                <a class="accordion-toggle" href="buttons.html"><i class="icon-circle"></i> Buttons</a>
              </div>
            </div>
          </div>
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle b_9FDDF6 collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapse2"><i class="icon-reorder"></i> <span>Components</span></a>
            </div>
            <div id="collapse2" class="accordion-body collapse">
              <div class="accordion-inner">
                <a class="accordion-toggle" href="notifications.html"><i class="icon-rss"></i> Notifications</a>
                <a class="accordion-toggle" href="calendar.html"><i class="icon-calendar"></i> Calendar</a>
                <a class="accordion-toggle" href="gallery.html"><i class="icon-picture"></i> Gallery</a>
              </div>
            </div>
          </div>
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle b_F6F1A2" href="tasks.html"><i class="icon-tasks"></i> <span>Tasks</span></a>
            </div>
          </div>
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle b_C1F8A9" href="analytics.html"><i class="icon-bar-chart"></i> <span>Analytics</span></a>
            </div>
          </div> 
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle b_9FDDF6" href="tickets.html"><i class="icon-bullhorn"></i> <span>Support Tickets</span></a>
            </div>
          </div> 
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle b_F5C294" href="users.html"><i class="icon-user"></i> <span>Users</span></a>
            </div>
          </div>      
        </div>
      </div>
      <!-- /Side menu -->

      <!-- Main window -->
      <div class="main_container" id="forms_page">
        <div class="row-fluid">
          <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Features</a> <span class="divider">/</span></li>
            <li class="active">Forms</li>
          </ul>
          <!--  
          <h2 class="heading">
                产品
                <div class="btn-group pull-right">
                  <button class="btn"><i class="icon-download-alt"></i> Export</button>
                  <button class="btn"><i class="icon-envelope"></i> Email</button>
                  <button class="btn"><i class="icon-cog"></i> Settings</button>
                </div>
          </h2>
          -->   
        </div>
        <div class="row-fluid">
          <div class="widget widget-padding span12">
            <div class="widget-header">
              <i class="icon-external-link"></i><h5>Documentation</h5>
              <div class="widget-buttons">
                  <a href="#" data-title="Collapse" data-collapsed="false" class="tip collapse"><i class="icon-chevron-up"></i></a>
              </div>
            </div>
            <div class="widget-body">
              <div class="alert alert-info" style="margin:0;">
                <strong>This page includes multiple plugins, here are the documentation links.</strong><br> 
                <ul>     
                  <li><a href="http://twitter.github.com/bootstrap/base-css.html#forms">Bootstrap Forms</a></li>
                  <li><a href="http://ivaynberg.github.com/select2/">Select2</a></li>
 
                </ul>
              </div>
            </div>
          </div>
        </div> 
          <form class="form-horizontal" method="post" action="?c=product&a=create" enctype="multipart/form-data">
        <div class="row-fluid">
          <div class="widget widget-padding span12">
            <div class="widget-header">
              <i class="icon-list-alt"></i><h5>Basic Inputs</h5>
              <div class="widget-buttons">
                  <a href="#" data-title="Collapse" data-collapsed="false" class="tip collapse"><i class="icon-chevron-up"></i></a>
              </div>
            </div>
            <div class="widget-body">
              <div class="widget-forms clearfix">
                
                  
                    
                  <div class="control-group">
                    <label class="control-label">产品库</label>
                    <div class="controls">
                      <input class="span7" disabled="" type="text" placeholder="私有类目">
                    </div>
                  </div>  
                  <div class="control-group">
                    <label class="control-label">产品名</label>
                    <div class="controls">
                      <input class="span7" type="text" name="product_name" placeholder="Type something…">
                      <span class="help-inline">＊</span>
                    </div>
                  </div>
                  
                  <div class="control-group">
                    <label class="control-label">产品标题</label>
                    <div class="controls">
                      <input class="span7 tip" type="text" name="product_title" placeholder="Hover for tooltip…">
                    </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label">品牌</label>
                    <div class="controls">
                      <input class="span7 tip" name="product_brand" type="text" placeholder="Hover for tooltip…">
                    </div>
                  </div>
                 <div class="control-group">
                    <label class="control-label">Dropdown</label>
                      <div class="controls">
                        <select tabindex="1" data-placeholder="Select here.." class="span7">
                           <option value=""></option>
                           <option value="Category 1">First Dropdown</option>
                           <option value="Category 2">Second Dropdown</option>
                           <option value="Category 3">Third Dropdown</option>
                           <option value="Category 4">Fourth Dropdown</option>
                        </select>
                     </div>
                  </div>
                    <div class="control-group">
                    <label class="control-label">重量</label>
                      <div class="controls">
                        <div class="input-prepend">
                           <input class="span7" type="text" name="product_weight" placeholder=""><span class="add-on">Kg</span>       
                        </div>
                     </div>
                  </div>
                    <div class="control-group">
                    <label class="control-label">规格</label>
                      <div class="controls">
                        <div class="input-append">
                           <input class="span7" type="text" name="product_rule" placeholder=""><span class="add-on">ml</span>
                        </div>
                     </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label">参考价格</label>
                      <div class="controls">
                        <div class="input-append">
                           <input class="span7" type="text" name="product_price" placeholder=""><span class="add-on">¥</span>
                        </div>
                     </div>
                  </div>
                    <div class="control-group">
                    <label class="control-label">保质期</label>
                      <div class="controls">
                        <div class="input-append date span5 datepicker datepicker-basic" data-date="" data-date-format="yyyy-mm-dd">
                          <input size="16" type="text" name="product_guarantee_eriod " value="">
                          <span class="add-on"><i class="icon-th"></i></span>
                        </div>
                      </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label">主图</label>
                    <div class="controls">
                      <input class="span7 pop" name="product_image" type="file">
                    </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label">采购地</label>
                    <div class="controls">
                     <input class="span7" type="text" data-source="[&quot;Alabama&quot;,&quot;Alaska&quot;,&quot;Arizona&quot;,&quot;Arkansas&quot;,&quot;California&quot;,&quot;Colorado&quot;,&quot;Connecticut&quot;,&quot;Delaware&quot;,&quot;Florida&quot;,&quot;Georgia&quot;,&quot;Hawaii&quot;,&quot;Idaho&quot;,&quot;Illinois&quot;,&quot;Indiana&quot;,&quot;Iowa&quot;,&quot;Kansas&quot;,&quot;Kentucky&quot;,&quot;Louisiana&quot;,&quot;Maine&quot;,&quot;Maryland&quot;,&quot;Massachusetts&quot;,&quot;Michigan&quot;,&quot;Minnesota&quot;,&quot;Mississippi&quot;,&quot;Missouri&quot;,&quot;Montana&quot;,&quot;Nebraska&quot;,&quot;Nevada&quot;,&quot;New Hampshire&quot;,&quot;New Jersey&quot;,&quot;New Mexico&quot;,&quot;New York&quot;,&quot;North Dakota&quot;,&quot;North Carolina&quot;,&quot;Ohio&quot;,&quot;Oklahoma&quot;,&quot;Oregon&quot;,&quot;Pennsylvania&quot;,&quot;Rhode Island&quot;,&quot;South Carolina&quot;,&quot;South Dakota&quot;,&quot;Tennessee&quot;,&quot;Texas&quot;,&quot;Utah&quot;,&quot;Vermont&quot;,&quot;Virginia&quot;,&quot;Washington&quot;,&quot;West Virginia&quot;,&quot;Wisconsin&quot;,&quot;Wyoming&quot;]" data-items="4" data-provide="typeahead" style="margin: 0 auto;" placeholder="Type here for auto complete…">
                    </div>
                  </div>
                  

        
                  <div class="control-group">
                    <label class="control-label">备注</label>
                      <div class="controls">
                        <textarea class="span7" rows="5" style="height:100px;"></textarea>
                      </div>
                  </div>
                
              </div>
            </div>
            <div class="widget-footer">
               <button class="btn btn-primary" name="submit" type="submit">Save</button>
               <button class="btn" type="button">Cancel</button>
            </div>
          </div>
        </div>  
        </form>
    <div id="copyright">
        <?php echo (C("CRM_CopyRight")); ?>
    </div>
      <!-- /Main window -->
      
    </div><!--/.fluid-container-->

    </div><!-- wrap ends-->

<!--
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.min.js"></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/raphael-min.js"></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/bootstrap.js"></script>
    <script type="text/javascript" src='<?php echo (C("PUBLIC_URL")); ?>assets/js/sparkline.js'></script>
    <script type="text/javascript" src='<?php echo (C("PUBLIC_URL")); ?>assets/js/morris.min.js'></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.dataTables.min.js"></script>   
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.masonry.min.js"></script>   
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.imagesloaded.min.js"></script>   
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.facybox.js"></script>   
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.alertify.min.js"></script> 
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.knob.js"></script>
    <script type='text/javascript' src='<?php echo (C("PUBLIC_URL")); ?>assets/js/fullcalendar.min.js'></script>
    <script type='text/javascript' src='<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.gritter.min.js'></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/realm.js"></script>

    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/select2.min.js"></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/bootstrap-colorpicker.js"></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/bootstrap-timepicker.js"></script>
-->    
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/jquery.min.js"></script>    
    <script type="text/javascript" src="<?php echo (C("PUBLIC_URL")); ?>assets/js/bootstrap-datepicker.js"></script>
    
  </body>
  
  
</html>