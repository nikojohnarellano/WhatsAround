import {
    GET_LISTINGS,
    ADD_LISTING_SUCCESS,
    ADD_LISTING_FAIL,
    UPDATE_LISTING,
    DELETE_LISTING
} from '../actions/types'

const INITIAL_STATE = {
    listings          : [],
    addListingSuccess : true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LISTINGS : {
            const { listings } = action
            return { ...state, listings }
        }

        case ADD_LISTING_SUCCESS : {
            const { newListing } = action
            return { ...state, addListingSuccess : true, listings : [...state.listings, newListing]}
        }

        case ADD_LISTING_FAIL : {
            return { ...state, addListingSuccess : false }
        }

        case UPDATE_LISTING : {

        }

        case DELETE_LISTING : {

        }

        default : {
            return state
        }
    }
}