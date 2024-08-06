"use client";
import axios from "axios";
export const apiUrl = "https://smile-house.promotion22.com/api/";
export async function fetchData() {
  
const key = localStorage.getItem("client_key");

  try {
    const response = await axios.get(`${apiUrl}home?clientKey=${key}`);

    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchBlogs() {
  try {
    const response = await axios.get(`${apiUrl}blogs`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function FetchCategories() {
  try {
    const response = await axios.get(
      "https://smile-house.promotion22.com/api/categories"
    );
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function doctors() {
  try {
    const response = await axios.get(
      "https://smile-house.promotion22.com/api/home"
    );
    // console.log(response.data.data.doctors);
    return response.data.data.doctors;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchBlogDetails(id) {
  try {
    const response = await axios.get(
      "https://smile-house.promotion22.com/api/blogs/" + id
    );
    // console.log(response.data.data.doctors);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchServiceDetails(id) {
  try {
    const response = await axios.get(
      "https://smile-house.promotion22.com/api/services/" + id
    );
    // console.log(response.data.data.doctors);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const response = await axios.get(`${apiUrl}categories`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
