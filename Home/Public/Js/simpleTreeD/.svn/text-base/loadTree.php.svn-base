<?php
//树形
require_once '../../../include/config.php';
require_once '../../../include/mysql.class.php';
require_once '../../../include/common.fun.php';

/*New DB*/
$dbc = new DB_MYSQL();
$dbc -> connect(g_db_host, g_db_user, g_db_pass, g_db_name, 0, 'utf8');

$tree_id = $_REQUEST['tree_id'];
if($tree_id != '')
{
	$sql = "SELECT a.*,(SELECT COUNT(*) FROM ".g_tbl_prefix."call_nature b WHERE a.id = b.parentid ) as cid_num FROM ".g_tbl_prefix."call_nature a 
	WHERE 1=1 AND a.active = 1  ";
	$sql .= "AND a.parentid = '$tree_id' ";
	$sql .= "ORDER BY a.orders ASC,a.id ASC";
	$q = $dbc -> query($sql);
	while($r = $dbc -> fetch_array($q)){
		$n = $r['cid_num'];
		$list .=  "<li id='{$r['id']}'><span class=''>{$r['title']} [ID:{$r['id']} 子类:{$r['cid_num']}]</span>\r\n";
		if($n>0)
		{
			$list .= "<ul class='ajax'>\r\n";
			$list .= "<li id='{$r['email']}'>{url:loadTree.php?tree_id=".$r['id']."}</li>\r\n";
			$list .= "</ul>\r\n";
		}
		$list .= "</li>\r\n";
	};
	
	echo $list;
	
}


unset($dbc);
?>
<!--
<li id='35'><span class="text">Tree Node Ajax 1</span></li>
<li id='36'><span class="text">Tree Node Ajax 2</span></li>
<li id='37'><span class="text">Tree Node Ajax 3</span>
	<ul>
		<li id='38'><span class="text">Tree Node Ajax 3-1</span>
			<ul>
				<li id='39'><span class="text">Tree Node Ajax 3-1-1</span></li>
				<li id='40'><span class="text">Tree Node Ajax 3-1-2</span></li>
				<li id='41'><span class="text">Tree Node Ajax 3-1-3</span></li>
				<li id='42'><span class="text">Tree Node Ajax 3-1-4</span></li>
			</ul>
		</li>
		<li id='43'><span class="text">Tree Node Ajax 3-2</span></li>
		<li id='44'><span class="text">Tree Node Ajax 3-3</span>
			<ul>
				<li id='45'><span class="text">Tree Node Ajax 3-3-1</span></li>
				<li id='46'><span class="text">Tree Node Ajax 3-3-2</span></li>
				<li id='47'><span class="text">Tree Node Ajax 3-3-3</span></li>
			</ul>
		</li>
		<li id='48'><span class="text">Tree Node Ajax 3-4</span></li>
		<li id='49'><span class="text">Tree Node Ajax 3-5</span>
			<ul>
				<li id='50'><span class="text">Tree Node Ajax 3-5-1</span></li>
				<li id='51'><span class="text">Tree Node Ajax 3-5-2</span></li>
				<li id='52'><span class="text">Tree Node Ajax 3-5-3</span></li>
			</ul>
		</li>
		<li id='53'><span class="text">Tree Node Ajax 3-6</span></li>
	</ul>
</li>
<li id='54'><span class="text">Tree Node Ajax 4</span></li>
-->