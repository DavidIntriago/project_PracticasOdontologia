import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardBody, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { save } from "../hooks/SessionUtil";
import { get_api } from '../hooks/Conexion';
import RequestAppointmentModal from './RegisterCita';


const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {

    const fetchCampaigns = async () => {
      try {
        const apiCampaigns = await get_api("campaign");
        console.log(apiCampaigns);
        
        setCampaigns(apiCampaigns);
        }
        catch (error) {
            console.error("Error al obtener las campañas:", error);
            }


    };
    fetchCampaigns();
  }, []);

 
  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="teal.700">
        Gestión de Campañas
      </Heading>

      {campaigns.length > 0 ? (
        <Stack spacing={4}>
          {campaigns.map((campaign, index) => (
            <Card key={index} bg="white" boxShadow="md" borderRadius="lg" p={4}>
              <CardBody>
                <Heading size="md" color="teal.800" mb={2}>
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

                <Button size="sm" colorScheme="teal" variant="outline" onClick={() => {save("campaign", campaign.external_id); setIsModalOpen(true)}}>
                  Solicitar Consulta
                </Button>
                <RequestAppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
              </CardBody>
            </Card>
          ))}
        </Stack>
      ) : (
        <Text color="gray.500" fontSize="md">No hay campañas disponibles.</Text>
      )}
    </Box>
  );
};

export default Campaigns;