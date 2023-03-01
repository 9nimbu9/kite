import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';

export default function Products({ products }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilter = async () => {
    const response = await axios.get('https://fakerapi.it/api/v1/products', {
      params: {
        _taxes: taxAmount,
      },
    });
    let filteredProducts = response.data.data;
    if (minPrice !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    setFilteredProducts(filteredProducts);
  };

  return (
    <Box maxW="90%" mx="auto" mt="10">
      <Heading mb="6">Products</Heading>
      <Stack spacing="4">
        <FormControl id="minPrice">
          <FormLabel>Minimum Price</FormLabel>
          <Input
            type="number"
            placeholder="Enter a minimum price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </FormControl>
        <FormControl id="maxPrice">
          <FormLabel>Maximum Price</FormLabel>
          <Input
            type="number"
            placeholder="Enter a maximum price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </FormControl>
        <FormControl id="taxAmount">
          <FormLabel>Tax Amount</FormLabel>
          <Input
            type="number"
            placeholder="Enter a tax amount"
            value={taxAmount}
            onChange={(e) => setTaxAmount(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleFilter}>
          Filter
        </Button>
      </Stack>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6" mt="8">
        {(filteredProducts.length > 0 ? filteredProducts : products).map(
          (product) => (
            <Box key={product.uuid} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Heading as="h3" size="md" mr="2">
                    {product.name}
                  </Heading>
                  <Box color="gray.500" fontWeight="semibold">
                    {product.price}Rs
                  </Box>
                </Box>

                <Box mt="1" fontWeight="light">
                  {product.description}
                </Box>
              </Box>
            </Box>
          )
        )}
      </SimpleGrid>
    </Box>
  );
}

export async function getServerSideProps() {
  const response = await axios.get('https://fakerapi.it/api/v1/products', {
    params: {
      _quantity: 50,
    },
  });
  const products = response.data.data;
  return {
    props: {
      products,
    },
  };
}
