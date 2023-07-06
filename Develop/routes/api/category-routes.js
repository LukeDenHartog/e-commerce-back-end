const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await findAll( {include: [{ model: Product}] } )
    res.status(200).json(categories);
  }catch (err) {
    res.status(500).json({ message: 'Could not find all of the categories and/or its associated Products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find the category with the matching ID, including its associated products
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

    if (!category) {
      res.status(404).json({ message: 'id not found' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});


router.post('/', async (req, res) => {
  try {  // create a new category
   const newCat = await Category.create(req.body);
   res.status(200).json(newCat);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request: Invalid parameters or request syntax.' });
  }
 
});

router.put('/:id', async (req, res) => {
  try {  // update a category by its `id` value
  const updatedCategory = await Category.update(req.body, {where: {id: req.params.id } })
  res.status(200).json(updatedCategory);
} catch {
  res.status(400).json({ message: 'Bad Request: Invalid parameters or request syntax.' });
}
 
});

router.delete('/:id', async (req, res) => {
  try { // delete a category by its `id` value
    deletedCategory = await Category.destroy(req.body, {where: {id: req.params.id} })
  } catch {
    res.status(400).json({ message: 'Bad Request: Invalid parameters or request syntax.' });
  }
  
});

module.exports = router;
