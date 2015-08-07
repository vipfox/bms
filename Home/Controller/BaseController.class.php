<?php

namespace Home\Controller;
use Think\Controller;

class BaseController extends Controller {
    
    function __construct() {
        parent::__construct();

        
        if(empty($_COOKIE['USERNAME'])){
            //$this->success('', '?c=user&a=login');
        }
        
    }
    
}
