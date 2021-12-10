import { useEffect, useState } from 'react'
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'

import { filterData, getFilterValues } from '../utils/filterData'
import { baseUrl, fetchApi } from '../utils/fetchApi'
// import noresultImage from '../assets/images/noresultImage.svg'

const SearchFilter = () => {
  const router = useRouter()
  const [filters, setFilters] = useState(filterData)

  const searchProperties = (filterValues) => {

    const path = router.pathname
    const {query} = router
    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      query[item.name] = item.value
    })
    router.push({pathname: path, query})
  }

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters.map((filter) => (
        
        <Box key={filter.queryName} p="1">
          <Select 
            placeholder={filter.placeholder}
            onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}
            >
            {filter?.items?.map((option) => (
              <option value={option.value} key={option.value}>{option.name}</option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  )
}
export default SearchFilter


