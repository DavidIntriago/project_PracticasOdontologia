import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

const ServiceDetails = ({ service, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    console.log(`Cita solicitada para: ${service.title} el ${date} a las ${time}`);
    alert(`Cita solicitada para: ${service.title} el ${date} a las ${time}`);
    onClose(); // Cierra el componente después de solicitar la cita
  };

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      bg="rgba(0, 0, 0, 0.7)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="20"
    >
      <Box bg="white" p={6} borderRadius="lg" maxW="400px" textAlign="center">
        <HStack justify="space-between">
          <Heading size="md">{service.title}</Heading>
          <IconButton icon={<FaArrowLeft />} onClick={onClose} />
        </HStack>
        <Text my={4}>Duracion estimada: {service.duracion} horas</Text>

        {/* Selección de fecha y hora */}
        <VStack spacing={3}>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </VStack>

        {/* Botones de acción */}
        <HStack mt={4}>
          <Button colorScheme="green" onClick={handleSubmit} isDisabled={!date || !time}>
            Solicitar Cita
          </Button>
          <Button colorScheme="red" onClick={onClose}>Cancelar</Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ServiceDetails;
