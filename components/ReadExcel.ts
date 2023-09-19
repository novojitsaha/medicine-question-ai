import { ExcelContent } from "@/schemas/ExcelContent";
import Excel from "exceljs";

export default async function readExcel(buffer : Buffer){
    const content: ExcelContent[] = [];

    // read file using exceljs
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(buffer);
  
        // process workbook
        const worksheet = workbook.getWorksheet(1);
  
        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
          if (rowNumber === 1) return;
          const question = row.getCell("A").value as string;
          const rawOptions = row.getCell("B").value as string;
          const options: string[] = rawOptions.split(",");
          const obj: ExcelContent = {
            question,
            options,
            correctOption: null,
          };
          content.push(obj);
        });
  
        //   console.log(content)
      } catch (e) {
        console.error(`Error reading file`, e);
      }
      return content
}