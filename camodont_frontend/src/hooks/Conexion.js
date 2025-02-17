
let URL = "http://localhost:4000/api";

export function url_api() {
  return URL;
}

export async function post_api(url, data) {
    try {
    const response = await fetch(`${URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
  const res = await response.json();
  console.log(res);
  return res;

    } catch (error) {
        console.log(error);
    }
}

export async function get_api(url) {
  try {
    const response = await fetch(`${URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function get_api_id(url, id) {
  try {
    const response = await fetch(`${URL}/${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}