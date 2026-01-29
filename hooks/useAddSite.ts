import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { toast } from "sonner"
import { SiteSnapshot } from "@/store/types";

export const useAddSite =() => {
    const {isPending,mutateAsync} = useMutation({
        mutationFn: async (data:SiteSnapshot) => {
            const res = await axios.post("/api/site", data )
            return res.data
        },
        onError:(err)=>{
            if(axios.isAxiosError(err)){
             toast.error(err.response?.data?.error ?? err.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    })
    return {isPending,mutateAsync}
}