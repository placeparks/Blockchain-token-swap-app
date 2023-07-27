import { Container, Flex } from "@chakra-ui/react"
import TransferCard from "../Components/TransferCard"
import Events from "../Components/Events"

export default function TransferPage() {
  return (
    <Container maxW={"1440px"}>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TransferCard />
        <Events />
      </Flex>
    </Container>
  )
}
