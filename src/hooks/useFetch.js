import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
/**
 * useFetch: axios를 사용해 간단하게 데이터 로드 로직을 재사용할 수 있는 훅
 * @param config - AxiosRequestConfig 또는 string URL
 * @param deps - 의존성 배열 (URL이나 파라미터 변경 시 재호출)
 */
export function useFetch(config, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = typeof config === 'string'
                ? await axios.get(config)
                : await axios.request(config);
            setData(response.data);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }, [config]);
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);
    return { data, loading, error };
}
