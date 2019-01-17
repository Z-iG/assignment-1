/**
 * Created by Igor on 12/13/2018.
 */
var express = require('express');

var router = express.Router();





var toDoItemsCtrl = require('./components/toDoItems/toDoItemsController');
var toDoItemCtrl = require('./components/toDoItem/toDoItemController');




//var toDoItemCtrl = require('./toDoItem/toDoItemController.js');


/// TO DO ITEMs ROUTES ///








// GET request to get a list of 'to do items'.
router.get('/to-do-items', toDoItemsCtrl.to_do_items_get);







// GET request to get details of the 'to do item'.
router.get('/to-do-item', toDoItemCtrl.to_do_item_get);

/*
// DELETE request to delete a list(array of ids) of 'to do items'.
router.delete('/to-do-item', toDoItemCtrl.to_do_item_delete);

/// TO DO ITEM ROUTES ///

// GET request to get details of one 'to do item'.
router.get('/to-do-item', toDoItemCtrl.to_do_item_get);

// POST request to create one 'to do item'.//todo think about get here How do I know its id?
router.post('/to-do-item', toDoItemCtrl.to_do_item_create);


// PUT request to update one 'to do item'.
router.put('/to-do-item', toDoItemCtrl.to_do_item_update);*/



module.exports = router;