import { useQuery,useMutation, useQueryClient  } from "@tanstack/react-query";
import axios from "axios"


export const useGetBrand=()=>{
    const {isLoading,data,refetch}=useQuery({
        queryKey:["getBrand"],
        queryFn:async()=>{
            const res=await axios.get("api/brand")
            return res.data
        },
        staleTime:Infinity
    })
    return {isLoading,data,refetch}
}

export const useDeleteBrand=()=>{
    const queryClient = useQueryClient();
    const {isPending,mutateAsync}=useMutation({
        mutationFn:async(id:string)=>{
            const res=await axios.delete("api/brand",{data:{id}})
            return res.data
        },
        onSuccess:()=>{
              queryClient.invalidateQueries({queryKey:["getBrand"]});
        }
    })
    return {isPending,mutateAsync}
}