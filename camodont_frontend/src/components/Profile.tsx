import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useToast } from '@chakra-ui/react';
import { get_api, patch_api } from '../hooks/Conexion'; 
import { get } from '../hooks/SessionUtil';

const CompleteProfile = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const toast = useToast();
  
    const onComplete = () => {
      console.log('El perfil se ha completado');
      // Aquí puedes agregar cualquier acción que quieras ejecutar después de la actualización del perfil
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!nombre || !apellido || !telefono) {
        toast({
          title: 'Error',
          description: 'Por favor, llena todos los campos.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      try {
        const data = {
          nombre,
          apellido,
          telefono,
        };
        const external_id = get('external_id');
  
        const response = await patch_api(`users/${external_id}`, data);
        console.log(response);
  
        if (response.success) {
          toast({
            title: 'Perfil actualizado',
            description: 'Tu información ha sido guardada correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onComplete();  // Ahora 'onComplete' está definida
        } else {
          toast({
            title: 'Error',
            description: 'No se pudo actualizar tu información.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Error',
          description: 'Ocurrió un error al actualizar el perfil.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Box p={6} bg="white" boxShadow="md" borderRadius="lg">
        <Heading size="md" mb={4} textAlign="center" color="teal.700">
          Completar Perfil
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombres</FormLabel>
              <Input
                placeholder="Ingresa tus nombres"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel>Apellidos</FormLabel>
              <Input
                placeholder="Ingresa tus apellidos"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel>Teléfono</FormLabel>
              <Input
                type="tel"
                placeholder="Ingresa tu número de teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FormControl>
  
            <Button colorScheme="teal" type="submit">
              Guardar
            </Button>
          </VStack>
        </form>
      </Box>
    );
  };
  

export default CompleteProfile;
