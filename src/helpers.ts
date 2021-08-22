import { useLocation } from 'react-router-dom';

export const useLocationQuery = (keys: string[]) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    return keys.map((key) => queryParams.get(key) || undefined);
}
