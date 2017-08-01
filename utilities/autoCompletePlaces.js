/**
 * Created by nikoarellano on 2017-07-30.
 */
import GoogleApiKey from '../constants/GoogleApiKey'
import { Constants, Location, Permissions } from 'expo';


export default async function fetchPlaces(query, location) {
    const uri = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=xQueryx&types=geocode&location=xlatitudex,xlongitudex&language=en&key=xGoogleApiKeyx";

    try {

        let response = await fetch(uri.replace("xQueryx", query.replace(" ", "+"))
                                      .replace("xGoogleApiKeyx", GoogleApiKey.key)
                                      .replace("xlatitudex", location.coords.latitude)
                                      .replace("xlongitudex", location.coords.longitude));

        let responseJson = await response.json();

        return responseJson;

    } catch (error) {
        console.log(error)
    }
}
