import React, { useState, useRef, useEffect } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Footer from '../../components/Footer';
import Client from '../../api/Client';
import { useHistory } from 'react-router';

export default function SignUp() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const signUpFormRef = useRef(null);

  useEffect(() => {
    // If the user is already logged in
    if (localStorage.getItem('userInfo') !== null) {
      // Redirect them to the profile page
      history.push('/profile');
    }
  }, [history])

  /**
   * Submits sign up info to API
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function submitSignUpInfo(e) {
    e.preventDefault();
    setLoading(true);
    setShowError(false);

    const signupInfo = {
      first_name: e.target[0].value,
      last_name: e.target[1].value,
      email: e.target[2].value,
    };

    console.log(signupInfo);

    // TODO: Rest of the sign up flow
    // Send POST request to create user in database
    Client.post('users', signupInfo)
      .then((response) => {
        // If successful, log in the user and redirect to profile page
        setLoading(false);
        console.log(response);
        signUpFormRef.current.reset();

        // Login user using localStorage
        localStorage.setItem('userInfo', JSON.stringify(signupInfo));
        // Redirect to profile page
        history.push('/profile');
      })
      .catch((error) => {
        // If unsuccessful, show error
        setLoading(false);
        console.error(error);
        setShowError(true);
      });
  }

  return (
    <Box>
      <form ref={signUpFormRef} onSubmit={submitSignUpInfo}>
        <Center w="100%" bgGradient="linear(to-l, #7928CA, #FF0080)">
          <VStack
            bgColor="white"
            px="10%"
            py="5%"
            m="5%"
            borderRadius={30}
            boxShadow="xl"
            spacing={5}
          >
            <Heading as="h4" fontWeight="light">
              Sign up for <strong>Tunify</strong>
            </Heading>

            <Divider />

            {showError && (
              <Alert status="error" rounded="lg">
                <AlertIcon />
                <AlertTitle mr={2}>Error while signing up!</AlertTitle>
                <AlertDescription>
                  Please refresh and try again.
                </AlertDescription>
              </Alert>
            )}

            <Box>
              <Flex w="100%">
                <Text>First name</Text>
              </Flex>
              <Input isRequired placeholder="Type first name here" mt={2} />
            </Box>

            <Box>
              <Flex w="100%">
                <Text>Last name</Text>
              </Flex>
              <Input isRequired placeholder="Type last name here" mt={2} />
            </Box>

            <Box>
              <Flex w="100%">
                <Text>Email</Text>
              </Flex>
              <Input
                isRequired
                placeholder="Type email here"
                type="email"
                mt={2}
              />
            </Box>

            <Button bgColor="pink.200" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign up'}
            </Button>
          </VStack>
        </Center>
      </form>

      <Footer />
    </Box>
  );
}
