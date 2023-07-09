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

router.get('/:id', (req, res) => {
  try {
    const singleTag = Tag.findByPk(req.params.id,  {include: [{model: Product}]})
    res.status(200).json(singleTag)
  } catch {
    res.status(500).json( {message: "Could not find tag"})
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
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

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {

  } catch {
    
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {

  } catch {
    
  }
});

module.exports = router;
