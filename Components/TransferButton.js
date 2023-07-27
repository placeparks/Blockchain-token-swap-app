import { Web3Button, useContract } from "@thirdweb-dev/react"
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses"
import { ethers } from "ethers"
import { useToast } from "@chakra-ui/react"

export default function TransferButton({
  tokenAddress,
  receiver,
  amount,
  message,
  onTransferDone // Add new prop here
}) {
  const toast = useToast()

  const { contract: tokenContract } = useContract(tokenAddress, "token")

  const { contract: transferContract } = useContract(TRANSFER_CONTRACT_ADDRESS)

  return (
    <Web3Button
      contractAddress={TRANSFER_CONTRACT_ADDRESS}
      action={async contract => {
        await tokenContract?.setAllowance(
          TRANSFER_CONTRACT_ADDRESS,
          ethers.utils.parseEther(amount).toString()
        )

        await transferContract?.call("transfer", [
          tokenAddress,
          receiver,
          ethers.utils.parseEther(amount),
          message
        ])
      }}
      onSuccess={() => {
        // Call the onTransferDone function when the transfer is successful
        onTransferDone()

        toast({
          title: "Transfer Successful",
          description: "You have successfully transferred tokens!",
          status: "success",
          duration: 9000,
          isClosable: true
        })
      }}
    >
      Transfer Token
    </Web3Button>
  )
}
