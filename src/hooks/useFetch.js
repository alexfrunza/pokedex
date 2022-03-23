import { useState, useEffect, useRef } from "react";

export default function useFetch(url) {
    const cache = useRef({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        let cancelRequest = false;
        if (!url) return;

        const fetchData = async () => {
            if (cache.current[url]) {
                const data = cache.current[url];
                setData(data);
                setLoading(false);
            } else {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    cache.current[url] = data;
                    setData(data);
                    setLoading(false);
                } catch (error) {
                    if (cancelRequest) return;
                    setError({ description: "Oops, there was an error!" });
                    setLoading(false);
                }
            }
        };

        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
    }, [url]);

    return { data, loading, error };
}
