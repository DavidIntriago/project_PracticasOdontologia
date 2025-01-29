

let URL="http://localhost:3000";

export function url_api(){
    return URL;
}   

export async function get(resource){
    const response = await fetch(`${URL}/${resource}`);
    return await response.json();
}

