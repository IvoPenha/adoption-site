import { Box, CircularProgress } from '@chakra-ui/react'

const Loading = () => <Box height={'full'} width={'full'} display={'flex'} alignItems={'center'} justifyContent={'center'} ><CircularProgress isIndeterminate color='blue.700' size='300px' thickness='2px' /></Box> 
export default Loading