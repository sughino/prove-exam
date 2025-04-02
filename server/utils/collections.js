import conn from "../services/connection.js";

export const studentsColl = conn.collection("Students");
export const coursesColl = conn.collection("Courses");
export const examsColl = conn.collection("Exams");