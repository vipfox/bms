<?php

namespace Home\Controller;
use Think\Controller;

class PublicController extends Controller {

    //如果输入的是index的话也让其显示login页的模版
    function index() {
        $lasturl = $_SERVER['HTTP_REFERER'];
        $this->url = $lasturl;
        //echo $lasturl;
        if ($_SESSION[C('USER_AUTH_KEY')]) {
            $this->redirect("dashboard/index");
        } else {
            //$this->assign("url",$lasturl);
            $this->display("login");
        }
    }

    //退出动作
    public function logout() {
        //检测是否设置了USER_AUTH_KEY
        if (isset($_SESSION[C('USER_AUTH_KEY')])) {
            //删除USER_AUTH_KEY
            unset($_SESSION[C('USER_AUTH_KEY')]);
            //注稍这个session_id所有的内容
            unset($_SESSION);
            //调用session_destory()删除所有内容
            session_destroy();
            //设置退出成功的跳转页
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->success('登出成功！');
        } else {
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->error('已经登出！');
        }
    }

    // 登录检测的方法，登陆表单中的action地址需要写这一个地址
    public function checkLogin() {
        //如果用户名密码（可在此外加验证码）为空则直接阻止用户访问
        if (empty($_POST['username'])) {
            $this->error('帐号错误！');
        } elseif (empty($_POST['password'])) {
            $this->error('密码必须！');
        }
        //生成认证条件
        $map = array();
        // 支持使用绑定帐号登录，将获得到用户名放到$map中
        $map['username'] = $_POST['username'];
        $map['active'] = 1;
        //加载RBAC类
        import('ORG.Util.RBAC');
        //通过authenticate去读取出来所有的用户信息,仅传用户名即可
        $authInfo = RBAC::authenticate($map);

        //使用用户名、密码和状态的方式进行认证
        //如果没有获取到信息
        if (false === $authInfo || $authInfo == "") {
            $this->error('帐号不存在或已禁用！');
        } else {
            //通过$authinfo获取的信息与post当中的md5密码进行对比
            if (strtolower($authInfo['password']) != strtolower(md5($_POST['password']))) {
                $this->error('密码错误！');
            }

            //激活用户标识号
            $_SESSION[C('USER_AUTH_KEY')] = $authInfo['user_id'];
            $_SESSION['user'] = $authInfo;


            //如果用户标识号是管理员，则激活管理员标识，具有一切可访问权限 
            if (in_array($authInfo['username'], array('admin', 'system'))) {
                $_SESSION[C('ADMIN_AUTH_KEY')] = true;
            }
            // 通过RBAC类中的静态方法saveAccessList缓存访问权限
            RBAC::saveAccessList();

//            dump($_SESSION[C('USER_AUTH_KEY')]);
//            die();
            //判断密码过期
            if (D('user')->check_password()) {
                $this->assign("jumpUrl", '?m=user&a=password');
                $this->success('登录成功！但是密码已经过期,请修改');
            } else {
                //判断用户从哪进入登陆页面，登陆成功后返回前一个页面
                $url = explode("?", $_POST['url']);
                $url=explode("&", $url[1]);

                if (isset($_POST['url']) && !empty($_POST['url']) && $url['0'] != "m=public" && $url['0'] != "m=public" && $url['0'] != "m=public" && $url['0'] != "m=public" && $url['0'] != "m=public") {
                    $this->assign("jumpUrl", $_POST['url']);
                } else {
                    $this->assign("jumpUrl", '?m=dashboard&a=index');
                }
                $this->assign("waitSecond", "2");
                $this->success('登录成功！');
            }
        }
    }

