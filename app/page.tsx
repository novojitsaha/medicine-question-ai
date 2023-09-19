import ServerUploadComponent from "@/components/ServerUpload"
import UploadForm from "@/components/ClientUpload"



import {Button} from '@nextui-org/button'; 

export default function Home() {
  return (
    <main className="">
      <div>
        <Button>Click me</Button>
      </div>

      <h1>medicine question ai</h1>
      <UploadForm />
      
    </main>
  )
}
