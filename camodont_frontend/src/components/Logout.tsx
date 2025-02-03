import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
  } from "@chakra-ui/react";
  import { borrarSesion } from "../hooks/SessionUtil";
  import { useState, useEffect } from "react";
  
  const Logout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true); // Asegura que esto solo se ejecute en el cliente
    }, []);
  
    const handleLogout = () => {
      borrarSesion();  // Aquí se llama cuando el usuario confirma el logout
      onClose();       // Cierra el modal después del logout
    };
  
    if (!isClient) {
      return null; // No renderizamos nada hasta que estemos seguros de estar en el cliente
    }
  
    return (
      <>
        <Button
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"teal.400"}
          onClick={onOpen} // Abre el modal
          _hover={{ bg: "teal.500" }}
        >
          Cerrar Sesión
        </Button>
  
        {/* Modal de Logout */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cerrar Sesión</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              ¿Estás seguro que deseas cerrar sesión?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleLogout}>
                Cerrar Sesión
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Logout;
  