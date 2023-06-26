import {useMutation, useQueryClient} from "@tanstack/react-query";
import registrationService from "../api/registration.service";

export const useRejectMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            return registrationService.reject(id);
        },
        onMutate: async () => {
            await queryClient.cancelQueries('registrations');
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries('registrations');
        }
    })
}