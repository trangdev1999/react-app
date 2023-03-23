import React, { useEffect } from 'react'
import { IProduct } from '../interface/product'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { listProduct, updateProduct } from '../slice/product';
import { RootState } from '../store';

type Props = {}

const ProductEdit = (props: Props) => {

    const { register, handleSubmit, formState: { errors }, } = useForm<IProduct>()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const {item}=useAppSelector((state:RootState)=>state.product)
    const onHandleSubmit: SubmitHandler<IProduct> = (data) => {
       dispatch(updateProduct({id:item.id,...data})).then(()=>{
        navigate("/")
       })
    }

    useEffect(()=>{
       dispatch(listProduct(id))
    },[])

    return (
        <div className="container" >
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3 mt-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className='form-control' defaultValue={item.name} {...register("name", { required: true })} />
                    {errors.name && <span>Khong duoc  bo trong</span>}
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Price:</label>
                    <input type="text" className='form-control' defaultValue={item.price} {...register("price", { required: true })} />
                    {errors.price && <span>Khong duowc bo trong</span>}
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ProductEdit
