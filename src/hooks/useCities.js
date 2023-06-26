import { useQuery } from "@tanstack/react-query";
import cityService from "../api/city.service";

export const useCities = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cities'],
        queryFn: cityService.getCities
    });

    return {
        cities: data,
        isLoading,
        isError
    }
}