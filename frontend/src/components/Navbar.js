import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Button } from '@chakra-ui/button';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useUserInfo from '../hooks/useUserInfo';

/**
 * Navbar for Tunify
 * @param {{
 *  routes: Array<{ route: String, name: String, page: any }>
 * }} navbarRoutes
 * @param {{
 *  routes: Array<{ route: String, name: String, page: any }>
 * }} accountRoutes
 */
export default function Navbar({ navbarRoutes, accountRoutes }) {
  const [userInfo] = useUserInfo(false);

  return (
    <Box w="100%">
      <Flex w="auto" p={6} justifyContent="space-between">
        <Link to="/">
          <Heading as="h1" fontWeight="black">
            Tunify
          </Heading>
        </Link>
        <Box ml="auto" mr="auto" />
        {navbarRoutes.map(({ route, name }) => (
          <Link key={route} to={route} style={{ marginLeft: '3%' }}>
            <Text mt={2}>{name}</Text>
          </Link>
        ))}
        <Menu>
          <MenuButton
            ml={7}
            bgColor="pink.100"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {Boolean(userInfo) ? userInfo.first_name : 'Account'}
          </MenuButton>
          <MenuList>
            {accountRoutes.map(({ route, name }) => (
              <Link key={route} to={route}>
                <MenuItem key={route}>{name}</MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
