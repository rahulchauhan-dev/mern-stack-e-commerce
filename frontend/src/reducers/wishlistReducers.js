import { WISH_ADD_ITEM, WISH_REMOVE_ITEM } from '../constants/wishListConstants'


export const wishlistReducers = (state = { wishlist: [] }, action) => {

    switch (action.type) {
        case WISH_ADD_ITEM:
            const item = action.payload
            const existItem = state.wishlist.find((x) => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    wishlist: state.wishlist.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    wishlist: [...state.wishlist, item],
                }
            }
        case WISH_REMOVE_ITEM:
            return {
                ...state,
                wishlist: state.wishlist.filter((x) => x.product !== action.payload),
            }

        default:
            return state
    }


}

export default wishlistReducers
