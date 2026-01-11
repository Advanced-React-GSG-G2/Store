import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Box,
} from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import type { Product } from "../entities/Product";

export const Products = () => {
  const { products } = useGetAllProducts();

  return (
    <Box py={32} px={{ base: 16, md: 32 }}>
      <Title style={{ textAlign: "center", marginBottom: 32 }}>
        Our Products
      </Title>

      <Grid gutter="lg">
        {products.map((product: Product) => (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(-5px)";
                card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "";
              }}
            >
              <Card.Section>
                <Image
                  src={product.image}
                  height={180}
                  fit="contain"
                  alt={product.name}
                />
              </Card.Section>

              <Stack gap="md" justify="space-between" style={{ flex: 1, padding: 16 }}>
                <Group grow={false} gap="md">
                  <Text fw={600} lineClamp={1}>
                    {product.name}
                  </Text>

                  <Badge
                    color={
                      product.availabilityStatus === "In Stock"
                        ? "green"
                        : product.availabilityStatus === "Low Stock"
                        ? "yellow"
                        : "red"
                    }
                    variant="light"
                  >
                    {product.availabilityStatus}
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed" lineClamp={1}>
                  {product.category}
                </Text>

                <Text fw={700} size="lg">
                  ${product.price}
                </Text>

                <Button
                  fullWidth
                  radius="md"
                  disabled={product.availabilityStatus === "Out of Stock"}
                >
                  {product.availabilityStatus === "Out of Stock"
                    ? "Unavailable"
                    : "Order Now"}
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
