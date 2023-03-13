import React from "react"
import { Button, Box } from "@saleor/macaw-ui/next"
import { useFilterContext } from "../State/context"

const FooterContainer = ({ children }) => (
  <Box
    marginTop={11}
    display="flex"
    flexWrap="nowrap"
    flexDirection="row"
    width="100%"
    justifyContent="space-between"
  >
    {children}
  </Box>
)



export const Footer = () => {
  const { dispatch } = useFilterContext()

  const handleAddFilter = () => {
    dispatch({ type: "ADD_EMPTY" })
  }

  return (
    <FooterContainer>
      <Button variant="secondary" onClick={handleAddFilter}>Add filter</Button>
      <Box display="flex">
        <Button variant="tertiary">Clear filters</Button>
        <Button >Show results</Button>
      </Box>
    </FooterContainer>
  )
}