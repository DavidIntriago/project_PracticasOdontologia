import React from 'react';
import {
  Flex,
  Heading,
  Link,
  Box,
  Stack,
  Icon,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { colorMode } = useColorMode();

  

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} py={8} >
      <Flex direction="column" align="center">
        <Heading size="lg" color={colorMode === 'light' ? 'gray.700' : 'white'}>
          Universidad Nacional de Loja
        </Heading>
       
      </Flex>
      <Flex align="center" justify="center" mt={8}>
        <Text fontSize="sm" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
          &copy; {new Date().getFullYear()} Facultad de la Salud Humana
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;

