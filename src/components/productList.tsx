import React, { useEffect } from 'react'
import { fetchProducts, deleteProduct } from '../slice/product'
import { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {Link } from "react-router-dom"

type Props = {}
const productList = (props: Props) => {
    const dispatch = useAppDispatch()
    const { value: products, loading } = useAppSelector((state: RootState) => state.product)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    if (loading) return <div>Loading...</div>
    
    // const { item } = useAppSelector((state: RootState) => state.product)
    const removeItem=async(id:number)=>{
        dispatch(deleteProduct( id))
    }
    return <div className="container">
        <Link to='/add'> <button className="btn btn-primary">Add</button></Link>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Stt</th>
                    <th>Name</th>
                    <th>price</th>
                    <th>Action</th>
                </tr>
            </thead>
           
            <tbody>
                {products.map((item,index) => (
                    <tr key={index}>
                        <td>{index +1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                            <Link to={`/edit/${item.id}`}><button className="btn btn-warning mx-1">Sua</button></Link>
                            <button className="btn btn-danger"  onClick={()=>removeItem(item.id!)}>Xoa</button>
                        </td>
                    </tr>
                ))}
                
                </tbody>
         
        </table>
    </div>

}

export default productList
