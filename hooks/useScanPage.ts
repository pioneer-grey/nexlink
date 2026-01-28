import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner"


export const useScanPage = () => {
    const { isPending, data, mutateAsync, isError } = useMutation({
        mutationKey: ["scan"],
        mutationFn: async (url: string) => {
            const res = await axios.post("/api/site",{url})
            return res.data
        },
        onError: (err: any) => {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error ?? err.message);
            } else {
                toast.error("Something went wrong");
            }
        }

    })
    return { isPending, data, isError, mutateAsync }
}
