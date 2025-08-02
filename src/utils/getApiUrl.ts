import { baseUrl } from "@/constant/api"

export const getThemesInfoUrl = (themeId : string | undefined) => {
    return `${baseUrl}/api/themes/${themeId}/info`
}

export const getproductsbyCursorUrl  =  (themeId : string | undefined, cursor : number) =>{
     return (`${baseUrl}/api/themes/${themeId}/products?cursor=${cursor}`)
}

const  getGetproductUrl = (option : string = '') =>{
    return ((productId : string | undefined) =>{ return `${baseUrl}/api/products/${productId}/${option}`;
})
}

export const getProductsUrl = getGetproductUrl('');
export const getproductSummaryUrl = getGetproductUrl('summary');
export const getProductsDetailUrl = getGetproductUrl('detail');
export const getproductsHighlightReviewUrl = getGetproductUrl('highlight-review');
export const getProductsWishUrl = getGetproductUrl('wish');