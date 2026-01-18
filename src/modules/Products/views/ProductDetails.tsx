


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../entities/Product";
import { restProducts } from "../repository/restProducts";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Star } from "lucide-react";

import styles from "./ProductDetails.module.css"; 


const getRatingCount = (label: string) => {
  if (label === "Excellent") return 5;
  if (label === "Good") return 3;
  return 1;
};

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const repo = restProducts();
        const data = await repo.getProductById(id);

        if (!data) {
          setError("Product not found");
          return;
        }

        setProduct(data);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className={`${styles.container} animate-pulse`}>
        <div className={styles.card}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-lg">
        {error}
      </div>
    );
  }

  if (!product) return null;

  const ratingCount = getRatingCount(product.ratingLabel);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.title}>
            {product.name}
          </CardTitle>

          <div className={styles.ratingWrapper}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < ratingCount ? styles.starActive : styles.starInactive}
              />
            ))}
            <span className={styles.ratingLabel}>
              {product.ratingLabel}
            </span>
          </div>
        </CardHeader>

        <CardContent className={styles.cardContent}>
          <div className={styles.imageWrapper}>
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className={styles.productImage}
            />

            <Badge className={styles.badge} variant={
              product.availabilityStatus === "In Stock"
                ? "default"
                : product.availabilityStatus === "Low Stock"
                ? "secondary"
                : "destructive"
            }>
              {product.availabilityStatus}
            </Badge>
          </div>

          <div className={styles.details}>
            <p className={styles.price}>${product.price.toFixed(2)}</p>

            <p className={styles.description}>
              {product.description}
            </p>

            <Button size="lg" className={styles.addToCartBtn}>
              Add to Cart
            </Button>

            <Link to="/">
              <Button variant="ghost" className={styles.backBtn}>
                ← Back to Products
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
