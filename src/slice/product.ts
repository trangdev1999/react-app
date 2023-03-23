import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../interface/product";



type StateProduct = {
    value: IProduct[];
    item: IProduct,
    loading: boolean
}

const initialState: StateProduct = {
    value: [],
    item: { name: "" },
    loading: true
}


export const listProduct = createAsyncThunk('product/listProduct', async (id: number | string) => {
    const response = await fetch('http://localhost:3000/products/' + id)
    const data = await response.json()
    return data

})

export const fetchProducts = createAsyncThunk('product/fetchProduct', async (id: number) => {
    const response = await fetch('http://localhost:3000/products/')
    const data = await response.json()
    return data

})

export const addProduct = createAsyncThunk('product/addProduct', async (product: IProduct) => {
    const response = await fetch('http://localhost:3000/products/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    const data = await response.json()
    return data
})



//update
export const updateProduct = createAsyncThunk("product/update", async (product: IProduct) => {
    const response = await fetch("http://localhost:3000/products/" + product.id, {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(product)
    })
    const data = await response.json()
    return data
})

//delete
export const deleteProduct = createAsyncThunk("product/delete", async(id:number)=>{
    const response = await fetch('http://localhost:3000/products/' + id,{
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        },
      
    })
    const data = await response.json()
    return data
})


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {


        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.value = action.payload
            state.loading = false
        })

        //them moi
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.value.push(action.payload)
            state.loading = false
        })

        // list one product

        builder.addCase(listProduct.fulfilled, (state, action) => {
            state.item = action.payload
            state.loading = false
        })

        // //update
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.value = state.value.map(item=>item.id === action.payload.id? action.payload:item)
            state.loading = false
        })
        // delete
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.value = state.value.map(item => item.id === action.payload.id ? action.payload : item)
            state.loading = false
        })
    }
})

export default productSlice.reducer