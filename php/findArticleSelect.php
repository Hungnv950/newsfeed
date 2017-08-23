<?php

require '../vendor/autoload.php';

$_id = isset($_GET['_id']) ? json_decode($_GET['_id']) : 1;
$position = isset($_GET['position']) ? $_GET['position'] : -1;

$client = new MongoDB\Client();

$arts = [];

if ($_id != 1 && $position != -1) {

    $_id = get_object_vars($_id[0]);

    $cat = $client->newsfeed->category->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $_id['$oid'])], ['projection' => [
        'cat_name' => 1,
        'sub_category' => 1,
    ]]);

    $sub = $cat['sub_category'][0]['articles'];

    $result = [];

    $result['cat_name'] = $cat['cat_name'];
    $result['subs'] = [];
    $subs = [];
    $subs[] = $cat['sub_category'][0]['sub_cat_name'];

    foreach ($cat['sub_category'] as $key => $value) {
        if ($position != $key) {
            $subs[] = $value['sub_cat_name'];
        }
    }

    $result['subs'] = $subs;

    $articles = [];

    foreach ($sub as $value) {
        $value = get_object_vars($value);
        $articles[] = $client->newsfeed->article->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $value['oid'])]);
    }

    $result['articles'] = $articles;
    echo(json_encode($result));
}
