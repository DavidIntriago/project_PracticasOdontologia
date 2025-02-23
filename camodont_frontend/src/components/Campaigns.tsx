import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardBody, Divider, Heading, SimpleGrid, Stack, Text, Center } from '@chakra-ui/react';
import { save } from "../hooks/SessionUtil";
import { get_api } from '../hooks/Conexion';
import RequestAppointmentModal from './RegisterCita';

interface Campaign {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  Servicio?: { nombre: string }[];
  external_id: string;
}

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const apiCampaigns = await get_api("campaign");
        console.log(apiCampaigns);
        setCampaigns(apiCampaigns);
      } catch (error) {
        console.error("Error al obtener las campañas:", error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <Box p={6}>
      <Heading size="lg" mb={6} color="teal.700" textAlign="center">
        Campañas Activas
      </Heading>

      {campaigns.length > 0 ? (
        <Center>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} maxW="1000px">
            {campaigns.map((campaign, index) => (
              <Card key={index} bg="white" boxShadow="lg" borderRadius="xl" p={4} _hover={{ transform: "scale(1.03)", transition: "0.3s" }}>
                <CardBody>
                  <Heading size="md" color="teal.800" mb={2} textAlign="center">
                    {campaign.nombre}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Inicio:</strong> {campaign.fechaInicio}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Fin:</strong> {campaign.fechaFin}
                  </Text>
                  <Text fontSize="sm" color={campaign.estado === "Activa" ? "green.500" : "red.500"}>
                    <strong>Estado:</strong> {campaign.estado}
                  </Text>

                  {campaign.Servicio && campaign.Servicio.length > 0 ? (
                    <Box mt={3}>
                      <Text fontWeight="bold" fontSize="sm" color="gray.700">Servicios:</Text>
                      <Stack spacing={1} ml={2}>
                        {campaign.Servicio.map((servicio, i) => (
                          <Text key={i} fontSize="sm" color="gray.600">
                            - {servicio.nombre}
                          </Text>
                        ))}
                      </Stack>
                    </Box>
                  ) : (
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      No hay servicios asociados.
                    </Text>
                  )}

                  <Divider my={3} />

                  <Center>
                    <Button size="sm" colorScheme="teal" variant="solid" onClick={() => { save("campaign", campaign.external_id); setIsModalOpen(true); }}>
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

export default Campaigns;
