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
    await Product.create({ name, category, price, imgURL })
    res.sendStatus(204)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  res.send('update product')
}

export const deleteProduct = async (req, res) => {
  res.send('delete product')
}

export const getProduct = async (req, res) => {
  res.send('get product')
}
