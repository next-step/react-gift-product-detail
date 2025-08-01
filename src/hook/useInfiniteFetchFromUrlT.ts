import type { ApiResponse } from "@/type/GiftAPI/product";
import { useEffect, useState } from "react";

function useInfiniteFetchFromUrlT<T>( url: string, fetchFn : (url : string) => Promise<ApiResponse<T>>, defaultT: T) {
    const [item, setItem] = useState<T>(defaultT);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const newItem = await fetchFn(url);


                if (!isMounted) return;

                setItem(newItem.data);

            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
        return () => {
            isMounted =false;
        }
    }, [url])
    return { item, loading, error }
}

export default useInfiniteFetchFromUrlT