"use client";
import axios from "axios";
export const apiUrl = "https://backend.smilehouse11.com/api/";
export async function fetchData() {
  const key = localStorage.getItem("client_key");

  try {
    const response = await axios.get(`${apiUrl}home?clientKey=${key}`);

    // //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchBlogs() {
  try {
    const response = await axios.get(`${apiUrl}blogs`);
    // //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchOffersAll() {
  try {
    const response = await axios.get(`${apiUrl}offers`);
    // //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function FetchCategories() {
  try {
    const response = await axios.get(
      "https://backend.smilehouse11.com/api/categories"
    );
    // //console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function doctors() {
  try {
    const response = await axios.get("https://backend.smilehouse11.com/api/home");
    // //console.log(response.data.data.doctors);
    return response.data.data.doctors;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchBlogDetails(id) {
  try {
    const response = await axios.get(
      "https://backend.smilehouse11.com/api/blogs/" + id
    );
    // //console.log(response.data.data.doctors);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchServiceDetails(id) {
  const key = localStorage.getItem("client_key");

  try {
    const response = await axios.get(
      `https://backend.smilehouse11.com/api/services/${id}?clientKey=${key}`
    );
    // //console.log(response.data.data.doctors);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const response = await axios.get(`${apiUrl}categories`);
    // //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchMedicalDevices() {
  try {
    const response = await axios.get(`${apiUrl}medical-devices`);
    // //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function fetchMedicalDevice(id) {
  try {
    const response = await axios.get(`${apiUrl}medical-devices/${id}`);
    // //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
