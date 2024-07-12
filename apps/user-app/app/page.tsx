import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/toggle";

export default function Home() {
  return (
   <>
    <div className="flex justify-end items-end m-4">
    <ModeToggle />
    </div>

   <div className="flex justify-center items-center min-h-52">
     <span className="text-3xl">Signup 
     <Button variant="outline" size="icon" className="ml-3">
      <ChevronRight className="h-4 w-4" />
    </Button>
     </span>
   </div>
    
   </>
  );
}
