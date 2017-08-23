<?php

require '../vendor/autoload.php';

$_id = isset($_GET['_id']) ? json_decode($_GET['_id']) : 1;

$positions = isset($_GET['positions']) ? $_GET['positions'] : -1;

if ($positions) {
    $positions = json_decode($positions);
}

$client = new MongoDB\Client();

$search = [];

if ($_id == 1) {
    $search = $client->newsfeed->category->find([], [
        'projection' => [
            'cat_name' => 1,
            'sub_category' => 1,
        ],
    ]);

} else {
    foreach ($_id as $value) {
        $value = get_object_vars($value);
        $search[] = $client->newsfeed->category->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $value['$oid'])], ['projection' => [
            'cat_name' => 1,
            'sub_category' => 1,
        ]]);
    }
}

$result = [];

$catSelect = [];

if ($positions != -1) {
    foreach ($positions as $key => $value) {
        $value = get_object_vars($value);
        $temp = get_object_vars($value['keyCat']);
        $catSelect[$temp['$oid']] = $temp['$oid'];
    }
}

$cats = [];

foreach ($search as $key => $value) {
    $id = get_object_vars($value['_id']);

    if (in_array($id['oid'], $catSelect)) {
        $cats[] = $value;
    }
}

foreach ($cats as $cat) {

    $count = 0;
    $temp = null;

    $temp['cat_name'] = $cat['cat_name'];
    $temp['_id'] = $cat['_id'];

    foreach ($cat['sub_category'] as $key => $sub) {

        $count += count($sub['articles']);

        $articles = $sub['articles'];

    }

    $temp['articles'] = $count;

    if ($count) {
        $article = get_object_vars($cat['sub_category'][0]['articles'][0]);
        $article = $client->newsfeed->article->findOne(['_id' => new MongoDB\BSON\ObjectID('' . $article['oid'])], ['projection' => [
            'image' => 1,
        ]]);

        $temp['image'] = $article['image'];

    }

    $result[] = $temp;

}

echo(json_encode($result));

