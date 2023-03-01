import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/react';

export default function Users({ users }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [username, setUsername] = useState('');

  const handleFilter = () => {
    if (username !== '') {
      const filteredUsers = users.filter((user) =>
        user.username.includes(username)
      );
      setFilteredUsers(filteredUsers);
    }
  };

  return (
    <Box maxW="90%" mx="auto" mt="10" bg="#865DFF" p="8" borderRadius="25px">
      <Heading mb="6" color="#333" textAlign="center">Users</Heading>
      <Stack spacing="10" direction="row">
        <FormControl id="username">
          <Input
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleFilter}>
          Search
        </Button>
      </Stack>
      <Flex mt="8" flexWrap="wrap">
        {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
          <Box key={user.uuid} w="25%" p="4">
            <Box bg="#FCFFE7" p="4" borderRadius="15px" boxShadow="lg">
              <Heading as="h3" size="md" color="#333">
                {user.username}
              </Heading>
              <Box color="#666" fontSize="sm" mt="2">
                {user.firstname} {user.lastname}
              </Box>
              <Box color="#666" fontSize="80%" mt="2">
               {user.email}
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export async function getServerSideProps() {
  const response = await axios.get('https://fakerapi.it/api/v1/users', {
    params: {
      _quantity: 50,
    },
  });
  const users = response.data.data;
  return {
    props: {
      users,
    },
  };
}
