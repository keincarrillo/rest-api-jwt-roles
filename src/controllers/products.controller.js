import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll()

    products.length === 0
      ? res.status(404).json({ message: 'No se encontraron productos' })
      : res.json(products)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body
  try {
    const productCreated = await Product.create(
      { name, category, price, imgURL },
      { returning: true }
    )
    res.status(201).json(productCreated)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body
  const { productId } = req.params
  try {
    const [rowsAfected, [updatedProduct]] = await Product.update(
      {
        name,
        category,
        price,
        imgURL
      },
      { where: { id: productId }, returning: true }
    )
    rowsAfected === 0
      ? res.status(404).json({
          message: `No se encontro el producto con el id: ${productId}`
        })
      : res.json(updatedProduct)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  const { productId } = req.params
  try {
    const productDeleted = await Product.destroy({ where: { id: productId } })
    productDeleted === 0
      ? res.status(404).json({
          message: `No se encontro el producto con el id: ${productId}`
        })
      : res.sendStatus(204)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const getProduct = async (req, res) => {
  const { productId } = req.params
  try {
    const product = await Product.findByPk(productId)
    product === null
      ? res.status(404).json({
          message: `No se encontro el producto con el id: ${productId}`
        })
      : res.json(product)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
