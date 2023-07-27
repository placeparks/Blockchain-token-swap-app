import { Box, Text } from "@chakra-ui/react"
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react"

export default function TokenBalance({ tokenAddress }) {
  const address = useAddress()
  const { contract } = useContract(tokenAddress)
  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading
  } = useTokenBalance(contract, address)

  return (
    <Box mt={4}>
      {!isTokenBalanceLoading && (
        <Text>Balance: {tokenBalance?.displayValue}</Text>
      )}
    </Box>
  )
}
