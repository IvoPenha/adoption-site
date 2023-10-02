import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';


interface Props {
  isOpen: boolean;
  OnClose: () => void
  children: React.ReactNode
  Title: string
}

const CustomModal = ({
  isOpen,
  OnClose,
  children,
  Title
} : Props) => {
  return (
    <Modal onClose={OnClose} size={'6xl'} isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent overflowY={'scroll'} maxHeight={'85%'}>
      { Title && <ModalHeader>{Title}</ModalHeader>}
      <ModalCloseButton zIndex={3000} />
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <Button onClick={OnClose}>Fechar</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default CustomModal