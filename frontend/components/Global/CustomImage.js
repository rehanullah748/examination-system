'use client'
import { Skeleton } from "@mui/material";
import { Img } from "react-image";


const CustomImage = ({url,fallback}) => {
    console.log(url)
return (
    <Img className='w-full h-full object-contain'
    src={[url, fallback]}
    loader={<Skeleton variant="circular" width={40} height={40} />}
  />

)
}
  export default CustomImage;