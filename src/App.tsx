import {
  Box, ChakraProvider, Grid, Spinner, theme
} from "@chakra-ui/react"
import * as React from "react"
import './App.css'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import UserList from './components/UserList'
import { API_USER_LIST } from "./config"
import { User } from './models'

export const App = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getData = (): Promise<any> => {
    return fetch(API_USER_LIST);
  }
  
  React.useEffect(() => {
    const initialize = async () => {
      const data = await getData();
      const value = await data.json();
      setUsers(value.map((item: any) => ({ ...item, like: false })));
      setIsLoading(false);
    }
    setIsLoading(true);
    initialize();
  }, []);

  const handleLike = (index: number) => {
    let temp = [...users];
    temp[index].like = !temp[index].like;
    setUsers(temp);
  }

  const handleEdit = (index: number, editedUser: User) => {
    let temp = [...users];
    temp[index] = { ...editedUser };
    setUsers(temp);
  }

  const handleDelete = (index: number) => {
    let temp = [...users];
    temp.splice(index, 1);
    setUsers(temp);
  }

  return <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" data-testid="chakra-box">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Box mt="10px">
          {
            isLoading ? <Spinner size="xl" /> :
              <UserList users={users} handleLike={handleLike} handleEdit={handleEdit} handleDelete={handleDelete} />
          }
        </Box>
      </Grid>
    </Box>
  </ChakraProvider>
};