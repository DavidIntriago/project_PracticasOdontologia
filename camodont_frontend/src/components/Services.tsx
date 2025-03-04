import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardBody, Divider, Heading, SimpleGrid, Stack, Text, Center } from '@chakra-ui/react';
import { save } from "../hooks/SessionUtil";
import { get_api } from '../hooks/Conexion';
import RequestAppointmentModal from './RegisterCita';



const Services = () => {
  const [services, setservices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchservices = async () => {
      try {
        const apiservices = await get_api("campaign/status");
        console.log(apiservices);
        console.log(apiservices[0].Servicio);
        setservices(apiservices[0].Servicio);
      } catch (error) {
        console.error("Error al obtener las campañas:", error);
      }
    };
    fetchservices();
  }, []);

  return (
    <Box p={6}>
      <Heading size="lg" mb={6} color="teal.700" textAlign="center">
        Servicios Disponibles
      </Heading>

      {services.length > 0 ? (
        <Center>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} maxW="1000px">
            {services.map((service, index) => (
              <Card key={index} bg="white" boxShadow="lg" borderRadius="xl" p={4} _hover={{ transform: "scale(1.03)", transition: "0.3s" }}>
                <CardBody>
                  <Heading size="md" color="teal.800" mb={2} textAlign="center">
                    {service.nombre}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {service.descripcion}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Duracion Estimada:</strong> {service.duracion} minutos
                  </Text>
                 

                  

                  <Divider my={3} />

                  <Center>
                    <Button size="sm" colorScheme="teal" variant="solid" onClick={() => { save("service", service.external_id); setIsModalOpen(true); }}>
                      Solicitar Consulta
                    </Button>
                  </Center>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Center>
      ) : (
        <Text color="gray.500" fontSize="md" textAlign="center">No hay campañas disponibles.</Text>
      )}

      <RequestAppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};

export default Services;
