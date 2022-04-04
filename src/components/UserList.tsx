import React from 'react';
import {
    SimpleGrid,
} from '@chakra-ui/react';
import UserItem from './UserItem';
import { User } from '../models';

type UserListProps = {
    users: User[];
    handleLike: (index: number) => void;
    handleEdit: (index: number, editedUser: User) => void;
    handleDelete: (index: number) => void;
}

const UserList = (props: UserListProps) => {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} p="0" data-testid="user-list">
            {
                props.users.map((user, index) => <UserItem
                    key={`user_${index}`}
                    user={user}
                    handleLike={() => props.handleLike(index)}
                    handleEdit={(edited:User) => props.handleEdit(index, edited)}
                    handleDelete={() => props.handleDelete(index)}
                />)
            }
        </SimpleGrid>
    )
}

export default React.memo(UserList);