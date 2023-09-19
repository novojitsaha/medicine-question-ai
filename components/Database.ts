import { AiResponse } from "@/schemas/AiResponse";
// import databases from "@/utils/db";
import {  ID } from "appwrite";

export default async function uploadToDb(json: AiResponse[]) {
  console.log("DB CONNECTION SUCCESSFULLLL!!");

  const promises = json.map((j) =>
    databases.createDocument(
      process.env.APPWRITE_DB_ID as string,
      process.env.APPWRITE_COLLECTION_ID as string,
      ID.unique(),
      j
    )
  );

  Promise.all(promises).then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}
