<?php
    namespace Sevice\Controller\admin;
    use Think\Controller;
    class ProductController extends Controller {
        
        public function index(){
            
        } 
        

        
        public function create($data){
            
            print_r($data);
            
            $data=json_decode($data,true);
            $filter = array(
                'product_name' => $data['product_name'],
                'product_store' => $data['product_store'],
                'product_code' => $data['product_code'],
                'product_image' => $data['product_image'],
                
            );
            
            $User = M('Product');
            $returnData=$User->add($filter);
            
            return $returnData;
            
        }
        
        
        public function search($where){
               
            $User = M('Product'); // 实例化User对象
            
            $arrData = $User->where($where)->select();    
            //$jsonData = json_encode($arrData);
            
            return $arrData;
            //print_r($jsonData);
            
        }

        

    
        
    }