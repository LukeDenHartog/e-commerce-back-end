// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// The code Product.belongsTo(Category, { foreignKey: 'category_id' }) sets up a belongsTo association between the Product and Category models, indicating that each Product instance belongs to a single Category instance.

Product.belongsTo(Category, {
  foreignKey: 'category_id'
  // The { foreignKey: 'category_id' } option specifies that a foreign key named category_id will be added to the Product model's table to establish the relationship. This foreign key will reference the primary key of the associated Category model.

  // By adding this association, you can perform various operations and queries that involve the relationship between Product and Category models. For example, you can easily retrieve the Category associated with a specific Product instance or fetch all products belonging to a particular Category.
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
})

Product.belongsToMany(Tag, {
  // belongsToMany(Tag, { ... }): Specifies that the Product model belongs to many Tag instances.

  through: {
    model: ProductTag,
    foreignKey: 'product_id'
      // through: { model: ProductTag, foreignKey: 'product_id' }: Specifies the intermediary model to use (ProductTag) and sets the foreign key product_id in the ProductTag model as the reference to the Product model.  
  }
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: 'tag_id'
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
