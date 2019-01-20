var express = require('express');
var router = express.Router();

var toDoItemsCtrl = require('./components/toDoItems/toDoItemsController');
var toDoItemCtrl = require('./components/toDoItem/toDoItemController');


/// TO DO ITEMs ROUTES ///

// GET request to get a list of 'to do items'.
router.get('/to-do-items', toDoItemsCtrl.to_do_items_get);

// GET request to get details of the 'to do item'.
router.get('/to-do-item', toDoItemCtrl.to_do_item_get);


// DELETE request to delete one 'to do item'.
router.delete('/to-do-item/:id', toDoItemCtrl.to_do_item_delete);


// POST request to create one 'to do item'.
router.post('/to-do-item', toDoItemCtrl.to_do_item_create);


// PUT request to update one 'to do item'.
router.put('/to-do-item', toDoItemCtrl.to_do_item_update);



module.exports = router;