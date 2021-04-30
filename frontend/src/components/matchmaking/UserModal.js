import { Button } from '@chakra-ui/button';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import { Fade } from '@chakra-ui/transition';
import React, { useState, useEffect } from 'react';
import Client from '../../api/Client';
import sendErrorToast from '../../hooks/sendErrorToast';

export default function UserModal({
  user,
  currentUserId,
  isOpen,
  onClose,
  name,
}) {
  const [sharedArtists, setSharedArtists] = useState([]);
  const [sharedGenres, setSharedGenres] = useState([]);
  const [sharedSongs, setSharedSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch shared interests using stored procedure route
    Client.get(`/matchmaking/shared/all/${currentUserId}/${user.user_id}`)
      .then((res) => {
        // Response data format: [ songs[], artists[], genres[], mysql ]
        const { data } = res;
        console.log(data);
        setSharedSongs(data[0]);
        setSharedArtists(data[1]);
        setSharedGenres(data[2]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        sendErrorToast();
      });
  }, [currentUserId, user]);

  const NameCard = ({ text }) => (
    <Fade in key={text}>
      <Box bgColor="gray.100" p={3} rounded={30} boxShadow="lg">
        <Text fontWeight="black">{text}</Text>
      </Box>
    </Fade>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="60%">
        <ModalHeader fontWeight="hairline">
          Comparing with <strong>{name}</strong>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading && <Spinner />}
          {!isLoading && (
            <Box>
              <Heading as="h4" size="md" my={5}>
                You and {name} both listen to these artists:
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3, xl: 5 }} spacing={2}>
                {sharedArtists.map(({ artisto }) => (
                  <NameCard text={artisto} />
                ))}
              </SimpleGrid>

              <Heading as="h4" size="md" my={5}>
                ... and these genres:
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3, xl: 5 }} spacing={2}>
                {sharedGenres.map(({ genreo }) => (
                  <NameCard text={genreo} />
                ))}
              </SimpleGrid>

              <Heading as="h4" size="md" my={5}>
                ... and these songs:
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3, xl: 5 }} spacing={2}>
                {sharedSongs.map(({ songo }) => (
                  <NameCard text={songo} />
                ))}
              </SimpleGrid>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
