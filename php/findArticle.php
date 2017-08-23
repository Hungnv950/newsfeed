<?php

require '../vendor/autoload.php';

$_id = isset($_GET['_id']) ? json_decode($_GET['_id']) : 1;

$keyCat = isset($_GET['keyCat']) ? json_decode($_GET['keyCat']) : 1;

$client = new MongoDB\Client();

if ($_id == 1) {
    $arts = $client->newsfeed->article->find();

    echo(json_encode(iterator_to_array($arts)));
} else {
    $search = null;

    foreach ($_id as $key => $value) {
        $value = get_object_vars($value);
        $search = $client->newsfeed->article->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $value['$oid'])]);

        $search[$key]['cat_name'] = "";

        if ($keyCat != 1) {
            foreach ($keyCat as $value_) {
                $value_ = get_object_vars($value_);
                $cat = $client->newsfeed->category->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $value_['$oid'])], ['projection' => [
                    'cat_name' => 1,
                ]]);

                $search[$key]['cat_name'] = $cat['cat_name'];
            }
        }
    }

    if (count($search) == 1) {
        echo(json_encode($search[0]));
    } else {
        echo(json_encode($search));
    }


}
