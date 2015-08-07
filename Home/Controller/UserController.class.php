<?php
    namespace Home\Controller;
    use Think\Controller;
    class UserController extends BaseController {
        
        public function index(){
            
        } 
       
        
       
        
        public function  login(){

                //$method='user.checkLogin';
                $username = $_POST['username'];
                $password = $_POST['password'];
                $loginType = 'pc';

                if($_POST){

                    $data= array(
                    //'method' => $method,
                    'username' => $username,
                    'password' => $password,
                    'loginType' => $loginType    
                    ); 
                    $jsonData=json_encode($data);

                    $SeviceUser = new \Sevice\Controller\admin\UserController();//实例化Service模块
                    $returnData=$SeviceUser->login($jsonData);//利用登陆接口登陆,需使用json格式

                    if($returnData){

                        $this->saveCookies($returnData);
                        $this->success('已登陆', '?c=Dashboard',3);

                    }else{
                        echo 'error:username or password';
                    }

                }

                $this->display("login");

        }
        
        
        public function signin(){
            
            $username = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];
            $loginType = 'pc';
            
            if($_POST){
              
                $data= array(
                        //'method' => $method,
                        'username' => $username,
                        'password' => $password,
                        'email' =>$email,
                        //'loginType' => $loginType    
                );
                $jsonData=json_encode($data);

                $SeviceUser = new \Sevice\Controller\admin\UserController();//实例化Service模块
                $returnData=$SeviceUser->signin($jsonData);//利用登陆接口登陆,需使用json格式

                if($returnData>0){
                    $this->success('success,','?c=user&a=login',3);
                }
            
            }

            $this->display("signin");
        }
        
        
        
        public function forgotPwd(){
            
            $this->display("forgotPwd");
        }

        

        public function saveCookies($returnData){
            
            $value=base64_encode($returnData['username']);
            setcookie("USERNAME",$value, time()+3600*16);

        }
    
    }