import { useState, useEffect, useRef } from "react";

export default function useFetch(url) {
    const cache = useRef({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        let cancelRequest = false;
        if (!url) return undefined;

        const fetchData = async () => {
            if (cache.current[url]) {
                const newData = cache.current[url];
                setData(newData);
                setLoading(false);
            } else {
                try {
                    const response = await fetch(url);
                    const newData = await response.json();
                    cache.current[url] = data;
                    setData(newData);
                    setLoading(false);
                } catch (fetchError) {
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
