const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async(req, res) => {
  try {  // find all tags
  const tags = await Tag.findAll( {include: [{model: Product}]} )
  res.status(200).json(tags)
} catch {
res.status(500).json( {message: "Could not find all of the Tags and/or its associated Products"});
}
});

router.get('/:id', async (req, res) => {
  try {  // find a single tag by its `id` // be sure to include its associated Product data
    const singleTag = await Tag.findByPk(req.params.id,  {include: [{model: Product}]})
    res.status(200).json(singleTag)
  } catch {
    res.status(500).json( {message: "Could not find tag"})
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  } catch {
    res.status(500).json( { message: "Could not create a new tag"})
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {   // update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, {where: {id: req.params.id}} )
    res.status(200).json(updatedTag)
  } catch {
    res.status(500).json({ message: "Failed to update a tag's name by it's id value"})
  }
});

router.delete('/:id', async (req, res) => {
  try {   // delete on tag by its `id` value
    const deletedTag = await Tag.destroy( {where: {id: req.params.id}})
    res.status(200).json(deletedTag)
  } catch {
    res.status(500).json( {message: "'Bad Request: Invalid parameters or request syntax.'"})
  }
});

module.exports = router;
