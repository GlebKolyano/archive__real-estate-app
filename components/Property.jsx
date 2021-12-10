import Link from 'next/link'
import Image from 'next/image'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'

import defaultImage from '../assets/img/defaultImage.jpg'

const Property = ({property: {externalID, title, coverPhoto, price, rentFrequency, rooms, baths, area, agency, isVerified}}) => {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Flex flexWrap="wrap" w="400px" p="5" paddingTop="0" justifyContent= "flex-start" cursor="pointer">
        <Box>
          <Image src={coverPhoto ? coverPhoto.url : defaultImage} width={400} height={250}/>
        </Box>
        <Box w="full">
          <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
              <Text fontWeight="bold" fontSize="lg">$ {millify(price)} {rentFrequency && `/${rentFrequency}`}</Text>
            </Flex>
            <Box>
              <Avatar  size="sm" src={agency?.logo?.url}/>
            </Box>
          </Flex>
          <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqrt <BsGridFill />
          </Flex>
          <Text fontSize="lg">
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}
export default Property