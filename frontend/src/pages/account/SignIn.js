import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Center, Divider, Flex, Heading, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Client from '../../api/Client';

export default function SignIn() {
  const history = useHistory();
  const signInFormRef = useRef(null);
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // If the user is already logged in
    if (localStorage.getItem('userInfo') !== null) {
      // Redirect them to the profile page
      history.push('/profile');
    }
  }, [history]);

  /**
   * Signs in user if user exists in database
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  async function submitSignInInfo(e) {
    e.preventDefault();
    setLoading(true);

    const email = e.target[0].value;

    // Check if email already exists
    let emailsResponse = await Client.get(
      `users/1?emailQuery=${email}`
    );

    if (emailsResponse.data.length === 0) {
      toast({
        title: 'Error',
        description: 'No account with that email exists',
        status: 'error',
      });
      setLoading(false);
      return;
    }

    // Get remaining user information and login
    const userInfo = emailsResponse.data[0];
    console.log(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setLoading(false);
    signInFormRef.current.reset();
    history.push('/profile');
  }

  return (
    <Box>
    <form ref={signInFormRef} onSubmit={submitSignInInfo}>
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
            Sign in to <strong>Tunify</strong>
          </Heading>

          <Divider />
          
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
            {isLoading ? 'Loading...' : 'Sign in'}
          </Button>

          <Text fontWeight="light">
            Don't have a Tunify account yet?{' '}
            <Link to="/sign-up">
              <strong>Sign up here.</strong>
            </Link>
          </Text>
        </VStack>
      </Center>
    </form>

    <Footer />
  </Box>
  )
}