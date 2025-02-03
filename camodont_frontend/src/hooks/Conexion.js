import { NextResponse } from "next/server";
import { headers } from "../../next.config";

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
  const res = await response.json();
  console.log(res);
  return res;

    } catch (error) {
        console.log(error);
    }
}