    public function return_password() {
        $newc = new Crypt;
        $user = D('user');
        $where['username'] = $_POST['username'];
        $where['email'] = $_POST['email'];
        $string = "user_id,username,email";
        $list = $user->where($where)->field($string)->select();
        if (!$list) {
            $this->assign("jumpUrl", '?m=public&a=forgot_password');
            $this->success('用户名或邮箱地址错误');
        } else {
            $key = md5($username . $email . date('Y-m-d H:i:s'));
            $data['password_key'] = $key;
            $res = $user->where($where)->save($data);

            $url = $_SERVER["SERVER_NAME"].":".$_SERVER['SERVER_PORT'].$_SERVER['PHP_SELF'];
            $username = $newc->enCrypt($_POST['username'], $key);
            $email = $newc->enCrypt($_POST['email'], $key);
            $time = $newc->enCrypt(date('Y-m-d H:i:s'), $key);
            $new_url = $newc->enCrypt($username . "|" . $key . "|" . $email . "|" . "$time", "password01!");
            $end_url = $url . "?m=public&a=password&%*454fu87yzxdgyr=" . $new_url;
            $message = "<h3>找回密码说明</h3></br>" . $_POST['username'] . "  这封信是由 SDU团队 发送的。</br></br>  您收到这封邮件，是由于这个邮箱地址在 " . C('CRM_Name') . " 被登记为用户邮箱， 且该用户请求使用 Email 密码重置功能所致。</br></br>";
            $message .="----------------------------------------------------------------------</br>  重要</br> ----------------------------------------------------------------------</br></br>";
            $message .="如果您没有提交密码重置的请求或不是 " . C('CRM_Name') . " 的注册用户，请立即忽略 并删除这封邮件。只有在您确认需要重置密码的情况下，才需要继续阅读下面的 内容。</br></br>";
            $message .="----------------------------------------------------------------------</br>  <b>密码重置说明</b></br>----------------------------------------------------------------------</br></br>";
            $message .="您只需在提交请求后的24小时内，通过点击下面的链接重置您的密码：</br>http://" . $end_url . "</br>(如果上面不是链接形式，请将该地址手工粘贴到浏览器地址栏再访问)</br></br>";
            $message .="在上面的链接所打开的页面中输入新的密码后提交，您即可使用新的密码登录系统了。</br></br>";
            $message .="此致</br></br>  SDU团队</br></br>";
            $success = self::send_email("密码重置", $_POST['username'], $_POST['email'], $message);
            if ($success['status'] == "1") {
                $this->assign("jumpUrl", '?m=public&a=index');
                $this->success('重置密码的链接已发送到你的邮箱，请注意查收！');
            } else {
                $this->assign("jumpUrl", '?m=public&a=index');
                $this->error($success['message']);
            }
        }
    }

    public function password() {
        $newc = new Crypt;
        $user = D('user');
        if (!isset($_GET['%*454fu87yzxdgyr'])) {
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->error('此链接为非法链接！');
        }
        $string = $_GET['%*454fu87yzxdgyr'];
        $string = $newc->deCrypt($string, "password01!");
        $array = explode("|", $string);
        if (count($array) != '4') {
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->error('此链接为非法链接！');
        }
        $key = $array['1'];
        $username = $newc->deCrypt($array['0'], $key);
        $email = $newc->deCrypt($array['2'], $key);
        $time = $newc->deCrypt($array['3'], $key);
        if (empty($username) && empty($email) && empty($time)) {
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->error('此链接为非法链接！');
        }
        $last_time = date('Y-m-d H:i:s', strtotime("+1 day", strtotime($time)));
        if (date('Y-m-d H:i:s') > $last_time) {
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->error('此链接已超时，请重新获取重置密码链接！');
        }
        $user = D('user');
        $where['username'] = $username;
        $string = "password_key";
        $list = $user->where($where)->field($string)->select();
        if ($list['0']['password_key'] != $key) {
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->error('此链接为非法链接，请重新获取重置密码链接！');
        }

        $this->username = $username;
        $this->email = $email;
        $this->display();
    }

    public function updata_password() {
        $user = D('user');
        if (empty($_POST['password'])) {
            $this->error('密码不能为空');
        } else if ($_POST['password'] != $_POST['confirm_password']) {
            $this->error(' 两次输入的密码不一样');
        } else if (preg_match("/^(?![0-9a-z]{8,16}$|[a-z~!@#$%^&*()_+]{8,16}$)[a-z0-9~!@#$%^&*()_+]{8,16}$/i", $_POST['password']) == false) {
            $this->error('密码必须包含数字、字母、符号，长度为8到16位');
        }
        $data['password'] = md5($_POST['password']);
        $data['effective_time'] = date('Y-m-d H:i:s');
        $data['password_key'] = "";
        $where['username'] = $_POST['username'];
        $where['email'] = $_POST['email'];
        $res = $user->where($where)->save($data);
        if ($res) {
            $this->assign("jumpUrl", '?m=public&a=index');
            $this->success('密码重置成功');
        }
    }

    protected function send_email($subject, $user, $email, $message) {

        $mail = new PHPMailer();
        $mail->IsSMTP();                  // send via SMTP    
        $mail->Host = C('Mail_Host');   // SMTP servers    
        $mail->SMTPAuth = true;           // turn on SMTP authentication    
        $mail->Username = C('Mail_User');     // SMTP username  注意：普通邮件认证不需要加 @域名    
        $mail->Password = C('Mail_Password'); // SMTP password    
        $mail->From = C('Mail_From');      // 发件人邮箱    
        $mail->FromName = C('Mail_User');  // 发件人  
        $mail->CharSet = "utf-8";   // 这里指定字符集！    
        $mail->Encoding = "base64";
        $mail->AddAddress($email, $user);  // 收件人邮箱和姓名    
        $mail->AddCC("michael.shi@transcosmos-cn.com", "michael");
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->AltBody = "text/html";
        if (!$mail->Send()) {
            return array('message' => "邮件发送失败，邮件错误信息: " . $mail->ErrorInfo, 'status' => '0');
        } else {
            return array('message' => "邮件发送成功!", 'status' => '1');
        }
    }
    

   

}

?>