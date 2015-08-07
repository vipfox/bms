<?php
namespace Home\Controller;
use Think\Controller;

class ProductController extends BaseController {
    

    public function index() {
       
        
        $this->display();
    }
    
    
    public function create() {

        if($_POST){
            
    $upload = new \Think\Upload();// 实例化上传类
    $upload->maxSize   =     3145728 ;// 设置附件上传大小
    $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
    $upload->rootPath  =     './Uploads/'; // 设置附件上传根目录
    $upload->savePath  =     ''; // 设置附件上传（子）目录
    // 上传文件 
    //$info   =   $upload->upload();
    $info   =   $upload->uploadOne($_FILES['product_image']);
    
    $data['product_image'] = $info['savepath'].$info['savename'];
    print_r($info);
    //exit;
    /*
    if(!$info) {// 上传错误提示错误信息
        $this->error($upload->getError());
    }else{// 上传成功
        $this->success('上传成功！');
    }
     * */
    
            
        $data['product_name']=$_POST['product_name'];    
        $data['product_store']=2;
        
        $data['product_code'] = base64_encode($data['product_name'].'+'.$data['product_store'].'+'.time());
            
        //print_r(base64_decode('6JmOKzIrMTQzODc1NDU2NA=='));
            
        $jsonData=json_encode($data);    
        
        $SeviceProduct = new \Sevice\Controller\admin\ProductController();//实例化Service模块
        $returnData=$SeviceProduct->create($jsonData);//利用登陆接口登陆,需使用json格式
        
        print_r($returnData);
            
        }
        
        
        
        $this->display();
    }
    
    
    public function Productlist(){
        
        $product_store = $_GET['store'];
        $filter = array(
                //'product_store' => $product_store,
                //'product_name' => 111,
        );
        
        $SeviceProduct = new \Sevice\Controller\admin\ProductController();
        $returnData=$SeviceProduct->search($filter);
        
        $this->display(productList);
        
       // print_r($returnData);
        
    }
    
}