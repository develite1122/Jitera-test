import React from 'react';
import {
    Divider,
    IconButton,
    SimpleGrid,
    Icon,
    useColorModeValue,
    AspectRatio,
    Image,
    Box,
    Flex,
} from '@chakra-ui/react';
import { User } from '../models';
import { apiAvatar } from '../config';
import { AiOutlinePhone, AiFillHeart, AiOutlineGlobal, AiOutlineMail, AiOutlineHeart, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import ConfirmationModal from './ConfirmationModal';
import EditUserModal from './EditUserModal';

type UserItemProps = {
    user: User;
    handleLike: () => void;
    handleEdit: (edited: User) => void;
    handleDelete: () => void;
}

const UserItem = (props: UserItemProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [editedUser, setEditedUser] = React.useState(props.user);

    return (
        <Box w="100%" borderColor={useColorModeValue('gray.300', 'gray.500')} borderWidth="1px">
            <AspectRatio w="100%" minW="100px" ratio={4 / 3} bgColor={useColorModeValue("gray.300", "gray.500")}>
                <Image objectFit="contain" src={apiAvatar(props.user.username)} className="userImage"></Image>
            </AspectRatio>
            <Flex alignItems="flex-start" flexDir="column" p={{ base: "20px", md: "15px" }} fontSize={{ base: "16px", md: "14px" }} color={useColorModeValue('gray.500', 'gray.300')}>
                <Box data-testid="user-name" color={useColorModeValue('gray.800', 'white')} fontWeight="bold" fontSize={{ base: "24px", md: "18px" }}>{props.user.name}</Box>
                <Flex data-testid="user-email" mt="5px" alignItems="center"><Icon as={AiOutlineMail} w={{ base: 9, md: 6 }} h={{ base: 9, md: 6 }} mr="5px" />{props.user.email}</Flex>
                <Flex data-testid="user-phone" mt="5px" alignItems="center"><Icon as={AiOutlinePhone} w={{ base: 9, md: 6 }} h={{ base: 9, md: 6 }} mr="5px" />{props.user.phone}</Flex>
                <Flex data-testid="user-website" mt="5px" alignItems="center"><Icon as={AiOutlineGlobal} w={{ base: 9, md: 6 }} h={{ base: 9, md: 6 }} mr="5px" />{props.user.website}</Flex>
            </Flex>
            <SimpleGrid
                columns={3} borderTopWidth={'1px'}
                bgColor={useColorModeValue('gray.200', 'gray.600')}
                borderTopColor={useColorModeValue('gray.300', 'gray.500')}>
                <Flex
                    p="5px"
                    h="100%"
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton
                        data-testid="button-user-like"
                        bgColor={'transparent'}
                        icon={<Icon as={props.user.like ? AiFillHeart : AiOutlineHeart} w={5} h={5} color={props.user.like ? "yellow.300" : "red.500"} />}
                        borderRadius="50%"
                        aria-label={props.user.like ? "Unlike User" : "Like user"}
                        onClick={() => props.handleLike()}
                    />
                </Flex>
                <Flex
                    h="100%"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Divider orientation={'vertical'}
                        color={useColorModeValue('gray.800', 'white')}
                    />
                    <Box
                        p="5px"
                        h="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton
                            data-testid="button-user-edit"
                            bgColor={'transparent'}
                            icon={<Icon as={AiOutlineEdit} w={5} h={5} />}
                            color={useColorModeValue('gray.500', 'gray.300')}
                            borderRadius="50%"
                            aria-label="Edit User"
                            onClick={() => {
                                setEditedUser(props.user);
                                setIsEditOpen(true);
                            }}
                        />
                    </Box>

                    <Divider
                        color={useColorModeValue('gray.500', 'gray.300')}
                        orientation={'vertical'} />
                </Flex>
                <Flex
                    p="5px"
                    h="100%"
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton
                        data-testid="button-user-delete"
                        color={useColorModeValue('gray.500', 'gray.300')}
                        bgColor={'transparent'}
                        icon={<Icon as={AiFillDelete} w={5} h={5} />}
                        borderRadius="50%"
                        aria-label="Delete User"
                        onClick={() => {
                            setIsDeleteModalOpen(true);
                        }}
                    />
                </Flex>

            </SimpleGrid>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title={'Delete User'}
                content={'Are you sure you want to delete this user?'}
                onOk={() => {
                    setIsDeleteModalOpen(false);
                    props.handleDelete();
                }}
            />
            <EditUserModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                editedUser={editedUser}
                onOk={(edited: User) => {
                    setEditedUser(edited);
                    setIsEditOpen(false);
                    props.handleEdit(edited)
                }}
            />
        </Box >
    )
}

export default React.memo(UserItem);