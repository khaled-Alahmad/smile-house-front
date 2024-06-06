"use client";
import axios from "axios";
export const apiUrl = "https://smile-house.promotion22.com/api/";
export async function fetchData(){
  try { 
    const response = await axios.get(`${apiUrl}home`);
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
