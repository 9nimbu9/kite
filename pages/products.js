import { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Heading, Input, SimpleGrid } from '@chakra-ui/react';

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
      filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
    }
    if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
    }
    setFilteredProducts(filteredProducts);
  };

  return (
    <Box maxW="90%" mx="auto" mt="10">
      <Heading mb="6">Products</Heading>
      <FormControl id="minPrice" mb="4">
        <FormLabel>Minimum Price</FormLabel>
        <Input type="number" placeholder="Enter a minimum price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </FormControl>
      <FormControl id="maxPrice" mb="4">
        <FormLabel>Maximum Price</FormLabel>
        <Input type="number" placeholder="Enter a maximum price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </FormControl>
      <FormControl id="taxAmount" mb="4">
        <FormLabel>Tax Amount</FormLabel>
        <Input type="number" placeholder="Enter a tax amount" value={taxAmount} onChange={(e) => setTaxAmount(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleFilter} mb="4">
        Filter
      </Button>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
          <Box key={product.uuid} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p="4">
              <Heading as="h3" size="md" mb="2">
                {product.name}
              </Heading>
              <Box color="gray.500" fontWeight="semibold" mb="2">
                {product.price}Rs
              </Box>
              <Box fontWeight="light">{product.description}</Box>
            </Box>
          </Box>
        ))}
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
