import { createStandaloneToast } from "@chakra-ui/react"
const toast = createStandaloneToast()

export default function sendErrorToast() {
  toast({
    title: 'Error',
    description: 'An error occurred. Please refresh the page.',
    status: 'error',
    isClosable: true
  });
}