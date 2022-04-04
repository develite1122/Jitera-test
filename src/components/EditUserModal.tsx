import React from 'react';
import {
    FormHelperText,
    FormControl,
    Button,
    VStack,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';
import { User } from '../models';
import { AiOutlinePhone, AiOutlineGlobal, AiOutlineMail } from 'react-icons/ai';

type EditUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOk: (edited: User) => void;
    editedUser: User;
}

const EditUserModal = (props: EditUserModalProps) => {
    const { onClose, onOk, isOpen, editedUser } = props;
    const [changedUser, setChangedUser] = React.useState<any>();
    const [errors, setErrors] = React.useState<any>({});
    React.useEffect(() => {
        setChangedUser(editedUser);
    }, [editedUser])

    React.useEffect(() => {
        let emailError = validateEmail(changedUser?.email);
        setErrors({
            email: emailError,
            phone: changedUser?.phone === '' ? 'Phone number is required' : null,
            website: changedUser?.website === '' ? 'Website is required' : null,
        })
    }, [changedUser?.email, changedUser?.phone, changedUser?.website]);

    const validateEmail = (value: string) => {
        let error
        if (!value) {
            error = 'Email is required'
        }
        else if (!value.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            error = 'Invalid email address!'
        }
        return error
    }

    const handleOk = () => {
        if (errors.email || errors.phone || errors.website) return;
        onOk(changedUser as User);
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent pb={5} >
                <ModalHeader>Edit User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={5}>
                        <FormControl isInvalid={errors.email}>
                            <InputGroup>
                                <InputLeftAddon children={<Icon as={AiOutlineMail} w={{ base: 9, md: 6 }} h={{ base: 9, md: 6 }} />} />
                                <Input
                                    type='email'
                                    placeholder='email address'
                                    data-testid="email-input"
                                    value={changedUser?.email}
                                    onChange={(e) => setChangedUser({ ...changedUser, email: e.target.value } as User)}
                                />
                            </InputGroup>
                            <FormHelperText color="red.500">{errors.email}</FormHelperText>
                        </FormControl>
                        <FormControl isInvalid={errors.phone}>
                            <InputGroup>
                                <InputLeftAddon children={<Icon as={AiOutlinePhone} w={{ base: 9, md: 6 }} h={{ base: 9, md: 6 }} />} />
                                <Input
                                    type='text'
                                    placeholder='phone number'
                                    data-testid="phone-input"
                                    value={changedUser?.phone}
                                    onChange={(e) => setChangedUser({ ...changedUser, phone: e.target.value } as User)}
                                />
                            </InputGroup>
                            <FormHelperText color="red.500">{errors.phone}</FormHelperText>
                        </FormControl>
                        <FormControl isInvalid={errors.website}>
                            <InputGroup>
                                <InputLeftAddon children={<Icon as={AiOutlineGlobal} w={{ base: 9, md: 6 }} h={{ base: 9, md: 6 }} />} />
                                <Input
                                    type='text'
                                    placeholder='website'
                                    data-testid="website-input"
                                    value={changedUser?.website}
                                    onChange={(e) => setChangedUser({ ...changedUser, website: e.target.value } as User)}
                                />
                            </InputGroup>
                            <FormHelperText color="red.500">{errors.website}</FormHelperText>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={() => handleOk()} ml={3} data-testid="confirm-edit">
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default React.memo(EditUserModal);