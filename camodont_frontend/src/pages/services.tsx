import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  useColorMode,
} from '@chakra-ui/react';
import { 
  IoMdMedkit, 
  IoIosMedkit, 
  IoIosHeart, 
  IoIosBody, 
  IoIosPulse, 
  IoIosThermometer, 
  IoIosFlask, 
  IoIosFitness 
} from 'react-icons/io';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { get_api } from '../hooks/Conexion';

const Services = () => {
  const { colorMode } = useColorMode();
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiServices = await get_api("services");
        console.log(apiServices);
        const mappedServices = apiServices.map((service) => ({
          title: service.nombre,
          description: service.descripcion,
        }));
        console.log(mappedServices);

        setServices(mappedServices);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    }

    fetchData();
  }, []);

 

  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <Heading size="xl" color={colorMode === 'light' ? 'gray.700' : 'white'}>
            Nuestros Servicios
          </Heading>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {services.map((service, index) => (
            <Box
              key={index}
              bg={colorMode === 'light' ? 'white' : 'gray.700'}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
            >
              <Flex justify="center" mb={4} fontSize="3xl" color="teal.500">
              <IoMdMedkit />              </Flex>
              <Heading size="md" mb={2} color={colorMode === 'light' ? 'gray.800' : 'white'}>
                {service.title}
              </Heading>
              <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
                {service.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Services;