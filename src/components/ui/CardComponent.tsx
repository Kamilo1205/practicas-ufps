import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"


interface Props{
  title: string,
  description: string
  cardContent: any
  cardFooter: any
}

export const CardComponent = ({title,description,cardContent,cardFooter}:Props) => { 
  return (
    <Card className="rounded-none mt-5 w-full">
      <CardHeader>
        <CardTitle>{ title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
       {cardContent}
      </CardContent>
      <CardFooter>
        {cardFooter}
      </CardFooter>
    </Card>
  )
}