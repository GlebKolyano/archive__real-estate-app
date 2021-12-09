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


export async function getServerSideProps(context) {
  const purpose = context.query.purpose || 'for-rent';
  const rentFrequency = context.query.rentFrequency || 'yearly';
  const minPrice = context.query.minPrice || '0';
  const maxPrice = context.query.maxPrice || '1000000';
  const roomsMin = context.query.roomsMin || '0';
  const bathsMin = context.query.bathsMin || '0';
  const sort = context.query.sort || 'price-desc';
  const areaMax = context.query.areaMax || '35000';
  const locationExternalIDs = context.query.locationExternalIDs || '5002';
  const categoryExternalID = context.query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits,
    },
  };
}