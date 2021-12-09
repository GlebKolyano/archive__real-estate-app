import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs'

import Property from '../components/Property'

import { baseUrl, fetchApi } from '../utils/fetchApi'
import SearchFilters from '../components/SearchFilters';
import noresultImage from '../assets/img/noresultImage.svg'

const Search = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState(false)
  const router = useRouter()

  return (
    <Box>
      <Flex 
        cursor="pointer" 
        bg="gray.100"  p="2"   
        fontSize="1g"       
        justifyContent="center" 
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text fontSize="xl">Search property by filters</Text>
        <Icon paddingLeft="2" w="7" h="10" as={BsFilter}/>
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="xl" p="4" fontWeight="medium" color="gray.500">Properties {router.query.purpose}</Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      {properties.length === 0 && 
      <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
        <Image alt="no result" src={noresultImage}/>
        <Text fontSize="2xl" marginTop="2">No Results Found</Text>
      </Flex>}
    </Box>
  )
}
export default Search
