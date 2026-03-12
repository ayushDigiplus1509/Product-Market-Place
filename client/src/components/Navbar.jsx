import { Container, Flex } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <>
    <Container    
      maxW={maxW="1140px"} px={4}>

        <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={
          {
            base:"column",
            sm:"row"
          }
        }
        >

          <Text fontSize={{base:"22", sm:"28"}} fontWeight="bold">MERN Stack</Text>


        </Flex>

    </Container>
    </>
  )
}