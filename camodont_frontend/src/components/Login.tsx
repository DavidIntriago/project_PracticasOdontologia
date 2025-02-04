import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import {post_api} from "../hooks/Conexion";
import { save } from "../hooks/SessionUtil";
import { useRouter } from "next/navigation";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para controlar el modal
  const [correo, setcorreo] = useState("");
  const [clave, setclave] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    post_api("auth", { correo, clave }).then((response) => {
      console.log(clave);
      console.log(response);
      if (!response) {
        alert(response);
        return;
      }else{
        if(response.error){
          alert(response.error);
          console.log(response.error);  

          return;
      }
      else
      {
        alert("Bienvenid@ "+response.nombre);

        save("rol", response.idRol);
        save("external_id", response.external_id);
        router.push("/indexUsers"); 

        return;
      }
    }});
    onClose(); // Cierra el modal después del login
  };


  

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
        Iniciar Sesión
      </Button>

      {/* Modal de Login */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Iniciar Sesión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>correo</FormLabel>
              <Input type="correo" value={correo} onChange={(e) => setcorreo(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" value={clave} onChange={(e) => setclave(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleLogin}>
              Iniciar Sesión
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


export default Login;
