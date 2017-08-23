<?php

require '../vendor/autoload.php';

$client = new MongoDB\Client();

$cats = $client->newsfeed->category->find([], [
    'projection' => [
        'cat_name' => 1,
    ],
]);

echo(json_encode(iterator_to_array($cats)));

?>