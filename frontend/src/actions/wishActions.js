import axios from 'axios'

import { WISH_ADD_ITEM, WISH_REMOVE_ITEM } from "../constants/wishListConstants"



export const addToWishMen = (id) => async (dispatch, getState) => {

    const menproduct = await axios.get(`/api/menswear/menproduct/${id}`)

    dispatch({
        type: WISH_ADD_ITEM,
        payload: {
            product: menproduct.data._id,
            name: menproduct.data.name,
            gender: menproduct.data.gender,
            image: menproduct.data.image,
            price: menproduct.data.price,
            countInStock: menproduct.data.countInStock,
            category: menproduct.data.category,

        },
    })


    localStorage.setItem('wishlist', JSON.stringify(getState().wishList.wishlist))
}

export const addToWishWomen = (id) => async (dispatch, getState) => {

    const womenproduct = await axios.get(`/api/womenswear/womenproduct/${id}`)

    dispatch({
        type: WISH_ADD_ITEM,
        payload: {
            product: womenproduct.data._id,
            name: womenproduct.data.name,
            gender: womenproduct.data.gender,
            image: womenproduct.data.image,
            price: womenproduct.data.price,
            countInStock: womenproduct.data.countInStock,
            category: womenproduct.data.category,

        },
    })


    localStorage.setItem('wishlist', JSON.stringify(getState().wishList.wishlist))
}

export const removeFromWish = (id) => (dispatch, getState) => {
    dispatch({
        type: WISH_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('wishlist', JSON.stringify(getState().wishList.wishlist))
}