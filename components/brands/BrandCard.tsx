import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'

type Props = {
  id: string
  name: string,
  imgUrl: string,
  url: string,
}
import { Trash } from 'lucide-react'
export const BrandCard = ({ id, name, url, imgUrl }: Props) => {
  return (
    <Card className='min-w-xs pt-0'>
      <CardContent className='px-0'>
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-48 object-cover object-top"
        />
      </CardContent>
      <CardHeader>
          <CardTitle>{name}</CardTitle>  
        <CardDescription>
          <a className='underline underline-offset-2' 
          href={url} target='_blank'>{url}</a>
          </CardDescription>
      {/* <div className='flex justify-end'>
        <Button variant={"destructive"} size={"icon-sm"}><Trash/></Button>
      </div> */}
      </CardHeader>
      <CardFooter className='p-2 flex justify-between'>
        <Button variant={"ghost"}><Trash/></Button>
        {/* <Button variant={"secondary"} >Edit </Button> */}
      </CardFooter>
    </Card>
  )
}

