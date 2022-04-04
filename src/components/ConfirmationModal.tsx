import React from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';

type ConfirmationModalProps = {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
    onOk: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
    const cancelRef = React.useRef()
    const {title, content, onClose, onOk, isOpen}  = props;

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef as any}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {content}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef as any} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={onOk} ml={3} data-testid="confirm-ok">
                            OK
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default React.memo(ConfirmationModal);