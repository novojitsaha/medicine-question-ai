import { ExcelContent } from '@/schemas/ExcelContent'
import readExcel from '@/components/ReadExcel'
import promptOpenAI from '@/components/PromptOpenAI'
import uploadToDb from '@/components/Database'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  
  console.log("FILE BUFFER CREATED")

  // read excel file and return array of json objects
  const content : ExcelContent[] = await readExcel(buffer);
  console.log("FILE READ AND PROCESSED")

  // prompt chatGPT
  const aiResponse = await promptOpenAI(content) ?? []
  console.log("PROMPTED OPENAI")

  

  
  console.log(aiResponse)
  //console.log("type of response: ",typeof(aiResponse))
 

  // Write the file buffer to tmp
  // const path = join('/', 'tmp', file.name)
  // await writeFile(path, buffer)

  // console.log(`file written at ${path}`)

  // store the json response to database
  uploadToDb(aiResponse)
  console.log("UPLOADED TO DB")

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
//   const path = `/tmp/${file.name}`
//   await writeFile(path, buffer)
//   console.log(`open ${path} to see the uploaded file`)

  return NextResponse.json({ success: true })
}