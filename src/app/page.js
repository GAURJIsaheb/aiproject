import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";



export default function Home() {

  return (
    
    <div className="flex justify-center items-center h-screen">
         
          <Button className="bg-blue-500 hover:bg-green-400 hover:scale-105 ">Subsribe</Button>
          <UserButton/>
    </div>

  );
}
