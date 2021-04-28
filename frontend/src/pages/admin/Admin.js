import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Artists from './Artists';
import Songs from './Songs';
import Users from './Users';
import Genres from './Genres';
import Queries from './Queries';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function Admin() {
  const TABLE_ROUTES = [
    { route: '/artists', name: 'Artists', page: <Artists /> },
    { route: '/songs', name: 'Songs', page: <Songs /> },
    { route: '/users', name: 'Users', page: <Users /> },
    { route: '/genres', name: 'Genres', page: <Genres /> },
    { route: '/queries', name: 'Queries', page: <Queries /> },
  ];
  const [currentTable, setCurrentTable] = useState(TABLE_ROUTES[0]);

  return (
    <Box>
      <Center>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Select table
          </MenuButton>
          <MenuList>
            {TABLE_ROUTES.map(({ route, name, page }, i) => (
              <MenuItem
                key={route}
                onClick={() => setCurrentTable(TABLE_ROUTES[i])}
              >
                {name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Center>

      {currentTable.page}
    </Box>
  );
}
