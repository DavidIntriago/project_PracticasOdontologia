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

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Login = ({isOpen, onClose}: LoginProps) => {
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Iniciar Sesión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Correo</FormLabel>
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
