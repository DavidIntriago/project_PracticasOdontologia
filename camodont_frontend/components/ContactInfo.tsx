import { Box, Flex, Icon, Text, useColorModeValue, Stack } from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, AddIcon } from '@chakra-ui/icons';

const ContactInfo = () => {
  return (
    <Box
      
      p={2}
      display="flex"
      flexDirection={['column', 'row']}
      justifyContent={['center', 'flex-end']}
      alignItems="center"
      boxShadow="md"
      rounded="md"
    >
      <Stack
        direction={['column', 'row']}
        spacing={4}
        alignItems="center"
        m={2}
      >
        <Flex align="center">
          <Icon as={PhoneIcon} w={5} h={5} color="teal.500" />
          <Text ml={2} color="teal.500">
             0994978403
          </Text>
        </Flex>
        <Flex align="center">
          <Icon as={EmailIcon} w={5} h={5} color="teal.500" />
          <Text ml={2} color="teal.500">
             odontologia@unl.edu.ec
          </Text>
        </Flex>
        <Flex align="center">
          <Icon as={AddIcon} w={5} h={5} color="teal.500" />
          <Text ml={2} color="teal.500">
             Facultad de Salud
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default ContactInfo;

