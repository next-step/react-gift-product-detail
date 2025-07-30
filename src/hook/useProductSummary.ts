import { baseUrl } from "@/constant/api";
import type { ProductItemSummary } from "@/type/GiftAPI/product";
import { getFromUrl } from "@/utils/getFromUrl";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useProductSummary() {
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const idParam = query.get('id');
    const id = idParam !== null ? Number(idParam) : null;

    const productUrl = `${baseUrl}/api/products/${id}/summary`;
    const { data, error } = useQuery<ProductItemSummary>({
        queryKey: ['productData'],
        queryFn: () => getFromUrl(productUrl)
    })


    useEffect(() => {
        if (error) {
            toast.error((error as Error).message);
            navigate('/');
        }
    }, [error, navigate]);

    const price = data?.price;
    const imageUrl = data?.imageURL;
    const name = data?.name;
    const brandName = data?.brandName;

    return {
        id, price, imageUrl, name, brandName
    }
}

export default useProductSummary;