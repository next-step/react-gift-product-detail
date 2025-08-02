import { getFromUrl } from "@/utils/getFromUrl";
import { useSuspenseQuery } from "@tanstack/react-query";
import { themeUrl } from '@/constant/api';


function useGiftThemeListData(){
      const { data } = useSuspenseQuery<[]>({
        queryKey: ['themeLogoData'],
        queryFn: () => getFromUrl(themeUrl),
      });

    return ({
        data
    })
}

export default useGiftThemeListData
