<?php

require '../vendor/autoload.php';

$_id = isset($_GET['_id']) ? json_decode($_GET['_id']) : 1;

$client = new MongoDB\Client();

$cats = [];

if ($_id == 1) {
    $cats = $client->newsfeed->category->find([], [
        'projection' => [
            'cat_name' => 1,
            'sub_category' => 1,
        ],
    ]);

    echo(json_encode(iterator_to_array($cats)));
} else {
    $search = [];

    foreach ($_id as $value) {
        $value = get_object_vars($value);
        $cats[] = $client->newsfeed->category->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $value['$oid'])], ['projection' => [
            'cat_name' => 1,
            'sub_category' => 1,
        ]]);
    }

    echo(json_encode($cats));
}
