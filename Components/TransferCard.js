import { useEffect, useState } from "react"
import { Box, Card, Flex, Heading, Input, Text } from "@chakra-ui/react"
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses"
import TokenSelection from "./TokenSelection"
import TokenBalance from "./TokenBalance"
import TransferButton from "./TransferButton"
import styles from "../styles/Home.module.css"

export default function TransferCard() {
  // Existing variables and hooks
  const address = useAddress()
  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS)
  const {
    data: verifiedTokens,
    isLoading: isVerifiedTokensLoading
  } = useContractRead(contract, "getVerifiedTokens")

  // Form data state
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    message: ""
  })

  // Selected token state
  const [selectedToken, setSelectedToken] = useState("")

  // New state to check if the transfer is done
  const [transferDone, setTransferDone] = useState(false)

  // Function to handle form data changes
  const handleChange = (event, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: event.target.value
    }))
  }

  // Function to handle token selection
  const handleTokenSelection = tokenAddress => {
    setSelectedToken(tokenAddress)
  }

  // New function to reset the form and token selection when the transfer is done
  const handleTransferDone = () => {
    setFormData({
      receiver: "",
      amount: "",
      message: ""
    })
    setSelectedToken("")
    setTransferDone(false)
  }

  // New useEffect to handle the transferDone state change
  useEffect(() => {
    if (transferDone) {
      handleTransferDone()
    }
  }, [transferDone])

  return (
    <Card w={"50%"} p={20}>
      <Heading>Transfer:</Heading>

      <Text mt={4} fontWeight={"bold"}>
        Select Token:
      </Text>
      <Flex flexDirection={"row"} mt={4}>
        {!isVerifiedTokensLoading &&
          verifiedTokens.map(token => (
            <Box
              key={token}
              onClick={() => handleTokenSelection(token)}
              className={styles.tokenButton}
            >
              <TokenSelection
                tokenAddress={token}
                isSelected={selectedToken === token}
              />
            </Box>
          ))}
      </Flex>

      <TokenBalance tokenAddress={selectedToken} />

      <Text mt={4} fontWeight={"bold"}>
        Send To:
      </Text>
      <Input
        placeholder="0x0000000"
        type="text"
        value={formData.receiver}
        onChange={event => handleChange(event, "receiver")}
      />
      <Text mt={4} fontWeight={"bold"}>
        Amount:
      </Text>
      <Input
        placeholder="0.0"
        type="number"
        value={formData.amount}
        onChange={event => handleChange(event, "amount")}
      />
      <Text mt={4} fontWeight={"bold"}>
        Message:
      </Text>
      <Input
        placeholder="Add short message here."
        type="text"
        value={formData.message}
        onChange={event => handleChange(event, "message")}
      />
      <Box mt={8}>
        {address ? (
          <TransferButton
            tokenAddress={selectedToken}
            receiver={formData.receiver}
            amount={formData.amount.toString()}
            message={formData.message}
            onTransferDone={() => setTransferDone(true)}
          />
        ) : (
          <Text>Please connect your wallet to make a transfer.</Text>
        )}
      </Box>
    </Card>
  )
}
