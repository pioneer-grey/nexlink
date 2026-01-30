import { useQuery } from "@tanstack/react-query";
import axios from "axios"


export const useGetBrands=()=>{
    const {isLoading,data,refetch}=useQuery({
        queryKey:["brands"],
        queryFn:async()=>{
            const res=await axios.get("api/site")
            return res.data
        },
        staleTime:Infinity
    })
    return {isLoading,data,refetch}
}