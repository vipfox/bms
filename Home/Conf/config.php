<?php

    $db = include 'db.inc.php';
    $public = include 'public.php';

    return array_merge($public,$db);