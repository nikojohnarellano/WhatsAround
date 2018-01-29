import ApiHelper from '../api/ApiHelper'
import {
    GET_LISTINGS,
    ADD_LISTING_SUCCESS,
    ADD_LISTING_FAIL,
    UPDATE_LISTING,
    DELETE_LISTING
} from '../actions/types'


export const getListings = () => async (dispatch) => {
    const listings = await ApiHelper.get('api/listing')
    dispatch({ type : GET_LISTINGS, listings })    
}

export const addListing = (listing) => async (dispatch) => {
    let listingToBePosted = new FormData()
    listingToBePosted.append('seller', listing.seller)
    listingToBePosted.append('title', listing.title);
    listingToBePosted.append('location', listing.location);
    listingToBePosted.append('latitude', listing.latitude);
    listingToBePosted.append('longitude', listing.longitude);
    listingToBePosted.append('description', listing.description);
    listingToBePosted.append('startDate', listing.startDate);
    listingToBePosted.append('startTime', listing.startTime);
    listingToBePosted.append('endTime', listing.endTime);
    listingToBePosted.append('thumbnail', JSON.stringify({
        type: `image/${ listing.products[0].image.uri.slice(-3) }`,
        file: listing.products[0].image.base64
    }));
    listingToBePosted.append('products', JSON.stringify(listing.products.map((prod) => {
        return {
            image      : {
                type : `image/${ prod.image.uri }`,
                file : prod.image.base64
            },
            name       : prod.name || "",
            description: prod.description || "",
            price      : prod.price !== "" ? parseFloat(prod.price) : 0,
            sold       : false
        };
    })));

    const response = await ApiHelper.post('api/listing', listingToBePosted)

    if (response) {
        const { listing } = response
        dispatch({ type : ADD_LISTING_SUCCESS, newListing : listing })
    } else {
        dispatch({ type : ADD_LISTING_FAIL })
    }
}