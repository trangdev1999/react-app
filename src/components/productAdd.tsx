import React from 'react'
import { IProduct } from '../interface/product'
import { useAppDispatch } from '../store/hooks'
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../slice/product';


const productAdd = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm<IProduct>()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onHandleSubmit: SubmitHandler<IProduct> = (data) => {
    dispatch(addProduct(data)).then(() => {
      navigate("/")
    })
  }

  return (
    <div className="container" >
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="mb-3 mt-3">
          <label className="form-label">Name:</label>
          <input type="text" className='form-control' {...register("name", { required: true })} />
          {errors.name && <span>Khong duoc  bo trong</span>}
        </div>
        <div className="mb-3 mt-3">
          <label  className="form-label">Price:</label>
          <input type="text" className='form-control'  {...register("price", { required: true })} />
          {errors.price && <span>Khong duowc bo trong</span>}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default productAdd
