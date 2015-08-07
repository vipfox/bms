<?php
    namespace Sevice\Controller\admin;
    use Think\Controller;
    class UserController extends Controller {
        
        public function index(){
            
        } 
        
        
        //{"method":"user.checkLogin","username":"user01","password":"123456","loginType":"pc"}
        public function login($data){

            $data=json_decode($data,true);
            $filter = array(
                'username' => $data['username'],
                'password' => md5($data['password']),
            );
            
            $User = M('User'); // 实例化User对象
            $returnData = $User->where($filter)->find();
            
            if($returnData){
                return $returnData;
            }else{
                return false;
            }
            
        }
        
        
        public function signin($data){
            
            $data=json_decode($data,true);
            $filter = array(
                'username' => $data['username'],
                'password' => md5($data['password']),
                'email' => $data['email'],
            );
            
            $User = M('User');
            $returnData=$User->add($filter);
            return $returnData;
            
        }

        

        public function checkLogin(){
            
            
        }
        
        
    }