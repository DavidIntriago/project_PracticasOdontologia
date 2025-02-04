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
import { get_api, post_api } from "../hooks/Conexion";
import { get } from "../hooks/SessionUtil";

const ServiceDetails = ({ service, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lugar, setLugar] = useState("");
  console.log(service);
  const handleSubmit = async () => {
    const user= await get("id");
    
    const data = {
      fecha: "2025-02-03T12:30:00Z",
      hora: "2025-02-03T12:30:00Z",
      lugar: lugar,
      estado: "PENDIENTE",
      idServicio: service.id,
      idUsuario: parseInt(user),
    };
    post_api("cita", data).then((response) => {
      console.log(response);
      if (response) {
        alert("Cita solicitada con éxito");
        onClose();
      }
    });

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
        <VStack spacing={4}>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)}/>
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
