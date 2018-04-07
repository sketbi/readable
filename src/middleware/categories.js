
import {api,headers} from './api'
import {receivedCategories,hasErrored,isLoading} from '../actions'

export function GetAllGategories() {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/categories`, { headers })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(receivedCategories(data.categories)))
            .catch(() => dispatch(hasErrored(true)));
    };
}



