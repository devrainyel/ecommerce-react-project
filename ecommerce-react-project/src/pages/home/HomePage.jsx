import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';
import { Header } from "../../components/Header";
import { ProductsGrid  } from './ProductsGrid';
import "./HomePage.css";

export function HomePage( { cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
      const getHomeData = async () => {
          const url = search ? `/api/products?search=${search}` : '/api/products';
          const res = await axios.get(url);
          setProducts(res.data);
      };

      getHomeData();
  }, [search])
   
  
  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
