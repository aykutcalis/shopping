/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {Form,Button,Table} from "react-bootstrap"
import './App.css'
import {nanoid} from "nanoid"
import styled from "styled-components"

const shops = ["Migros","Teknosa","Bim"];
const categories = ["Elektronik","Şarkuteri","oyuncak","Fırın","Bakliyat"];
const StyledTable =styled.td`
text-decoration: ${(props)=> (props.isBought ? "line-through" : "none" )}
`

function App() {
const [products ,setProducts] = useState([])
const [productName ,setproductName] = useState("")
const [productShop ,setproductShop] = useState("")
// eslint-disable-next-line no-unused-vars
const [productCategory ,setproductCategory] = useState("")
const [filteredName ,setfilteredName] = useState("")
const [filteredShop ,setfilteredShop] = useState("")
const [filteredCategory ,setfilteredCategory] = useState("")
const handleAddProduct=()=>{
  if (!productName || !productShop || !productCategory){
    alert("Please Fill All the Areas")
    return
  }
  const newProduct ={
    id:nanoid(),
    name: productName,
    shop: productShop,
    category :productCategory
  }
  setProducts([...products,newProduct])
  console.log(products)
  setproductName("")
  setproductShop("")
  setproductCategory("")
}
const handleBought=(productId)=>{
const updatedProducts= products.map((product)=>
  product.id === productId ? {... product , isBought: !product.isBought} : product 
);
setProducts(updatedProducts);
}
const handleDeleteProduct =(productId)=>{
  const updatedProducts= products.filter((product)=>
    product.id !== productId
  )
  setProducts(updatedProducts);
}
const filteredProducts = products.filter((product)=>{
  const nameMatch =product.name.toLowerCase().includes(filteredName.toLowerCase());
  const shopMatch =  product.shop=== filteredShop || filteredShop === "";
  const categoryMatch =  product.category=== filteredCategory || filteredCategory === "";
  return nameMatch && shopMatch && categoryMatch ;
})
  return (
  <>
    <div className='container d-flex gap-5 justify-content-center'>
    <Form>
      <Form.Group controlId='productName'>
<Form.Label>Product Name</Form.Label>
<Form.Control type='text' placeholder='Enter Product Name' value={productName} onChange={(e) => setproductName(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId='productShop'>
<Form.Label>Shop</Form.Label>
<Form.Control as="select" value={productShop} onChange={(e) => setproductShop(e.target.value)}>
<option>Select Shop</option>
  { shops.map ((shop,index)=>(
<option key={index} value= {shop}>{shop}</option>
  ))}
</Form.Control>
      </Form.Group>
      <Form.Group controlId='productCategory'>
<Form.Label>Category</Form.Label>
<Form.Control as="select" value={productCategory} onChange={(e) => setproductCategory(e.target.value)}>
<option>Select Category</option>
  { categories.map ((category,index)=>(
<option key={index} value= {category}>{category}</option>
  ))}
</Form.Control>
      </Form.Group>
      <Button className='mt-2' onClick={handleAddProduct}>
        Add Product
      </Button>
    </Form>

    <Form>
      <Form.Group controlId='filteredName'>
<Form.Label>Filter by Name</Form.Label>
<Form.Control type='text' placeholder='Enter Something..' value={filteredName} onChange={(e) => setfilteredName(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId='filteredShop'>
<Form.Label>Fİlter by Shop</Form.Label>
<Form.Control as="select" value={filteredShop} onChange={(e) => setfilteredShop(e.target.value)}>
<option>All Shops</option>
  { shops.map ((shop,index)=>(
<option key={index} value= {shop}>{shop}</option>
  ))}
</Form.Control>
      </Form.Group>
      <Form.Group controlId='filteredCategory'>
<Form.Label>Filter by Category</Form.Label>
<Form.Control as="select" value={filteredCategory} onChange={(e) => setfilteredCategory(e.target.value)}>
<option>All Categories</option>
  { categories.map ((category,index)=>(
<option key={index} value= {category}>{category}</option>
  ))}
</Form.Control>
      </Form.Group>
   
    </Form>
    </div>
    <div className='container'>
<Table striped bordered hover>
<thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Shop</th>
    <th>Category</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {filteredProducts.map((product)=>(
<tr key={product.id}>
<StyledTable isBought={product.isBought}>
  {product.id}
</StyledTable>
<StyledTable isBought={product.isBought}>
  {product.name}
</StyledTable>
<StyledTable isBought={product.isBought}>
  {product.shop}
</StyledTable>

<StyledTable isBought={product.isBought}>
  {product.category}
</StyledTable>
<StyledTable isBought={product.isBought}>
  <td>
    <Button onClick={()=>handleBought(product.id)}>{product.isBought ? "Satın Alındı" : "Satın Alındı olarak İşaretle" }</Button>
    <Button variant='danger' onClick={() => handleDeleteProduct(product.id)}>Sil</Button>
  </td>
</StyledTable>

</tr>
  ))}
</tbody>
</Table>
    </div>
  </>
  )
}

export default App
