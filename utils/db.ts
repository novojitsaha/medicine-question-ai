import { Client, Databases } from "appwrite";

const appWriteClient = new Client();
appWriteClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID as string);
const databases = new Databases(appWriteClient);
export default databases;
