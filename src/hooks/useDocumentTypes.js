import { useQuery } from "@tanstack/react-query";
import documentService from "../api/document.service";

export const useDocumentTypes = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['document', 'types'],
        queryFn: documentService.getDocumentTypes
    });

    return {
        types: data,
        isLoading,
        isError
    }
}