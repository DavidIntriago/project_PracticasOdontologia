import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { arEG, tr } from 'date-fns/locale';
import { get_api } from '../hooks/Conexion';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Simulación de una petición a una API
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
    <Box>
      <Text fontSize="xl" mb={4}>Gestión de Campañas</Text>
      {campaigns.length > 0 ? (
        campaigns.map((campaign, index) => (
          <Box key={index} p={3} bg="white" mb={2} borderRadius="md" boxShadow="sm">
            <Text fontWeight="bold">{campaign.nombre}</Text>
            <Text>{campaign.numeroVacantes}</Text>
          </Box>
        ))
      ) : (
        <Text color="gray.500">No hay campañas disponibles.</Text>
      )}
    </Box>
  );
};

export default Campaigns;
