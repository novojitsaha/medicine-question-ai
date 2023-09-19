import { write } from "fs";
import { writeFile } from "fs/promises";
import Excel from "exceljs";
import { join } from "path";
import OpenAI from "openai";
import { Client, Databases } from 'appwrite';
import { ExcelContent } from "@/schemas/ExcelContent";
import readExcel from "./ReadExcel";
import promptOpenAI from "./PromptOpenAI";
import uploadToDb from "./Database";



/**
 * File upload server component.
 */
export default function ServerUploadComponent() {
  // upload function that handles upload and processing
  async function upload(data: FormData) {
    "use server";

    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      throw new Error("No file uploaded");
    }

    // create file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("FILE BUFFER CREATED")

    // read excel file and return array of json objects
    const content : ExcelContent[] = await readExcel(buffer);
    console.log("FILE READ AND PROCESSED")

    // prompt chatGPT
    const aiResponse = await promptOpenAI(content)
    console.log("PROMPTED OPENAI")

    

    
    console.log(aiResponse)
    //console.log("type of response: ",typeof(aiResponse))
   

    // Write the file buffer to tmp
    // const path = join('/', 'tmp', file.name)
    // await writeFile(path, buffer)

    // console.log(`file written at ${path}`)

    // store the json response to database
    uploadToDb(aiResponse)
        


    return { success: true };
  }

  return (
    <>
      <h1>Upload excel file</h1>
      <form action={upload}>
        <input type="file" name="file" />
        <input type="submit" value="Submit the Excel Workbook" />
      </form>
    </>
  );
}
