/**
 * Created by nikoarellano on 2017-08-14.
 */
import GoogleApiKey from '../constants/GoogleApiKey'

export default async function geocodeLocation(location) {
    const uri = "https://maps.googleapis.com/maps/api/geocode/json?address=xAddressx&key=xGoogleApiKeyx&language=en";

    try {

        let response = await fetch(uri.replace("xAddressx",      location.replace(/ /g, "+"))
                                      .replace("xGoogleApiKeyx", GoogleApiKey.geocodeKey));

        let responseJson = await response.json();

        return responseJson;

    } catch (error) {
        console.log(error);

        return null;
    }

}